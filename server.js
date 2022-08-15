const express = require("express");
const app = express();
const methodOverride = require('method-override');

const router = require('./routes');

app.use(methodOverride('_method'));

//middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const port = process.env.port || 8080;

const server = app.listen(port, () => {
    console.log(`Server up on port ${server.address().port}`);
});

server.on("error", (error) => 
`Error in server ${error}`);