/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , util = require('util')
  , requestify = require('requestify');


function Strategy(options, verify) {
	options = options || {};
	options.gitlabApiURL = options.gitlabApiURL || 'http://git.b-connect.de/api/v3';
	
	if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
	if (!options.gitlabApiURL) { throw new TypeError('OAuth2Strategy requires a authorizationURL option'); }
	
	this._usernameField = options.usernameField || 'username';
	this._passwordField = options.passwordField || 'password';
	
	passport.Strategy.call(this);
	this.name = 'gitlab';
	this._verify = verify;
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
	options = options || {};
	
	var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
	var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
	
	console.log("TRY TO AUTH") ;
	
	if (!username || !password) {
		return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
	}
	
	var self = this;
	function verified(err, user, info) {
		if (err) { return self.error(err); }
		if (!user) { return self.fail(info); }
		self.success(user, info);
	}
	try {
		if (self._passReqToCallback) {
			this._verify(req, username, password, verified);
		} else {
			this._verify(username, password, verified);
		}
	} catch (ex) {
		return self.error(ex);
	}
};

