const Gun = require('gun');
const express = require('express');

const app = express();
const port = 8765;
app.use(Gun.serve);

const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

Gun({ file: 'db/data', web: server, localStorage: false });
