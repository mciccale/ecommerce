import mongoose from 'mongoose';
import config from './config';
import logger from './logger';

const dbConnect = async () => {
  if (!config.MONGODB_URI) throw Error('Specify a valid MongoDB URI');

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('connected to MongoDB');
  } catch (e) {
    logger.error('error connecting to MongoDB:', e);
  }
};

export { dbConnect };
