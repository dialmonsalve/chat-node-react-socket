import { unReadNotificationsFunc } from '../../helpers/unReadNotifications';
import { useChatContext } from '../../hooks/useChatContext';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';

import { Chat, User } from '../../types';

interface Props {
	chat: Chat;
	user: User | null;
}

export const UserChat = ({ chat, user }: Props) => {
	const { recipientUser } = useFetchRecipient({ chat, user });
	const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
		useChatContext();

	const { lastMessage } = useFetchLatestMessage(chat);

	const isOnline = onlineUsers.some(
		(user) => user?.userId === recipientUser?._id,
	);

	const unreadNotifications = unReadNotificationsFunc(notifications);
	const thisUserNotifications = unreadNotifications?.filter(
		(notification) => notification.senderId === recipientUser?._id,
	);

	const truncateText = (text: string) =>
		text.length > 30 ? `${text.substring(0, 17)}...` : text.substring(0, 30);

	return (
		<div
			className='user-card horizontal-chat'
			onClick={() => {
				if (thisUserNotifications && thisUserNotifications?.length > 0) {
					markThisUserNotificationsAsRead({
						thisUserNotifications,
						notifications,
					});
				}
			}}
		>
			<div className='horizontal-flex'>
				<div>
					<img src='avatar.svg' height={'35px'} alt='avatar' />
				</div>
				<div className='text-content'>
					{recipientUser?.name}
					<div className='text'>
						{lastMessage?.text ? truncateText(lastMessage?.text) : ''}
					</div>
				</div>
			</div>
			<div className='horizontal-flex-date'>
				<div className='date'>
					{lastMessage ? new Date(lastMessage?.createdAt).toLocaleString() : ''}
				</div>
				<div
					className={
						thisUserNotifications && thisUserNotifications?.length > 0
							? 'this-user-notifications'
							: ''
					}
				>
					{thisUserNotifications && thisUserNotifications?.length > 0
						? thisUserNotifications?.length
						: ''}
				</div>
				<span className={isOnline ? 'user-online' : ''} />
			</div>
		</div>
	);
};
