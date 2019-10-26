
const
    HttpService = require("./http-service");

class QuotationSource {

    /**
     * How much euros to ask when doing a quotation - this amount can influence the exchange rate obtained since they
     * can do a better rate for larger values
     */
    static AMOUNT_IN_EUROS = 1000;

    httpService = new HttpService();

    constructor () {
    }

    async quoteAndPersist() {
        throw new Error("Implement me!");
    }

    nowIso() {
        return (new Date()).toISOString();
    }
}

module.exports = QuotationSource;
