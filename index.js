const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const port = 3000 || process.env.PORT;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(port, (err) => {
    console.log(err || `http://localhost:${port}`);
});