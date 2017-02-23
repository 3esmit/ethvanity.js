var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
var async = require('async');
var fs = require('fs');

function searchVanityContractAddresses(vanity) {
    pkey = ethUtil.sha3(ethUtil.crypto.randomBytes(32));
    acc = ethUtil.privateToAddress(pkey).toString('hex');
    contr = ethUtil.generateAddress(acc,0).toString('hex');
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(''+acc+'->'+contr+' KEY '+pkey.toString('hex')+'');
    
    if(vanity.some(arrVal => contr.substr(0, arrVal.length).toUpperCase() == arrVal.toUpperCase())){
        fs.appendFileSync('./vanity.csv', ('0x'+acc+',0x'+contr+','+'0x' +pkey.toString('hex')+ '\r'));
        process.stdout.write('\n');
    }
}

process.stdout.write('Vanity contracts with ');
process.argv.slice(2).forEach(function(element) {
    process.stdout.write(element+' \n');
}, this);



async.forever(
    function(next) {
        searchVanityContractAddresses(process.argv.slice(2));
        next();
    },
    function(err) {
    }
);