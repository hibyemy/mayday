const whitelist = require('./phoneWhitelist.js')

module.exports.validateNumber = function(phoneNumber) {
    console.log("VALIDATING:", phoneNumber)
    var validateRegex = /^\+1\d{10}$/;
    if (phoneNumber.match(validateRegex)) {
        return whitelist.checkWhitelist(phoneNumber)
    }
    else
    {
        return false
    }
}