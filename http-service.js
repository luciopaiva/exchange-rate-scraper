
const
    request = require("request-promise-native");

class HttpService {

    postJsonOptions = { method: "POST", json: true, url: null, body: null };

    /**
     * @param {Object} [requestDefaultOptions] - default request options to use
     */
    constructor (requestDefaultOptions = null) {
        this.request = requestDefaultOptions ? request.defaults(requestDefaultOptions) : request;
    }

    /**
     * @private
     * @param {Object} options
     * @return {Promise<*>}
     */
    async performRequest(options) {
        return await this.request(options);
    }

    /**
     * @param {String} url
     * @param {Object} body
     * @return {Promise<Object>}
     */
    async postJsonExpectJson(url, body) {
        this.postJsonOptions.url = url;
        this.postJsonOptions.body = body;
        return await this.performRequest(this.postJsonOptions);
    }
}

module.exports = HttpService;
