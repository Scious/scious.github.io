
// START THE SERVER
// ==============================================
var express = require('express');
var path = require('path');

const app = express();

app.use(express.static(__dirname));

app.listen(3000);
console.log('listening on port ' + 3000);


module.exports = app;