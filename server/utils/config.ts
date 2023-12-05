import { configDotenv } from 'dotenv';
configDotenv();

const PORT = Number(process.env.PORT);
const MONGODB_URI = Number(process.env.MONGODB_URI);

export default { PORT, MONGODB_URI };
