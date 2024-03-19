import { type Request, type Response } from 'express';

import { db } from '../database/db';
import Chat from '../models/chatModel';

const create = async (req: Request, res: Response) => {
	await db.connect();
	const { firstId, secondId } = req.body;

	try {
		const chat = await Chat.findOne({
			members: { $all: [firstId, secondId] },
		});
		if (chat) {
			return res.json({ data: chat });
		}

		const newChat = await Chat.create({
			members: [firstId, secondId],
		});

		return res.json({ data: newChat });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const findUserChats = async (req: Request, res: Response) => {
	const { userId } = req.params;

	await db.connect();

	try {
		const chats = await Chat.find({
			members: { $in: [userId] },
		});

		return res.json({ data: chats });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const findChat = async (req: Request, res: Response) => {
	const { firstId, secondId } = req.params;

	await db.connect();

	try {
		const chat = await Chat.findOne({
			members: { $all: [firstId, secondId] },
		});

		return res.json({ data: chat });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default {
	create,
	findUserChats,
	findChat,
};
