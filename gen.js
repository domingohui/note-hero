
var fs = require("fs");

// Asynchronous read
fs.readFile('grocery', function (err, data) {
   if (err) {
      return console.error(err);
   }
   //console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('grocery', String).toString();

var res = data.split('\n');
res[0] = "# ".concat(res[0]);

var keyPhrs = 
var tmp = [];
for (var i = keyPhrs.documents.length - 1; i >= 0; i--) {
	tmp[i] = keyPhrs.documents[i];
}
tmp = [].concat.apply([], tmp);
keyPhrs = tmp.reduce();

for (var i = 1; i < res.length; i++) {
	if (res[i].length > 0) {
		for (var i = tmp.length - 1; i >= 0; i--) {
			if (res[i].includes(tmp[i])) {
				res[i] = i.toString().concat(". ", res[i]).replace("/".concat(tmp[i], "/g"), "**".concat(tmp[i],"**"));
			} else{
				res[i] = i.toString().concat(". ", res[i]);
				console.log(i);
			}
		}
	}
}
console.log(res.join("\n"));