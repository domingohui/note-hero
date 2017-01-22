
# Simple program that demonstrates how to invoke Azure ML Text Analytics API: key phrases, language and sentiment detection.
import urllib2
import urllib
import sys
import base64
import json


# Azure portal URL.
base_url = 'https://westus.api.cognitive.microsoft.com/'

headers = {'Content-Type':'application/json', 'Ocp-Apim-Subscription-Key':'db9b5fd1cb7c493789373ebf27c0524d'}
      
# Path to file with JSON inputs.
file_path = './text.json'
f = open(file_path, 'r')
input_texts = f.read()

num_detect_langs = 1;


# Detect key phrases.
batch_keyphrase_url = base_url + 'text/analytics/v2.0/keyPhrases'
req = urllib2.Request(batch_keyphrase_url, input_texts, headers) 
response = urllib2.urlopen(req)
result = response.read()
obj = json.loads(result)
for keyphrase_analysis in obj['documents']:
    print('Key phrases ' + str(keyphrase_analysis['id']) + ': ' + ', '.join(map(str,keyphrase_analysis['keyPhrases'])))


