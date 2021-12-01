const express = require('express');
const router = require('./router');
require('./config/mongoose')

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true})) // middleware that parse json data inside the html req/post
app.use(router)



app.listen(3000, () => {
    console.log('connected to the port 3000 ...');
});
