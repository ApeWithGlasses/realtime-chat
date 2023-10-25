import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { createClient } from '@libsql/client/.';

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const db = createClient({
    url: ''
});

io.on('connection', (socket) => {
    console.log('a user has connected');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});