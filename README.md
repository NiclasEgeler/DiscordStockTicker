<h1 align="center">
    DiscordStockTicker
</h2>
<p align="center">
    Real time stock ticker for Discord 📈
</p>
<p align="center">
    <img align="center" src="https://user-images.githubusercontent.com/70487423/111169810-97549b80-85a3-11eb-9ad0-f775e4398f0f.gif"/>
</p>

## Info

Version 2 completely rewritten in **Deno**.
Now supports Discords new Slash commands *(and more than 9 Stocks)*.
## Configuration
```env
TOKEN = "yourToken"     # your discord bot token
CURRENCY = "EUR"        # ISO 4217 3-digit currency code f.e. EUR, USD, ...
```
## Installation

Download the latest version from the release tab (or build it yourself).

Create a `.env` file and provide the needed values as shown above. 

Run the program.
## Usage
```
/setup 'Role'    - Setup the Ticker in the current Channel. Gives 'Role' permission to use /add and /remove.
/add 'Symbol'    - Adds a Symbol to the stock ticker.
/remove 'Symbol' - Removes a Symbol from the stock ticker.
```
To find a stock symbol go to [Yahoo finance](https://finance.yahoo.com/).
