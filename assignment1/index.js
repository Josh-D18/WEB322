const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;
const login = require('./pages/login');
const bank = require('./pages/bank');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, 'views/partials'),
    ]
}));

app.set('view engine', 'hbs');

app.get('/', (_, res) => {
    res.redirect('/login');
});

app.use('/login', login);
app.use('/bank', bank);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});

