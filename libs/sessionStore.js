const Store = require('koa-session-mongoose');
const mongoConnection = require('../libs/mongoose');

const mongoStore = new Store({
    collection: `userSessions`,
    connection: mongoConnection
});

module.exports = mongoStore;