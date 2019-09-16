/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(15000, () => console.log('Tailor app listening on port 15000'));
