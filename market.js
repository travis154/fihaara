
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , jade_browser = require('jade-browser');

var app = express();

//io.listen(app);

app.set('port', process.env.PORT || 3034);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/templates.js',function(req,res,next){
	jade_browser('/templates.js', '**',{root: __dirname + '/views/components', minify: true})(req,res,next);
});

var sock = http.createServer(app);
sock.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

