require('dotenv').config()

const whitelist = process.env.WHITELIST.split(' ')

module.exports.checkWhitelist = function(phoneNumber) {
    console.log("CHECKING WHITELIST:", phoneNumber)
    if (whitelist.includes(phoneNumber)) {
        return true;
    }
    else
    {
        return false;
    }
}