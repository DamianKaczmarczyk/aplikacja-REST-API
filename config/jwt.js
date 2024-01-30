import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import dotenv from 'dotenv';
import { User } from '../models/schemas/user.js';

dotenv.config();
const { secret } = process.env;

export default function passportAuth() {
  const options = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JWTStrategy(options, async function (payload, done) {
      User.findOne({ email: payload.email })
        .then(user => {
          if (!user) {
            return done(new Error('Tutaj jest błąd'));
          }
          return done(null, user);
        })
        .catch(error => done(error));
    })
  );
}