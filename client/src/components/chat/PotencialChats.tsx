import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';

export const PotencialChats = () => {
	const { potentialChats, createChat, isLoading, onlineUsers } =
		useChatContext();
	const { user, isLoading: userLoading } = useAuthContext();

	if (userLoading || isLoading) {
		return <div>Loading...</div>;
	}

	const isOnline = (id?: string) =>
		onlineUsers.some((user) => user?.userId === id);

	return (
		<div className='all-users'>
			{potentialChats?.map((u, index) => {
				return (
					<div
						className='single-user'
						key={index.toString()}
						onClick={() => createChat({ firstId: user?._id, secondId: u?._id })}
					>
						{u.name}
						<span className={isOnline(u?._id) ? 'user-online' : ''} />
					</div>
				);
			})}
		</div>
	);
};
