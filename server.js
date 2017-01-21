let express = require('express');
let app = express();
let PORT = 8000;

app.set('view engine', 'jade');

// static paths
app.use(express.static('lib'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
        res.sendFile('index.html', {root: __dirname })
});

app.listen(PORT);

console.log ("Listening on localhost:" + PORT);
