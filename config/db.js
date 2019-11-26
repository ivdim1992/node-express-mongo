const config = require('./config');
const mongoose = require('mongoose');

//Returns Promise
module.exports = () => {
	mongoose.set('useCreateIndex', true);
	return mongoose.connect(
		config.dbURL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		console.log('Database connected')
	);
};
