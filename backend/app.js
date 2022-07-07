const express = require('express');
const Gun = require('gun');

const app = express();
const port = 4000;
app.use(Gun.serve);

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

Gun({ web: server, localStorage: false });
