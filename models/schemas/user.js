import bcrypt from 'bcrypt';
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
});

usersSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};
usersSchema.methods.setAvatar = function () {
  this.avatarURL = gravatar.url(this.email, { d: 'monsterid' });
};

const User = mongoose.model('users', usersSchema);

export { User };