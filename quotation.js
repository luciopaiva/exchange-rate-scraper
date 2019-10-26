
const RESOLUTION_IN_DIGITS = 5;
const RESOLUTION = 10 ** RESOLUTION_IN_DIGITS;

class Quotation {

    /** @type {String} */
    date;
    /** @type {String} */
    name;
    /** @type {String} */
    currencyFrom;
    /** @type {String} */
    currencyTo;
    /** @type {Number} */
    askRate;
    /** @type {Number} */
    bidRate;

    constructor(date, name, currencyFrom, currencyTo, askRate, bidRate = 0) {
        this.date = date;
        this.name = name;
        this.currencyFrom = currencyFrom;
        this.currencyTo = currencyTo;
        this.askRate = Math.round(askRate * RESOLUTION);
        this.bidRate = Math.round(bidRate * RESOLUTION);
    }

    toString() {
        const askRate = (this.askRate / RESOLUTION).toFixed(RESOLUTION_IN_DIGITS);
        const bidRate = (this.bidRate / RESOLUTION).toFixed(RESOLUTION_IN_DIGITS);
        return [this.date, this.currencyFrom, this.currencyTo, askRate, bidRate].join(",");
    }
}

module.exports = Quotation;
