const express = require('express');
const app = express();

app.use(require('./routes/profiles_id/userid'));
app.use(require('./routes/root'));

module.exports = app;
