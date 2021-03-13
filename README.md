# DiscordStockTicker
Real Time Stock ticker for Discord.

# Configuration

```json
{
    "interval": 5,
    "discordToken": "yourDiscordBotToken",
    "currency": "EUR",
    "commandPrefix": ".",
    "channelId": "yourChannelId"
}
```
## Instalation

1. Clone the repository
2. Create a config.json
3. run `npm i`
4. run `npx tsc`
## Usage
```
add `Symbol` - Adds a Symbol to the stock ticker.
remove `Symbol` - Removes a Symbol from the stock ticker.
```