module.exports.addMdTo = generateMdSource;

// var fs = require("fs");
function frstCap (str) {
    return str.charAt(0).toUpperCase().concat(str.slice(1));
}

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
    const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    var res = data.split('\n');
    res[0] = frstCap("#  ".concat(res[0].trim()));

    var tmp = [];
    console.log(typeof(keyPhrases));
    for (var i = keyPhrases.documents.length - 1; i >= 0; i--) {
        tmp[i] = keyPhrases.documents[i];
    }
    tmp = [].concat([], tmp);
    keyPhrs = flatten(tmp);

    for (let i = 1; i < res.length; i++) {
        if (res[i].length > 0) {
            for (let j = tmp.length - 1; j >= 0; j--) {
                if (res[i].includes(tmp[j])) {
                    res[i] = i.toString().concat(".  ", 
                        frstCap(res[i].trim()).replace("/".concat(tmp[j], "/g"), " ** ".concat(tmp[j]," ** ")));
                } else{
                    res[i] = i.toString().concat(".  ", frstCap(res[i].trim()));
                    console.log(i);
                }
            }
        }
    }
    return res.join("\n");
}

//console.log(generateMdSource("This is me.\nHello world!");
