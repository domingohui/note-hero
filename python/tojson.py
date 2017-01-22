#!/usr/bin/python


# Path to file with TEXT inputs.
file_path = './text.txt'
f = open(file_path, 'r')

# Trim out the quotation mark in the string
def trimQuo(sen):
	for i in range(0,len(sen)):
		if sen[i] == '"':
			new_sen = sen[0:i]+sen[i+1:len(sen)]
			return trimQuo(new_sen)
	return sen

# Give an array of sentenses in one paragraph
def extractSentense(paragraph):
	sentenses = []
	prev_end = 0 # previous sentense end point
	for loc in range(0,len(paragraph)):
		# break a sentense at each dot
		if paragraph[loc] == '.':
			sen = paragraph[prev_end:loc]
			prev_end = loc+1
			sentenses.append(trimQuo(sen))
	return sentenses


def mainFunc():
	target = open("text.json", 'w')
	target.write("{\"documents\":[") 
	attr_count = 1
	# Each line will be treated as one paragraph
	# Each paragraph call api_cong once
	for line in f:
		# Treat each sentense as one attribute in json
		for sen in extractSentense(line):
			target.write('{'),
			target.write("\"id\":\"%s\",\"text\":\"%s\"" % (attr_count, sen)),
			target.write('},')
			attr_count += 1
	target.write("],}"),

mainFunc()
