const server = require('./app');
const config = require('config');

server.listen(config.get('server.port'), () => {
    console.log(`server is listening localhost:port ${config.get('server.port')}`);
});