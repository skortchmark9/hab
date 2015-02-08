var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://james:abc123@ds029831.mongolab.com:29831/comics-server-db');

var SpriteSchema = mongoose.Schema({
    name : String,
    author : String,
    pose : String,
    colors : [String],
    width : Number,
    height : Number
});

var Update = mongoose.model('SpriteSchema', SpriteSchema);

/* SERVER CONFIGURATION */

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    Update.findOne({}, {}, { sort: { 'created_at': -1} }, function(err, newest_update){
        if (err){
            res.status(500).send("Something went wrong.");
        }
        res.render('canvas', {up: newest_update});
    });
});

app.get('/rss', function (req, res) {
    Update.findOne({}, {}, { sort: { 'created_at': -1} }, function(err, newest_update){
        if (err){
            res.status(500).send("Something went wrong.");
        }
        res.render('rss', {up: newest_update});
    });
});

/*
 * Extract url encoded parameters on requests and put it in req.body
 */
app.use(bodyParser.urlencoded({extended: false}));

/*
 * Defines the actions we take when the user submits a post
 */
app.post('/submit', function (req, res) {

    Update.findOne({}, {}, { sort: { 'created_at': -1} }, function(err, newest_update){

        var d = new Date();
        if (newest_update != null){
            var nd = newest_update.CurrentDate;
            console.log(nd.day);
            console.log(nd.month);
            console.log(nd.year);
        }
        if (newest_update == null || d.getDate() != nd.day || d.getMonth() != nd.day || d.getFullYear() != nd.year){
            newUpdate = new Update({
                CurrentDate: {day: d.getDate(), month: d.getMonth(), year: d.getFullYear()},
                url_0: req.body.url_0 || false,
                url_1: req.body.url_1 || false,
                url_2: req.body.url_2 || false,
            });
            newUpdate.save(function(){
                console.log("saved update!");
                res.redirect('/');
            });
        }
    });

});

app.use('/', express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.status(404).send('404 not found.');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('ComicServer listening at http://localhost:' + port);
});
