let express = require('express');
let app = express();
let body_parser = require('body-parser');
let router = express.Router();
let PORT = 8000;

app.use (body_parser.urlencoded({extended: true}));
app.use (body_parser .json());

app.set('view engine', 'jade');

// static paths
app.use(express.static('lib'));
app.use(express.static('node_modules'));

// HTTP requests
router.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
});

router.post ('/parse/', function (req, res) {
    console.log ("Getting a POST request: " + req);
    res.write("HELLO RESponseo from parse/");
});

app.use('/', router);
app.listen(PORT);

console.log ("Listening on localhost:" + PORT);
