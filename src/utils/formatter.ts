import { StockData } from "../types/stock.ts";

let ascii = {
  border: "─",
  up: "↑ ",
  down: "↓ ",
  regular: "● ",
  active: "○ ",
  inactive: "",
  dot: "…",
  spacer: " ",
};

enum Align {
  left,
  right,
}

let width = [23, 9, 10, 24];
let align = [Align.left, Align.right, Align.right, Align.right];

export function formatStocksInChunks(
  stocks: Array<StockData>,
  chunkSize: number,
): Array<string> {
  var chunks = sliceArray<StockData>(stocks, chunkSize);
  var ret: Array<string> = [];
  for (var chunk of chunks) {
    ret.push(formatStocks(chunk));
  }
  return ret;
}

export function formatStocks(stocks: Array<StockData>): string {
  var ret = "```diff\n";

  for (var stock of stocks) {
    var change = stock.value - stock.prevClosing;
    var percent = ((stock.value - stock.prevClosing) / stock.value * 100);
    var icon = change >= 0 ? ascii.up : ascii.down;
    var name = (change >= 0 ? "+ " : "- ") + (stock.name ? stock.name : "");
    var symbol = (stock.isActive && stock.isRegular
      ? ascii.regular
      : (stock.isActive && !stock.isRegular
        ? ascii.active
        : "")) + stock.symbol;
    var changeDisp = `${icon}${change.toFixed(2)} (${percent.toFixed(2)}%)`;

    ret += createCell(symbol, width[0], align[0]);
    ret += createCell("High:", width[1], align[1]);
    ret += createCell(stock.dayHigh.toFixed(2), width[2], align[2]);
    ret += createCell(stock.value.toFixed(2), width[3], align[3]);

    ret += "\n";

    ret += createCell(name, width[0], align[0]);
    ret += createCell("Low:", width[1], align[1]);
    ret += createCell(stock.dayLow.toFixed(2), width[2], align[2]);
    ret += createCell(changeDisp, width[3], align[3]);

    // draw bottom border
    ret += `\n${ascii.border.repeat(width.reduce((a, b) => a + b))}\n`;
  }
  ret += "```";
  return ret;
}

function createCell(value: any, width: number, align: Align): string {
  var val = `${value}`;
  val = val.length >= width ? val.substr(0, width - 1) + ascii.dot : val;
  return align == Align.left
    ? val + ascii.spacer.repeat(width - val.length)
    : ascii.spacer.repeat(width - val.length) + val;
}

function sliceArray<T>(
  arr: Array<T>,
  chunkSize: number,
): Array<Array<T>> {
  var parts = [];
  for (var i = 0; i < arr.length; i += chunkSize) {
    parts.push(arr.slice(i, i + chunkSize));
  }
  return parts;
}
