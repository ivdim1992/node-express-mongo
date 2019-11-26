const dbConnector = require('./config/db');

dbConnector()
	.then(() => {
		const config = require('./config/config');
		const app = require('express')();
		require('./config/express')(app);
		require('./config/routes')(app);
		app.use(function(req, res, next) {
			res.render('<h1>Error Page</h1>', { errorMessage: err.message });
		});

		app.listen(
			config.port,
			console.log(`App listening on port ${config.port}!`)
		);
	})
	.catch(console.error);
