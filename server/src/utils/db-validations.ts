import type { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { db } from '../database/db';

const existUserWhitEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { email } = req.body;

	try {
		db.connect();
		const user = await User.findOne({ email });

		if (user) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'The user is already registered' }] });
		}
	} catch (err) {
		console.log(err);
	} finally {
		db.connect();
	}

	next();
};

export { existUserWhitEmail };
