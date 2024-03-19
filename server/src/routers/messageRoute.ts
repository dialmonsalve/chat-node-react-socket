import express, { Router } from 'express';

import message from '../controllers/messageController';
import errors from '../controllers/errorsController';

const messageRoute = Router();
messageRoute.use(express.json());

messageRoute.post('/', message.create);

messageRoute.get('/:chatId', message.getMessage);

messageRoute.use(errors.error404);

export default messageRoute;
