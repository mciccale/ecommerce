import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { config } from '../utils';
import UserModel from '../user/user.model';

const dummyUsers = [
  {
    username: 'mciccale',
    email: 'mciccale@gmail.com',
    password: 'password123',
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
    password: 'janepassword',
  },
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'johnpassword',
  },
];

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    await UserModel.deleteMany({});

    const promiseArray = dummyUsers.map(({ email, username, password }) => {
      const passwordHash = bcrypt.hashSync(password, 10);
      return new UserModel({ email, username, passwordHash }).save();
    });

    await Promise.all(promiseArray);

    console.log('Database Seeding Complete!');
  } catch (e) {
    console.error(e);
    return;
  } finally {
    mongoose.connection.close();
  }
})();
