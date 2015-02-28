# Prerequisites

Gitlab >= 7.7

```
var GitlabStrategy = require('passport-gitlab').Strategy;

passport.use(new GitlabStrategy({
    clientID: GITLAB_APP_KEY,
    clientSecret: GITLAB_APP_SECRET,
    gitlabURL : "https://gitlab.example.com",
    callbackURL: "http://127.0.0.1:3000/auth/gitlab/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ id: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
```
