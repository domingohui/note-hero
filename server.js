let express = require('express');
let app = express();
app.set('view engine', 'jade');

app.use(express.static('lib'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
        res.sendfile('index.html', {root: __dirname })
});

app.listen(8000);
