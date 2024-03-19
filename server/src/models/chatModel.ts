import mongoose, { Model, Schema, model } from 'mongoose';
import { IChat } from '../types';

const ChatSchema = new Schema(
	{
		members: Array,
	},
	{ timestamps: true },
);

const Chat: Model<IChat> = mongoose.models.Chat || model('Chat', ChatSchema);

export default Chat;
