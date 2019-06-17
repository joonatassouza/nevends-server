const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://week:week@cluster0-e0uv3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(cors());

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(express.json());

app.use(require('./routes'));

server.listen(process.env.PORT || '3333');