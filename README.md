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
Now supports Discords new slash commands *(and more than 9 Stocks)*.
## Configuration
```env
TOKEN = "yourToken"     # your discord bot token
CURRENCY = "EUR"        # ISO 4217 3-digit currency code f.e. EUR, USD, ...
```
Requiered build flags:
</br>
`--allow-read`
</br>
`--allow-env`
</br>
`--allow-net`
</br>
`--allow-write`
</br>
```bash
deno compile --allow-read --allow-env --allow-net --allow-write --target x86_64-pc-windows-msvc --output ticker_windows_x86_64 main.ts
deno compile --allow-read --allow-env --allow-net --allow-write --target x86_64-unknown-linux-gnu --output ticker_linux_x86_64 main.ts
```
## Installation

Download the latest version from the release tab (or build it yourself).
</br>
Create a `.env` file and provide the needed values as shown above. 
</br>
Run the program.
</br>
Invite your bot (make sure to give it the `application.commands` scope).
## Usage
```
/setup 'Role'    - Setup the Ticker in the current Channel. Gives 'Role' permission to use /add and /remove.
/add 'Symbol'    - Adds a Symbol to the stock ticker.
/remove 'Symbol' - Removes a Symbol from the stock ticker.
```
To find a stock symbol go to [Yahoo finance](https://finance.yahoo.com/).
