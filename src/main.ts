import Table from 'cli-table3';
import * as config from './config.json';
import { StockData } from './model/data.model';

main();

var symbolList: string[] = [];

async function main() {
    console.log("Starting...")
    setInterval(updateStockInformation, 1000 * config.interval);
}


async function updateStockInformation() {
    if(symbolList.length <= 0)
        return;
    var symbols = symbolList.join(',');

}


var item: StockData = {
    name: "Amazon.com, Inc.",
    symbol: "AMZN",
    dayHigh: 3098.59,
    dayLow: 3045.51,
    w52High: 3552.25,
    w52Low: 1626.03,
    prevClosing: 3113.59,
    open: 3075.00,
    value: 3086.98
}

console.log(createEntry(item))



function createEntry(item: StockData): string {

    var table = new Table({
        colWidths: [23, 10, 10, 25],
        chars: {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
            , 'bottom': '─', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
            , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
            , 'right': '', 'right-mid': '', 'middle': ' '
        },
        colAligns: ['left', 'right', 'right', 'center']
    });

    var changeValue = (item.value - item.prevClosing);
    var icon = changeValue >= 0 ? '↑' : '↓';
    var changePercent = ((item.value - item.prevClosing) / item.value * 100);

    table.push(
        [item.symbol, 'Closing:', item.prevClosing, item.value]
        , [item.name, 'Open:', item.open, `${icon} ${changeValue.toFixed(2)} (${changePercent.toFixed(2)}%)`]
    );

    return table.toString();
}

