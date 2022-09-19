import dotenv from 'dotenv';
import server from './index.js';
import chalk from 'chalk';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;

server.listen(PORT, () => {
    console.log(chalk.bold.green('Server running on port', PORT));
});