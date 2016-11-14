var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
var util = require('util');
var hbs = require('express-handlebars');

var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });

app.set("views", __dirname + "/views");
app.engine('html', hbs({extname: '.html', defaultLayout: 'master', layoutsDir: __dirname + "/views"}))
app.set('view engine', 'html');
app.use("/assets", express.static(__dirname + "/assets"));
app.get("/", function(req, res){
	res.render("index");
});

var port = process.env.PORT || 3000;
server.listen(port, () => console.log('Server running on port ' + port));