var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var mongoLocation = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
|| 'mongodb://localhost/test';

mongoose.connect(mongoLocation);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('we good');
  // yay!
});

var SpriteSchema = mongoose.Schema({
    name : String,
    author : String,
    pose : Number,
    colors : [String],
    width : Number,
    height : Number
});

var Sprite = mongoose.model('Sprite', SpriteSchema);

function saveSprite(sprite) {
    var newSprite = new Sprite(sprite);

    newSprite.save(function(err, newSprite) {
      if (err) return console.error(err);
      console.log('sprite saved!');
    });
};

/* SERVER CONFIGURATION */

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/go', function (req, res) {
    var author = req.query.author;
    var name = req.query.name;

    Sprite.find({ 'author': author, 'name' : name }, function (err, spriteDocuments) {
        if (err) {
            return res.status(500).send("Something went wrong.");
        }
        console.log(spriteDocuments.length);

        var numPoses = 10;
        var sprites = new Array(numPoses);
        var numDocuments = spriteDocuments.length;
        for(var i = 0; i < numPoses; i++) {
            sprites[i] = null;
            for(var j = 0; j < numDocuments; j++) {
                if (spriteDocuments[j].pose == i) {
                    sprites[i] = spriteDocuments[j];
                }
            }
        }

        res.render('canvas', {sprites : sprites, author : author, name : name});
    });
});

app.post('/go', function(req, res) {
    saveSprite(req.body.sprite);
    res.status(200).send({success: true });
});

/*
 * Extract url encoded parameters on requests and put it in req.body
 */

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
                res.redirect('/go');
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
  console.log('PixelCraft listening at http://localhost:' + port);
});
