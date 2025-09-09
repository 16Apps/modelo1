var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
const port = process.env.PORT || 3001;

server = http.createServer(app);

app.set('view engine', 'ejs');  
app.set('layout', 'layout_image', 'layout_login','layout_virtual', 'layout_cadastro');

app.use(expressLayouts);

app.use(cors());
app.use( bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true,
  parameterLimit:50000
}));

app.use(express.static(__dirname + '/public'));
server = http.createServer(app);

var dbMongo = require('./config/mongo');

app.get('/', (req, res) => {
    res.send("Deploy automático no Azure funcionando 🚀 - versão 2", {layout: "layout"});
});

// views modelo

app.get('/dashboard', (req, res) => {
    res.render('pages/modelo/dashboard'), {layout: "layout_image"};
});

app.get('/tables', (req, res) => {
    res.render('pages/modelo/tables'), {layout: "layout_image"};
});

app.get('/billing', (req, res) => {
    res.render('pages/modelo/billing'), {layout: "layout_image"};
});

app.get('/notifications', (req, res) => {
    res.render('pages/modelo/notifications'), {layout: "layout_image"};
});

app.get('/profile', (req, res) => {
    res.render('pages/modelo/profile'), {layout: "layout_image"};
});

app.get('/login', (req, res) => {
    res.render('pages/modelo/sign-in'), {layout: "layout_login"};
});

app.get('/cadastro', (req, res) => {
    res.render('pages/modelo/sign-up'), {layout: "layout_login"};
});



app.get('/users', (req, res) => {
    res.render('pages/users'), {layout: "layout_image"};
});

// app.get('/login', (req, res) => {
//     res.render('pages/modelo/sign-in', {layout: "layout_login"});
// });

// app.get('/cadastro', (req, res) => {
//     res.render('pages/modelo/sign-up', {layout: "layout_cadastro"});
// });

// app.get('/dashboard', (req, res) => {
//     res.render('pages/modelo/dashboard', {layout: "layout_image"});
// });

// app.get('/tables', (req, res) => {
//     res.render('pages/modelo/tables', {layout: "layout_image"});
// });

// app.get('/billing', (req, res) => {
//     res.render('pages/modelo/billing', {layout: "layout_image"});
// });

// app.get('/virtual', (req, res) => {
//     res.render('pages/modelo/virtual-reality', {layout: "layout_virtual"});
// });

// app.get('/profile', (req, res) => {
//     res.render('pages/modelo/profile', {layout: "layout_image"});
// });



server.listen(port, () => {
    console.log(`16Apps Modelo > http://localhost:${port}`);
});

// rotas
require('./public/mongo/routes/default')(app, dbMongo);









