import mongoose from 'mongoose';
import { IDatabaseUser } from './user.types';

const userSchema = new mongoose.Schema<IDatabaseUser>({
  username: {
    type: String,
    required: [true, 'Username field is required'],
    unique: true,
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

const UserModel = mongoose.model<IDatabaseUser>('User', userSchema);

export default UserModel;
