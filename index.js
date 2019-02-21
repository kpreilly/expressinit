var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function (req, res) {
    num = randomNum()
    res.render('home',{title:"Home Page",randNum:num}) 
});

app.get('/other-page', function (req, res) {
    res.render('other-page',{title:'Another Page'});
});

app.use(function (req, res) {
    res.status(404);
    res.render('404',{title:'404 - Page not Found'});
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

function randomNum() {
    return Math.floor(Math.random()*10000+1)
}