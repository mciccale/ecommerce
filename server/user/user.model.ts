import mongoose from 'mongoose';
import { type User } from './user.types';

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: [true, 'Username field is required'],
    minlength: 1,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password field is required'],
  },
});

userSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
