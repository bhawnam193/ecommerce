const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());

//force domain to be the url set in the env file
if ( process.env.PUBLIC_URL ) {
	app.use(require('express-force-domain')(process.env.PUBLIC_URL));	
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`React frontend is running on port ${PORT}`);
});