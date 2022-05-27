import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

//handle passport common
passport.serializeUser((user, done) => {
  console.log(user);
  // done(null, user._id)
  done(null, user);
});
passport.deserializeUser(async (id, done) => {
  // try {
  //     const existFbUser = await User.findById(id).exec()
  //     const { _id, ...info } = existFbUser._doc
  //     done(null, { id: _id, ...info })
  // } catch (err) {
  //     done(null, err)
  // }
  done(null, id);
});
// passport facebook
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: `${process.env.SECRET_SERVER_DOMAIN}/auth/facebook/callback`,
//     profileFields: ['id', 'displayName', 'photos', 'email']
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             const { id, name, picture: { data: { url } }, email } = profile._json
//             const existFbUser = await User.findOne({ facebookId: id }).exec()
//             if (existFbUser) {
//                 return done(null, existFbUser)
//             } else {
//                 const newFbUser = new User({
//                     facebookId: id.toString(),
//                     displayName: name,
//                     profilePhoto: url,
//                     email,
//                     provider: 'facebook',
//                 })
//                 const savedUser = await newFbUser.save()
//                 return done(null, savedUser)
//             }
//         } catch (err) {
//             return done(null, err)
//         }
//     }
// ))
// router.get('/facebook',
//     passport.authenticate('facebook', { authType: "rerequest", scope: ['email'] }))
// router.get('/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/',
//         failureRedirect: '/auth/passport/login/failed'
//     }))

// passport google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: `${process.env.SECRET_SERVER_DOMAIN}/v1/authentication/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
      // try {
      //     const { sub, name, picture, email } = profile._json
      //     const existGGUser = await User.findOne({ googleId: sub }).exec()
      //     if (existGGUser) {
      //         return done(null, existGGUser)
      //     } else {
      //         const newGGUser = new User({
      //             googleId: sub.toString(),
      //             displayName: name,
      //             profilePhoto: picture,
      //             email,
      //             provider: 'google',
      //         })
      //         const savedUser = await newGGUser.save()
      //         return done(null, savedUser)
      //     }
      // } catch (err) {
      //     return done(null, err)
      // }
    },
  ),
);

router.get('/google', passport.authenticate('google', { authType: 'rerequest', scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.SECRET_FRONTEND_DOMAIN,
    failureRedirect: '/v1/authentication/passport/login/failed',
  }),
);

router.get('/passport/logout', (req, res) => {
  req.logout();
  res.redirect('/shop');
});
router.get('/passport/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: '---user failed to authenticate---',
  });
});

export default router;
