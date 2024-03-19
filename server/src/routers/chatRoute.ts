import express, { Router } from 'express';

import chat from '../controllers/chatController';
import errors from '../controllers/errorsController';

const chatRoute = Router();
chatRoute.use(express.json());

chatRoute.post('/', chat.create);

chatRoute.get('/:userId', chat.findUserChats);

chatRoute.get('/find/:firstId/:secondId', chat.findChat);

chatRoute.use(errors.error404);

export default chatRoute;
