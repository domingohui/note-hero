const MarkDownParser = require('./server_src/markdown_generator');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const router = express.Router();
const PORT = 8000;

// Set up middlewares for parsing UTF-8 encoding and JSON 
app.use (body_parser.urlencoded({extended: true}));
app.use (body_parser .json());

// static paths for assets
/*
router.use(express.static(__dirname + '/lib'));
router.use(express.static(__dirname + '/node_modules'));
*/
app.use(express.static(__dirname + '/public'));


// HTTP requests
router.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
});

router.post ('/parse/', function (req, res) {
    console.log( 'parse/ POST request:' );
    console.log( req.body);
    let parsedTextInMD = MarkDownParser.getMdSourceCode (req.body.data);
    let jsonOutput = {data: parsedTextInMD};
    console.log( 'parse/ Response:' );
    console.log( jsonOutput );
    console.log();
    res.json( jsonOutput );
});

app.use('/', router);
app.listen(PORT);

console.log ("Listening on localhost:" + PORT);
