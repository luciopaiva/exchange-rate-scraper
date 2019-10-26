
const
    fs = require("fs"),
    mkdirp = require("mkdirp");

let isOutputDirectoryCreated = false;

function checkOutputDirectory() {
    if (!isOutputDirectoryCreated) {
        mkdirp("data");
        isOutputDirectoryCreated = true;
    }
}

class Persistence {

    /**
     * @param {Quotation} quotation
     */
    static save(quotation) {
        checkOutputDirectory();
        fs.appendFileSync(`data/${quotation.name}.csv`, quotation.toString() + "\n", "utf-8");
    }
}

module.exports = Persistence;
