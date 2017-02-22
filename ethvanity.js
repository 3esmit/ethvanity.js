var ethUtil = require('ethereumjs-util');
ethUtil.crypto = require('crypto');
var seed = ethUtil.crypto.randomBytes(32);
var fs = require('fs');


function searchVanityContractAddresses(vanity) {
    var pkey,acc,contr;

    process.stdout.write('Vanity contracts with ');
    vanity.forEach(function(element) {
        process.stdout.write(element+' ');
    }, this);
    process.stdout.write('from seed '+seed.toString('hex')+'\n');

    pkey = seed;
    do { 
        pkey = ethUtil.sha3(pkey);
        acc = ethUtil.privateToAddress(pkey).toString('hex');
        contr = ethUtil.generateAddress(acc,0).toString('hex');
        process.stdout.clearLine();
	    process.stdout.cursorTo(0);
        process.stdout.write(''+acc+'->'+contr+' KEY '+pkey.toString('hex')+'');
        
        if(vanity.some(arrVal => contr.substr(0, arrVal.length).toUpperCase() == arrVal.toUpperCase())){
            fs.appendFileSync('./vanity.csv', ('0x'+acc+',0x'+contr+','+'0x' +pkey.toString('hex')+ '\r'));
            process.stdout.write('\n');
        }
    } while(true);

}

searchVanityContractAddresses(process.argv.slice(2));
