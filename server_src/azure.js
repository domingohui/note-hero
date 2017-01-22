'use strict';

const request = require('request');
const Md_Gen = require('./md_gen');

var rawInput = '';

module.exports.getMdSourceWrapper = getMdSourceWrapper;

function getMdSourceWrapper  (userRawInput) {
    rawInput = userRawInput;
    getKeyPhrases (toJson (rawInput), callback);
}

function getKeyPhrases (json) {
    // Azure portal URL.
    const num_languages = 1;

    const batch_keyphrase_url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";

    let data = JSON.stringify (json);

    var options = {
        'url': batch_keyphrase_url,
        'method': 'POST',
        'headers': {
            "Content-Type":"application/json",
            "Ocp-Apim-Subscription-Key":"db9b5fd1cb7c493789373ebf27c0524d",
            "Accept":"application/json"
        },
        'body': data ,
        'dataType': 'text'
    }

    request(options, didMdSourceReturn);
}

function didMdSourceReturn ( error, response, body ) {
    // Callback when keyphrases returned from API
    result = Md_Gen.addMdTo( rawInput, JSON.parse(body));
    console.log(result);
}


function extratSentences ( line ) {
    let sentences = line.split('.');
    const length = sentences.length;

    for ( let i = 0; i < length; i++ ) {
        sentences[i] = sentences[i].replace('"', '');
    }

    return sentences;
}

function toJson (rawInput) {
    // Converts raw input into json with each sentence as an item in an array
    let attributeCount = 1;
    // Each line is treated as one paragraph
    // Each paragraph call api once

    let json = {
        "documents": []
    };

    let lines = rawInput.split('\n');

    lines.forEach ( function(line) {
        let sentences = extratSentences(line);
        sentences.forEach ( function ( sentence ) {
            if ( sentence !== '' ) {
                let attribute = {
                    "language": "en",
                    "id": ""+attributeCount,
                    "text": sentence
                };
                json.documents.push(attribute);
                attributeCount++;
            }
        });
    });

    console.log("JSON raw input");
    console.log(json);

    return json;
}

//getKeyPhrasesWrapper("Hello.\n My name is Domingo.\nHow are you?\nPlease work at a hackathon.");
