var express = require('express'),
    path = require('path'),
    http = require('http')

var app = express()
app.configure(function () {
    app.set('port', process.env.PORT || 3001);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'supersecretkeygoeshere'}));
    //app.use(allowCrossDomain);
    app.use(app.router);
})

app.get('/', function(req, res) {
    res.render('index.html')
})

var server = http.createServer(app)
server.listen(app.get('port'), function() {
  console.log("server listening on port: " + app.get('port'))
})
