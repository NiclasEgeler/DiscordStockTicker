# DiscordStockTicker
Real time stock ticker for Discord 📈.

## Configuration
```env
interval = 5
discordToken = "yourToken"
currency = "EUR"
commandPrefix = "."
channelId = "yourChannelId"
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

## Example
![image](https://user-images.githubusercontent.com/70487423/111054704-df25d680-846e-11eb-83b6-9bff9d0b5f4d.png)
