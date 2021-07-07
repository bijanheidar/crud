const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
// path is an in-built nodejs moudle
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

// config.env in the 'views' folder
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000

// log requests on the console whenever a request is mad
app.use(morgan('tiny'));

// mongodb connection defined and expoterted from connection.js file
connectDB();

// parse request to body-parser
// extended: true will pause the req of the content type from url encoded
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine to ejs (i.e. embedded javascript), 
// so no need to specify the folder name 'views' for ejs files 
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Unable to start the server on port ${PORT}`);
    }
    console.log(`Server is running on http://localhost:${PORT}`)
});