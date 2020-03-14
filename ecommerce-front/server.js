const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());

//force domain to be the url set in the env file
app.use(require('express-force-domain')(process.env.FRONT_END));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`React App is running on port ${PORT}`);
});