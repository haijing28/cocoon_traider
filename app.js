var express = require('express'), 
    http = require ('http'),

    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');


var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')({
    session: expressSession
});

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

createServer = function createServer() {

    var server = express();
    //specify middleware 
    //server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn',
        store: new MongoStore({
            db: 'traiderioSessions'
        }),
        proxy:true,
        resave:true,
        saveUninitialized:true
    }));


    // attach router handlers
    routes.attachHandlers(server); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});

