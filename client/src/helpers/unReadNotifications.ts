import { Notification } from '../types';

export const unReadNotificationsFunc = (notifications: Notification[]) =>
	notifications?.filter((n) => n.isRead === false);
