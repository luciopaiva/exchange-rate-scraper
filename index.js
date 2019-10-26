
const
    TransferwiseSource = require("./sources/transferwise-source");

class ExchangeRateScraper {

    static SCRAPING_INTERVAL_IN_MILLIS = 60000;

    /** @type {QuotationSource[]} */
    sources;

    constructor () {
        this.sources = [
            new TransferwiseSource(),
        ];
    }

    /**
     * @return {void}
     */
    async start() {
        this.scrape();
    }

    async scrape() {
        try {
            const promises = this.sources.map(source => source.quoteAndPersist());
            await Promise.all(promises);
        } catch (e) {
            console.error(e);
            console.error("Something went wrong while running scrapers (see above)");
        }

        setTimeout(this.scrape.bind(this), ExchangeRateScraper.SCRAPING_INTERVAL_IN_MILLIS);
    }
}

const ers = new ExchangeRateScraper();
ers.start();
