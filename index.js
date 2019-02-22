var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function (req, res) {
    context = {title:'Home Page',randNum:randomNum()}
    res.render('home',context) 
});

app.get('/res',function(req,res){
    qParams = []
    for (p in req.query) {
        qParams.push({'name':p,'value':req.query[p]})
    }
    context = {}
    context.resType = 'GET'
    context.dataList = qParams
    res.render('res',context)
})

app.post('/res', function(req,res){
    var qParams = [];
    for (var p in req.body){
      qParams.push({'name':p,'value':req.body[p]})
    }
    console.log(qParams);
    console.log(req.body);
    var context = {};
    context.resType = 'POST'
    context.dataList = qParams;
    res.render('res', context);
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