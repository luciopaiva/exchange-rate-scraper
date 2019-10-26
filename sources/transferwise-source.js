
const
    save = require("../persistence").save,
    Quotation = require("../quotation"),
    QuotationSource = require("../quotation-source");

/**
 * @typedef {Object} TransferwisePaymentOption
 * @property {String} payInProduct
 * @property {Number} targetAmount
 * @property {Number} sourceAmount
 */

/**
 * @typedef {Object} TransferwiseResponse
 * @property {TransferwisePaymentOption[]} paymentOptions
 */

class TransferwiseSource extends QuotationSource {

    static NAME = "transferwise";

    constructor () {
        super();
        this.url = "https://transferwise.com/gateway/v2/quotes/";
        this.body = {
            "targetAmount": QuotationSource.AMOUNT_IN_EUROS,
            "sourceCurrency": "BRL",
            "targetCurrency": "EUR",
            "preferredPayIn": "BANK_TRANSFER",
            "guaranteedTargetAmount": false
        }
    }

    async quoteAndPersist() {
        try {
            const quotation = await this.quote();
            save(quotation);
        } catch (e) {
            return null;
        }
    }

    /**
     * @return {Promise<Quotation>}
     */
    async quote() {
        /** @type {TransferwiseResponse} */
        const result = await this.httpService.postJsonExpectJson(this.url, this.body);
        return this.parseResultIntoQuotation(result);
    }

    /**
     * @param {TransferwiseResponse} result
     * @return {Quotation}
     */
    parseResultIntoQuotation(result) {
        if (result && Array.isArray(result.paymentOptions)) {
            for (const paymentOption of result.paymentOptions) {
                if (paymentOption.payInProduct === "FAST_BRL") {
                    const rate = paymentOption.sourceAmount / paymentOption.targetAmount;
                    return new Quotation(this.nowIso(), TransferwiseSource.NAME, "BRL", "EUR",
                        rate);
                }
            }
        }
        return null;
    }
}

if (require.main === module) {
    (async () => {
        const source = new TransferwiseSource();
        const quotation = await source.quote();
        console.info(quotation.toString());
    })();
} else {
    module.exports = TransferwiseSource;
}
