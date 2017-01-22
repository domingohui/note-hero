
# Simple program that demonstrates how to invoke Azure ML Text Analytics API: key phrases, language and sentiment detection.
import urllib2
import urllib
import sys
import base64
import json
import operator

def analyseTopic():
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
	ana_dict = {} # dictionary for analyse, key->string, value->time of appearance
	for keyphrase_analysis in obj['documents']:
		arr = keyphrase_analysis['keyPhrases']
		for it in arr:
			item = str(it)
			if ana_dict.has_key(item):
				ana_dict[item] += 1
			else:
				ana_dict[item] = 1
	# Sort the dictionary based on keys
	sorted_ana_dict = sorted(ana_dict.items(), key=operator.itemgetter(1), reverse=True)
	''' Fail topic analyse in the following conditions:
	    1. Less than 40 records recorded
	    2. more than 50% of the records are high-frequencies
	'''
	if (len(sorted_ana_dict) < 15):
		print >> sys.stderr, "FAILED! Resource too short!"
		return ""
	high_freq_items = [] # Extract high-frequency phrases
	high_freq = 0
	for item in sorted_ana_dict:
		if len(item[0]) == 0:
			continue
		elif high_freq==0: # first and the highest freq item
			high_freq_items.append(item[0])
			high_freq = item[1]
		elif high_freq == item[1]: # same freq as the highest
			high_freq_items.append(item[0])
		else: # freq decreased, break
			break
	'''
	# *****************DEBUG*******************
	debug_arr = []
	for item in sorted_ana_dict:
		if item[1] == 1:
			break
		else:
			debug_arr.append(item)
	print(sorted_ana_dict)
	# *****************DEBUG*******************
	'''
	# check return condition
	if len(high_freq_items)*2 > len(sorted_ana_dict):
		print >> sys.stderr, "WARNING! Results might be no accurate!"
		return high_freq_items[0]
	else:
		return high_freq_items[0]


print(analyseTopic())

