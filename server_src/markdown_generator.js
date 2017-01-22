'use strict';

const Azure = require('./azure');

function getMdSourceCode (input ) {
    let parsedResult = Azure.getKeyPhrases(input);
    return parsedResult;
};

exports.getMdSourceCode = getMdSourceCode;
