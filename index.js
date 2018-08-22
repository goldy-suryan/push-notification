const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const port = 3000 || process.env.PORT;
const path = require('path');

const app = express();

// keys are generally for who is sending you the notification
const publicVapidKey = 'BN-2l85vuExC2JIohWCNf4jm6qnISRt2lwoInl2iv0nFcUgudWU8yopLs64yZ_DZ1NUY_-AczN3rZvuEVPd2w5c';
const privateVapidKey = '40OANy_MOl9reg6H-1VmaaRg1gfm0FGeJvR-wR1IxmM';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, PATCH, GET, FETCH');
        res.status(200).json({});
    }
    next();
});

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Routes

app.post('/subscribe', (req, res) => {
    // getting push subscription Object
    const subscribe = req.body;
    res.status(201).json({});

    const payload = JSON.stringify({ title: 'Push Test' });

    // Passing object to sendNotification
    webPush.sendNotification(subscribe, payload)
        .catch(e => res.status(500).json({ message: `error is ${e}` }));
});

app.listen(port, (err) => {
    console.log(err || `http://localhost:${port}`);
});