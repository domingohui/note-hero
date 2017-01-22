'use strict';

var request = require('request');

function getKeyPhrasesWrapper (rawInput) {
    return getKeyPhrases (toJson (rawInput));
}

function getKeyPhrases (json) {
    // Azure portal URL.
    const base_url = 'https://westus.api.cognitive.microsoft.com/';

    const headers = {
        'Content-Type':'application/json', 
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key':'db9b5fd1cb7c493789373ebf27c0524d'};

    const num_languages = 1;

    const batch_keyphrase_url = base_url + 'text/analytics/v2.0/keyPhrases';

    var options = {
        'url': batch_keyphrase_url,
        'method': 'POST',
        'headers': headers,
        'data': {"documents": JSON.stringify(json)}
    }
    
    console.log(JSON.stringify(json));
    request(options, function (error, response, body) {
        console.log(body);
    })
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

    return json;
}

getKeyPhrasesWrapper("Hello. My name is Domingo.\nHow are you?");
