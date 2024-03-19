export interface Chat {
	_id?: string;
	members: string[];
	createdAt: string;
	text: string;
}

export type Errors = [{ type: 'field'; msg: string }] | undefined;

export interface User {
	_id?: string;
	name: string;
	email: string;
	password: string;
	token?: string;
}

export interface Login {
	email: string;
	password: string;
}

export interface Message {
	senderId: string;
	chatId: string;
	text: string;
	createdAt: string;
}

export interface Notification {
	senderId: string;
	isRead:boolean
	createdAt: string;
}
