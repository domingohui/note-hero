let MarkDownParser = require('./lib/markdown_generator');
let express = require('express');
let app = express();
let body_parser = require('body-parser');
let router = express.Router();
let PORT = 8000;

// Set up middlewares for parsing UTF-8 encoding and JSON 
app.use (body_parser.urlencoded({extended: true}));
app.use (body_parser .json());

// static paths for assets
app.use(express.static('lib'));
app.use(express.static('node_modules'));

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
    res.json( jsonOutput );
});

app.use('/', router);
app.listen(PORT);

console.log ("Listening on localhost:" + PORT);
