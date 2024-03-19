import mongoose, { Model, Schema, model } from 'mongoose';
import { IMessage } from '../types';

const messageSchema = new Schema(
	{
		chatId: String,
		senderId: String,
		text: String,
	},
	{ timestamps: true },
);

const message: Model<IMessage> =
	mongoose.models.message || model('Message', messageSchema);

export default message;
