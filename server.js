/**
 * Module dependencies.
 */
require("babel/register")({
    stage: 0,
    plugins: ["typecheck"]
});


var express = require('express')
var app = module.exports = express(); //module.exports = express.createServer();
var redirect = require('express-redirect')
    , routes = require('./routes')
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , serveStatic = require('serve-static')
    , errorHandler = require('errorhandler');

require('node-jsx').install();

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/mongo_test");
redirect(app);

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(serveStatic(__dirname + '/public'));

// Routes
app.get("/", routes.index);


// load errorHandler after routes

if (process.env.NODE_ENV !== "production") {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
} else {
    app.use(errorHandler());
}


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
