if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const whitelist = process.env.WHITELIST.split(' ')
const paidStatus = process.env.PAID;

module.exports.checkWhitelist = function(phoneNumber) {
    if (paidStatus == 'true') {
        console.log("PAID PLAN, AUTOWHITELIST:",phoneNumber)
        return true
    }
    console.log("CHECKING WHITELIST:", phoneNumber)
    if (whitelist.includes(phoneNumber)) {
        return true;
    }
    else
    {
        return false;
    }
}