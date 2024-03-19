import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { userRoute, chatRoute, messageRoute } from './routers';
import config from './utils/envConfig';
import { db } from './database/db';

const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://localhost:5173',
			'http://localhost:4321',
		],
	}),
);

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PROD_PORT || process.env.DEV_PORT;

db.disconnect();

app.listen(PORT, () => {
	console.log(`Server listen on port ${config.port}...`);
});
