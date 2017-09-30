const server = require('./server/index');
const app = require('./server/express');
const socket = require('./server/webSocket');

server.on('request', app);

server.listen(4040, () => {
    console.log('Server started on port 4040');
});
