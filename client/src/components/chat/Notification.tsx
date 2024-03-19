import { useState } from 'react';

import { useChatContext } from '../../hooks/useChatContext';
import { useAuthContext } from '../../hooks/useAuthContext';

import { unReadNotificationsFunc } from '../../helpers/unReadNotifications';

export const Notification = () => {
	const [isOpen, setIsOPen] = useState(false);
	const { user } = useAuthContext();
	const {
		notifications,
		userChats,
		allUsers,
		markAllNotificationAsRead,
		markNotificationsAsRead,
	} = useChatContext();
	const unreadNotifications = unReadNotificationsFunc(notifications);

	const modifiedNotifications = notifications?.map((notification) => {
		const sender = allUsers?.find((user) => user._id === notification.senderId);
		return {
			...notification,
			senderName: sender?.name,
		};
	});

	return (
		<div className='notifications'>
			<div className='notifications-icon' onClick={() => setIsOPen(!isOpen)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 17'
					strokeWidth='1.5'
					stroke='currentColor'
					className='w-6 h-6'
					width={'20'}
					height={'20'}
				>
					<title>message</title>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
					/>
				</svg>
				{unreadNotifications?.length === 0 ? null : (
					<span className='notification-count'>
						<span>{unreadNotifications?.length}</span>
					</span>
				)}
			</div>
			{isOpen ? (
				<div className='notifications-box'>
					<div className='notifications-header'>
						<h3 style={{ color: 'wheat' }}>Notifications</h3>
						<div
							onClick={() => markAllNotificationAsRead(notifications)}
							style={{ color: 'wheat' }}
							className='mark-as-read'
						>
							Mark all read
						</div>
					</div>
					{modifiedNotifications?.length === 0 ? (
						<span className='notification'> Not notification yet</span>
					) : null}
					{modifiedNotifications?.map((notification, index) => (
						<div
							key={index.toString()}
							className={
								notification.isRead ? 'notification' : 'notification not-read'
							}
							onClick={() =>{

								markNotificationsAsRead({
									oneNotification: notification,
									userChats,
                  user,
                  notifications
								})
								setIsOPen(false)
							}
							}
						>
							<span>{notification.senderName} sent you a message</span>
							<span className='notification-time'>
								{new Date(notification.createdAt).toLocaleString()}
							</span>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};
