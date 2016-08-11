const Auth = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app
	.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Suber secret code is ABC123' });
	})
	.post('/signup', Auth.signup)
	.post('/signin', requireSignin, Auth.signin);
}