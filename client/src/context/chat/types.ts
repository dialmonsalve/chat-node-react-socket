import { Chat, User, Notification } from '../../types';

export interface OnlineUsers {
	userId: string;
	socketId: string;
}

export interface SendMessage {
	textMessage: string;
	sender: User | null;
	currentChatId?: string;
}

export interface NewMessage {
	chatId: string;
	senderId: string;
	text: string;
	_id: string;
	createdAt: string;
}

export interface ReadNotification {
	oneNotification: Notification;
	userChats?: Chat[] | null;
	user: User | null;
	notifications: Notification[];
}

export interface UserNotification {
	thisUserNotifications: Notification[];
	notifications: Notification[];
}
