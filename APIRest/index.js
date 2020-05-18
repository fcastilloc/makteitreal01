const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const api = require('./api');
const app = express();

app.use(bodyParser.json());
app.use('/api', api);

app.listen(config.port, () => {
    console.log(`Servidor iniciado...Puerto:${config.port}`);
});