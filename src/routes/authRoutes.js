const express = require('express');
const passport = require('passport');
const router = express.Router();

//Trigger Google log in
// http://mail.google.com/ scope is required for IMAP access
router.get('/google', passport.authenticate('google', {
    scope:['profile', 'email', 'https://mail.google.com/'],
    accessType : 'offline',
    prompt : 'consent',
}) );
 //Google OAuth2 callback URL
 router.get('/google/callback',
    passport.authenticate('google',{ failureRedirect: '/login'}),
(req, res) => {
    // Successful authentication
    // In a real app, you might redirect to the frontend with a session cookie
    // For now, we redirect to a simple success page or the frontend URL
    console.log("✅ User authenticated:", req.user);
    res.redirect('http://localhost:3000/dashboard'); 
  }
);
// 3. Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('http://localhost:3000');
  });
});

// 4. Check Current User (For Frontend to validate session)
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;