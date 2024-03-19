import { createContext } from 'react';
import { Chat, Errors, Message, Notification, User } from '../../types';
import type {
	NewMessage,
	ReadNotification,
	UserNotification,
	SendMessage,
	OnlineUsers,
} from './types';

type DataBackendUser<T> = {
	errors: Errors;
	data: T | null;
};

interface ContextProps {
	allUsers: User[];
	currentChat: Chat | null;
	error: null | Errors;
	isLoading: boolean;
	messages: (NewMessage | Message)[];
	newMessage: NewMessage | null;
	notifications: Notification[];
	onlineUsers: OnlineUsers[];
	potentialChats: User[];
	userChats: Chat[];
	createChat: ({
		firstId,
		secondId,
	}: { firstId?: string; secondId?: string }) => Promise<void>;
	updateChat: (chat: Chat) => void;

	sendMessage: (
		sendMessage: SendMessage,
	) => Promise<DataBackendUser<NewMessage> | void>;
	markAllNotificationAsRead: (notification: Notification[]) => void;

	markNotificationsAsRead: (data: ReadNotification) => void;
	markThisUserNotificationsAsRead: (data: UserNotification) => void;
}

export const ChatContext = createContext({} as ContextProps);
