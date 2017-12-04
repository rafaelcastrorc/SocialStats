module.exports = function(app, passport) {

  app.get('/new_note', isLoggedIn, function(req, res) {
		res.render('new_note.ejs', {
			user : req.user
		});
	});

  app.post('/notes', isLoggedIn, function(req, res) {
    if(!req.body.content) {
        res.status(400).send({message: "Note can not be empty"});
    }
    var user = req.user;
    var note = {title: req.body.title || "Untitled Note", content: req.body.content}
    user.notes.push(note);
    user.save(function(err) {
        if (err)
            throw err;
    });
    res.redirect('/notes');
  });

  app.get('/notes', isLoggedIn, function(req, res) {
    res.render('notes.ejs', {
			user : req.user
		});
  });

  app.get('/notes/:noteId', isLoggedIn, function(req, res) {
    res.render('view_note.ejs', {
      user: req.user,
      ind: req.params.noteId
    })
  });

  app.put('/notes/:noteId', isLoggedIn, function(req, res) {
  });

  app.get('/notes/delete/:noteId', isLoggedIn, function(req, res) {
    var user = req.user;
    var ind = req.params.noteId;
    user.notes.pull({ _id: ind })
    user.save(function(err) {
        if (err)
            throw err;
    });
    res.redirect('/notes');
  });

	app.get('/landing', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/connect/local', function(req, res) {
		res.render('connect-local.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/connect/local',
		failureFlash : true
	}));

	app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

	app.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
	app.get('/connect/twitter/callback',
		passport.authorize('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/unlink/local', function(req, res) {
		var user = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	app.get('/unlink/facebook', function(req, res) {
		var user = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	app.get('/unlink/twitter', function(req, res) {
		var user = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
