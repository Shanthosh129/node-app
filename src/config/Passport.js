const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { encrypt } = require('../utils/CryptoUtils');
require('dotenv').config();

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    try{
        const user = await User.findByPk(id);
        done(null,user);
    }catch(err){
        done(err,null);
    }
});

passport.use(new GoogleStartegy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true,
}, async (req,accessToken , refreshToken, profile, done) => {
    try{
        let user = await User.findOne({ where: { googleID: profile.id } });

        const encryptedAccessToken = encrypt(accessToken);
        const encryptedRefreshToken = refreshToken ? encrypt(refreshToken) : undefined;

        if(user){
            // Update tokens if they have changed
            user.accessToken = encryptedAccessToken;
            if(encryptedRefreshToken){
                user.refreshToken = encryptedRefreshToken;
            }
            await user.save();
        }else{
            //create new user
            user = await User.create({
                googleID: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
            });
        }
        return done(null,user);

    }catch(err){
        console.error('Error in Google Strategy:', err);
        return done(err,null);
    }

}));