
var fs = require("fs");

String.prototype.frstCap = function() {
    return this.charAt(0).toUpper().concat(this.slice(1));
};

/* Read from file
// Asynchronous read
fs.readFile('grocery', function (err, data) {
   if (err) {
      return console.error(err);
   }
//console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('grocery', String).toString();

*/

function generateMdSource (data, keyPhrases) {
    var res = data.split('\n');
    res[0] = "#  ".concat(res[0].trim().frstCap());

    var tmp = [];
    for (var i = keyPhrases.documents.length - 1; i >= 0; i--) {
        tmp[i] = keyPhrases.documents[i];
    }
    tmp = [].concat.apply([], tmp);
    keyPhrs = tmp.reduce();

    for (let i = 1; i < res.length; i++) {
        if (res[i].length > 0) {
            for (let j = tmp.length - 1; j >= 0; j--) {
                if (res[i].includes(tmp[j])) {
                    res[i] = i.toString().concat(".  ", res[i].trim().frstCap()).replace("/".concat(tmp[j], "/g"), " ** ".concat(tmp[j]," ** "));
                } else{
                    res[i] = i.toString().concat(".  ", res[i].trim().frstCap());
                    console.log(i);
                }
            }
        }
    }
    return res.join("\n");
}

//console.log(generateMdSource("This is me.\nHello world!");
