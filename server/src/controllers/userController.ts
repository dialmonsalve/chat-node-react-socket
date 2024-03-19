import { type Request, type Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateJWT } from '../utils/jwt';
import { db } from '../database/db';

const register = async (req: Request, res: Response) => {
	await db.connect();
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);

	try {
		const user = await User.create({
			name,
			email,
			password: passwordHash,
		});

		const token = generateJWT({ id: user._id.toString(), name });
		const newUser = {
			_id: user._id,
			name,
			email,
			token,
		};
		return res.json({ data: newUser });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	await db.connect();

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Error in credentials' }] });
		}
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Error in credentials' }] });
		}
		const token = generateJWT({ id: user._id.toString(), name: user.name });

		const data = {
			_id: user._id,
			name: user.name,
			email,
			token,
		};
		return res.json({ data });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const findOneById = async (req: Request, res: Response) => {
	const { id } = req.params;

	await db.connect();

	try {
		const user = await User.findById(id).select(
			'-password -createdAt -updatedAt -__v',
		);

		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
		}
		return res.json({ data: user });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const getAll = async (_req: Request, res: Response) => {
	await db.connect();

	try {
		const users = await User.find().select(
			'-password -createdAt -updatedAt -__v',
		);

		return res.json({ data: users });
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default {
	register,
	login,
	findOneById,
	getAll,
};
