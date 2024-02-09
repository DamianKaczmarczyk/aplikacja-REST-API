import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mongoose, { Schema } from 'mongoose';
import * as gravatar from 'gravatar';

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

usersSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};
usersSchema.methods.setAvatar = function () {
  this.avatarURL = gravatar.url(this.email, { d: 'monsterid' });
};
usersSchema.methods.setVerificationToken = function () {
  this.verificationToken = uuidv4();
};

const User = mongoose.model('users', usersSchema);

export { User };