<h1 align="center">
    DiscordStockTicker
</h2>
<p align="center">
    Real time stock ticker for Discord 📈.
</p>
<p align="center">
    <img align="center" src="https://user-images.githubusercontent.com/70487423/111169810-97549b80-85a3-11eb-9ad0-f775e4398f0f.gif"/>
</p>


## Configuration
```env
interval = 5                        # interval in seconds
discordToken = "yourToken"          # your discord bot token
currency = "EUR"                    # ISO 4217 3-digit currency code
commandPrefix = "."                 # discord command prefix
channelId = "yourChannelId"         # discord channel id
color = "false"                     # color setting using Highlight.js diff
```

## Installation

1. clone the repository
2. create a .env file
3. run `npm i`
4. run `npx tsc`
5. run `node ./out/main.js`

## Usage
```
add 'Symbol'    - Adds a Symbol to the stock ticker.
remove 'Symbol' - Removes a Symbol from the stock ticker.
```

