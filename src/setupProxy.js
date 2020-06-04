const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/ws', {
			target: 'http://localhost:5500/ws',
			changeOrigin: true
		})
	);
	app.use(
		proxy('/api/*', {
			target: 'http://localhost:3500/api',
			changeOrigin: true
		})
	);
};
