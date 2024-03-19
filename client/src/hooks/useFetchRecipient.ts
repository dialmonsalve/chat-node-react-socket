import { useEffect, useState } from 'react';

import { baseUrl, getRequest } from '../services/api';
import { Chat, User } from '../types';

interface Props {
	chat: Chat | null;
	user: User | null;
}
type Errors = [{ type: 'field'; msg: string }] | undefined;

export const useFetchRecipient = ({ chat, user }: Props) => {
	const [recipientUser, setRecipientUser] = useState<User | null>(null);
	const [error, setError] = useState<Errors | null>(null);

	const recipientId = chat?.members?.find((_id) => _id !== user?._id);

	useEffect(() => {
		const getUser = async () => {
			if (!recipientId) return null;

			const response = await getRequest<User>(
				`${baseUrl}/users/find/${recipientId}`,
			);

			if (response?.errors) {
				setError(response?.errors);
				return;
			}
			setRecipientUser(response?.data);
		};

		getUser();
	}, [recipientId]);

	return {
		recipientUser,
		error,
	};
};
