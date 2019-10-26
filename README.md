
# Exchange Rate Scraper

Simple scraper to get euro quotes from sources like Transferwise, Remessa Online, etc.

You must have `nvm` installed. To run:

```bash
nvm install
npm install
npm start
```

It will fetch quotation once per minute from all available sources. Results are stored in the `./data/` folder in CSV format.

CSV columns are, in order:

* ISO date
* origin currency
* target currency
* ask rate
* bid rate (or `0` when not available)
