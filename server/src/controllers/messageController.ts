import { type Request, type Response } from 'express';

import { db } from '../database/db';
import Message from '../models/messageModel';

const create = async (req: Request, res: Response) => {
	const { chatId, senderId, text } = req.body;

	await db.connect();
	try {
		const message = await Message.create({
			senderId,
			chatId,
			text,
		});

		return res.json({data:message});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const getMessage = async (req: Request, res: Response) => {
	const { chatId } = req.params;

	await db.connect();

	
	try {
		const messages = await Message.find({ chatId });

		return res.json({data: messages});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default {
	create,
	getMessage,
};
