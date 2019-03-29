const mongoose = require('mongoose');
const config = require('config');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.Promise = global.Promise;
mongoose.plugin(beautifyUnique);
mongoose.set('debug', true);
module.exports.mongooseConnection = mongoose.connect(config.get('mongoURI'))
    .then(()=> {console.log(`mongoDB connected`)})
    .catch((e) => (console.log(e)));

module.exports = mongoose;