const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const hbs = require('express-handlebars');

// get config of database
mongoose.connect(config.database);


// on connect database
mongoose.connection.on('connected', () => {
    console.log('mongoose connected as:' + config.database);
});

// on reject database
mongoose.connection.on('error', (err) => {
    console.log('database Rejected ...' + err);
});

// initialization app variable with express
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// chats api routes
const chats = require('./routes/api/chats');

// Port Number
const port = 5000;

// CORS Middleware
app.use(cors());

// set static folder
// To serve static files such as images, CSS files, and JavaScript files
// app.use(express.static(path.join(__dirname, 'public')));// absolute path
/**
 * set view engine for backend test, that is not necessary after added react front end
 */
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname+'/views/layouts'}));
app.set('view engine', 'hbs');

// Body Parser Middleware
app.use(bodyParser.json());
// using chats routes as localhost:portnumber/chats/nextpath.
app.use('/chats', chats);

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected..........');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected........');
    });
});

users = [];
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('setMsgBy', function(data) {
        console.log(data);
        // check this msgBy in chatroom of database
            users.push(data);
            socket.emit('userSet', {msgBy: data});
    });

    socket.on('msg', function(data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    });
});

// index route
app.get('/', (req, res) => {
    res.render('index');
});

// start server here
http.listen(port, () => {
    console.log('SERVER started on port number: '+port);
});

