import {
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Socket, io } from 'socket.io-client';

import { ChatContext } from './ChatContext';
import { baseUrl, postRequest, getRequest } from '../../services/api';

import { Chat, Errors, Message, User, Notification } from '../../types';
import type { NewMessage, OnlineUsers, ReadNotification, SendMessage, UserNotification } from './types';


interface Props {
	children: ReactNode;
	user: User | null;
}

export const ChatProvider = ({ children, user }: Props) => {
	const [userChats, setUserChats] = useState([] as Chat[]);
	const [potentialChats, setPotentialChats] = useState([] as User[]);
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);

	const [messages, setMessages] = useState<(Message | NewMessage)[]>([]);
	const [newMessage, setNewMessage] = useState<NewMessage | null>(null);

	const [allUsers, setAllUsers] = useState([] as User[]);

	const [error, setError] = useState<Errors | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [socket, setSocket] = useState<Socket>();
	const [onlineUsers, setOnlineUsers] = useState([] as OnlineUsers[]);

	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		const newSocket = io('http://localhost:3001');
		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
		};
	}, [user]);

	useEffect(() => {
		if (socket === undefined) return;
		socket.emit('addNewUser', user);
		socket.on('getOnlineUsers', (resp: OnlineUsers[]) => {
			setOnlineUsers(resp);
		});
		return () => {
			socket.off('getOnlineUsers');
		};
	}, [socket]);

	useEffect(() => {
		if (socket === undefined) return;
		const recipientId = currentChat?.members?.find((_id) => _id !== user?._id);

		socket.emit('sendMessage', { ...newMessage, recipientId });
	}, [newMessage]);

	useEffect(() => {
		if (socket === undefined) return;

		socket.on('getMessage', (resp: Message) => {
			if (currentChat?._id !== resp.chatId) return;

			setMessages((prev) => [...prev, resp]);
		});
		socket.on('getNotifications', (resp: Notification) => {
			if (currentChat?.members[1] === resp.senderId) return;

			const isChatOpen = currentChat?.members.some(
				(id) => id === resp.senderId,
			);

			if (isChatOpen) {
				setNotifications((prev) => [{ ...resp, isRead: true }, ...prev]);
			} else {
				setNotifications((prev) => [resp, ...prev]);
			}
		});
		return () => {
			socket.off('getMessage');
			socket.off('getNotifications');
		};
	}, [socket, currentChat]);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		const getUser = async () => {
			const resp = await getRequest<User[]>(`${baseUrl}/users`);

			try {
				if (resp?.errors) {
					setError(resp?.errors);
					return;
				}
				const pChats = resp?.data?.filter((u) => {
					let isChatCreated = false;

					if (user?._id === u._id) return false;

					if (userChats) {
						isChatCreated = userChats.some((chat) => {
							return chat.members[0] === u._id || chat.members[1] === u._id;
						});
					}
					return !isChatCreated;
				});

				setPotentialChats(pChats);
				setAllUsers(resp.data);
			} catch (e) {
				console.log(e);
			} finally {
				setIsLoading(false);
			}
		};
		getUser();
	}, [userChats]);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		if (user?._id) {
			getRequest<Chat[]>(`${baseUrl}/chats/${user?._id}`)
				.then((resp) => {
					if (resp?.errors) return setError(resp?.errors);

					setUserChats(resp?.data);
				})
				.catch((e) => console.log(e))
				.finally(() => setIsLoading(false));
		}
	}, [user, notifications]);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		getRequest<Message[]>(`${baseUrl}/messages/${currentChat?._id}`)
			.then((resp) => {
				if (resp?.errors) return setError(resp?.errors);

				setMessages(resp?.data);
			})
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	}, [currentChat]);

	const sendMessage = useCallback(async (sendMessage: SendMessage) => {
		const { currentChatId, sender, textMessage } = sendMessage;
		const resp = await postRequest<NewMessage>({
			url: `${baseUrl}/messages`,
			body: JSON.stringify({
				chatId: currentChatId,
				senderId: sender?._id,
				text: textMessage,
			}),
		});
		if (resp?.errors) return setError(resp?.errors);

		setNewMessage(resp?.data);
		setMessages((prev) => [...prev, resp.data]);

		return resp;
	}, []);

	const createChat = useCallback(
		async ({ firstId, secondId }: { firstId?: string; secondId?: string }) => {
			setIsLoading(true);
			setError(null);

			try {
				const resp = await postRequest<Chat>({
					url: `${baseUrl}/chats`,
					body: JSON.stringify({ firstId, secondId }),
				});

				if (resp?.errors) return setError(resp?.errors);

				setUserChats((prev) => [...prev, resp.data]);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const updateChat = useCallback((chat?: Chat) => {
		chat && setCurrentChat(chat);
	}, []);

	const markAllNotificationAsRead = useCallback(
		(notifications: Notification[]) => {
			const mNotifications = notifications?.map((notification) => ({
				...notification,
				isRead: true,
			}));

			setNotifications(mNotifications);
		},
		[],
	);
	const markNotificationsAsRead = useCallback(
		({ oneNotification, userChats, user, notifications }: ReadNotification) => {
			const desireChat = userChats?.find((chat) => {
				const chatMembers = [user?._id, oneNotification.senderId];
				const isDeseareChat = chat?.members.every((member) => {
					return chatMembers.includes(member);
				});

				return isDeseareChat;
			});

			const mNotification = notifications?.map((notification) => {
				if (oneNotification.senderId === notification.senderId) {
					return { ...oneNotification, isRead: true };
				}
				return notification;
			});
			updateChat(desireChat);
			setNotifications(mNotification);
		},
		[],
	);

	const markThisUserNotificationsAsRead = useCallback(
		({ notifications, thisUserNotifications }: UserNotification) => {
			if (notifications) {
				const mNotifications = notifications?.flatMap((notification) => {
					return thisUserNotifications?.map((userNotification) =>
						userNotification?.senderId === notification?.senderId
							? { ...userNotification, isRead: true }
							: notification,
					);
				});
				setNotifications(mNotifications);
			}
		},
		[],
	);

	return (
		<ChatContext.Provider
			value={{
				allUsers,
				currentChat,
				error,
				isLoading,
				messages,
				newMessage,
				notifications,
				onlineUsers,
				potentialChats,
				userChats,
				createChat,
				markAllNotificationAsRead,
				markNotificationsAsRead,
				markThisUserNotificationsAsRead,
				sendMessage,
				updateChat,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
