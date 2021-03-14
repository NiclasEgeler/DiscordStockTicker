# DiscordStockTicker
Real Time Stock ticker for Discord.

## Configuration

```env
interval = 5
discordToken = "yourToken"
currency = "EUR"
commandPrefix = "."
channelId = "yourChannelId"
```
## Instalation

1. Clone the repository
2. Create a .env file
3. run `npm i`
4. run `npx tsc`
5. run `node ./out/main.js`
## Usage
```
add 'Symbol'    - Adds a Symbol to the stock ticker.
remove 'Symbol' - Removes a Symbol from the stock ticker.
```
