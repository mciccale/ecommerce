import { configDotenv } from 'dotenv';
configDotenv();

const PORT = Number(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;

export default { PORT, MONGODB_URI };
