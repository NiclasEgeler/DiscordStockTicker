import Table from 'cli-table3';
import { config } from "dotenv";
import axios from 'axios';
import discord from 'discord.js';
var strip = require('strip-color');
import { CurrencyLookup, Result, StockData, YahooStockData } from './model/data.model';

var quoteUrl = "https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=";



var interval = 5;
var discordToken = "";
var currency = "EUR";
var commandPrefix = ".";
var channelId = "";
var color = false;

var env = config({ path: 'src/.env' });
if (env.parsed) {
    interval = +env.parsed["interval"];
    discordToken = env.parsed["discordToken"];
    currency = env.parsed["currency"];
    commandPrefix = env.parsed["commandPrefix"];
    channelId = env.parsed["channelId"];
    color = (env.parsed["color"] == 'true');
    main();
} else {
    try {
        interval = +process.env.interval!;
        discordToken = process.env.discordToken!;
        currency = process.env.currency!;
        commandPrefix = process.env.commandPrefix!;
        channelId = process.env.channelId!;
        color = (process.env.color! == 'true');
        main();
    } catch (error) {
        throw (error)
    }
}

var textChannel: discord.TextChannel;
var tickerMessage: discord.Message;

var commands = [
    {
        name: "add",
        function: add
    },
    {
        name: "remove",
        function: remove
    }
]

var currencyList: { key: string, value: number, date: Date }[] = [];

var symbolList: string[] = [];

var client = new discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    var channel = client.channels.cache.get(channelId);
    if (channel?.isText()) {
        textChannel = channel as discord.TextChannel;
        var stockMsg = (await textChannel.messages.fetch({ limit: 100 })).find(e => e.author.id == client.user!.id)
        if (stockMsg)
            tickerMessage = stockMsg;
    } else {
        return;
    }
});

client.on('message', msg => {
    if (msg.content[0] == commandPrefix) {
        var content = msg.content.substring(1);
        commands.find(e => new RegExp("^" + e.name, "gi").test(content))?.function(msg);
    }
});

client.login(discordToken);

async function main() {
    console.log("Starting...")

    setInterval(updateStockInformation, 1000 * interval);
}

// commands
async function add(msg: discord.Message) {
    var part = msg.content.split(' ');
    if (part.length == 2) {
        var symbol = part[1].toUpperCase();
        try {
            var res = (await axios.get<YahooStockData>((quoteUrl + symbol))).data;
        if (res.quoteResponse.result.length == 1) {
            symbolList.push(symbol);
        }
        } catch (error) {
            console.log(error.message);
        }        
    }
    msg.delete();
}

async function remove(msg: discord.Message) {
    var part = msg.content.split(' ');
    if (part.length == 2) {
        var symbol = part[1].toUpperCase();
        symbolList = symbolList.filter(e => e != symbol);
    }
    msg.delete();
}


// end of commands
async function updateStockInformation() {
    var symbols = symbolList.join(',');
    var url = quoteUrl + symbols;
    try {
        var msg = "```\nEmpty symbol list. Add a few stocks with " + commandPrefix + "add Symbol\n```";
        if (symbolList.length > 0) {
            var data = (await axios.get<YahooStockData>(url)).data;
            var stocks: StockData[] = [];
            for (var item of data.quoteResponse.result) {
                var currencyValue = 1;
                var stock: StockData;
                if (item.currency && item.currency?.toUpperCase() != currency?.toUpperCase()) {
                    if (currencyList?.some(e => e.key == item.currency?.toUpperCase()) && currencyList?.find(e => e.key == item.currency?.toUpperCase())!.date.getHours() == new Date().getHours()) {
                        currencyValue = currencyList?.find(e => e.key == item.currency?.toUpperCase())!.value;
                    } else {
                        currencyValue = (await axios.get<CurrencyLookup>(`https://api.exchangeratesapi.io/latest?base=${item.currency?.toUpperCase()}&symbols=${currency.toUpperCase()}`)).data.rates[currency.toUpperCase()];
                        currencyList.push({
                            key: item.currency?.toUpperCase(),
                            value: currencyValue,
                            date: new Date()
                        });
                    }
                }


                stocks.push(createModel(item, currencyValue));
            }
            msg = "```" + (color ? 'diff' : '') + "\n";
            msg += strip(stocks.reduce((acc, e) => acc + createEntry(e, color) + '\n', ""));
            msg += "```";

        }

        if (tickerMessage) {
            await tickerMessage.edit(msg);
        } else {
            if (textChannel) {
                tickerMessage = await textChannel.send(msg);
            }
        }

    } catch (error) {
        console.log(error.message);
    }

}

function createEntry(item: StockData, color: boolean): string {

    var table = new Table({
        colWidths: [23, 9, 10, 24],
        chars: {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
            , 'bottom': '─', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
            , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
            , 'right': '', 'right-mid': '', 'middle': ''
        },
        colAligns: ['left', 'right', 'right', 'right'],
        style: {
            "padding-right": 0,
            "padding-left": 0
        }
    });

    var changeValue = (item.value - item.prevClosing);
    var icon = changeValue >= 0 ? '↑' : '↓';
    var lineColor = '';
    if (color)
        lineColor = changeValue >= 0 ? '+ ' : '- ';
    var changePercent = ((item.value - item.prevClosing) / item.value * 100);
    var active = '';
    if (item.isActive && item.isRegular)
        active = '● ';
    if (item.isActive && !item.isRegular)
        active = '○ ';
    var name = item.name ? item.name : '';

    table.push(
        [active + item.symbol, 'High:', item.dayHigh.toFixed(2), item.value.toFixed(2)]
        , [(lineColor + name), 'Low:', item.dayLow.toFixed(2), `${icon} ${changeValue.toFixed(2)} (${changePercent.toFixed(2)}%)`]
    );

    return table.toString();
}

function createModel(item: Result, currencyValue: number): StockData {
    var stock: StockData = {
        symbol: item.symbol,
        name: item.longName,
        dayHigh: item.regularMarketDayHigh * currencyValue,
        dayLow: item.regularMarketDayLow * currencyValue,
        w52High: item.fiftyTwoWeekHigh * currencyValue,
        w52Low: item.fiftyTwoWeekLow * currencyValue,
        prevClosing: item.regularMarketPreviousClose * currencyValue,
        open: item.regularMarketOpen * currencyValue,
        value: item.regularMarketPrice * currencyValue,
        isActive: false,
        isRegular: false
    };

    if (item.marketState == "REGULAR") {
        stock.isActive = true;
        stock.isRegular = true;
    } else if (item.marketState == "POST" && item.postMarketPrice && item.postMarketPrice != 0.0) {
        stock.isActive = true;
        stock.value = item.postMarketPrice * currencyValue;
    } else if (item.marketState == "PRE" && item.preMarketPrice && item.preMarketPrice != 0.0) {
        stock.value = item.preMarketPrice * currencyValue;
    } else if (item.postMarketPrice && item.postMarketPrice != 0.0) {
        stock.value = item.postMarketPrice * currencyValue;
    }

    return stock;
}