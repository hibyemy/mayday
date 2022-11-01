if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const whitelist_env = process.env.WHITELIST;
const whitelist = typeof whitelist_env != "undefined" ? whitelist_env.split() : [''];
const paidStatus = process.env.PAID || 'false';

module.exports.checkWhitelist = function(phoneNumber) {
    if (paidStatus == 'true') {
        console.log("PAID PLAN, AUTOWHITELIST:",phoneNumber);
        return true;
    }
    console.log("CHECKING WHITELIST:", phoneNumber);
    if (whitelist.includes(phoneNumber)) {
        return true;
    }
    else
    {
        return false;
    }
}