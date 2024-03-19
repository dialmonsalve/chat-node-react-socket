export interface IUser {
	name: string;
	email: string;
	password: string;
}

export interface IChat {
	members: string[]
}

export interface IMessage{
	chatId:string
	senderId:string
	text:string
}