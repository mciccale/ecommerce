import { configDotenv } from 'dotenv';
configDotenv();

const PORT = Number(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

export default { PORT, MONGODB_URI, SECRET };
