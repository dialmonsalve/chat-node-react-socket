import { FormEvent, useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';

export const ChatBox = () => {
	const [textMessage, setTextMessage] = useState('');
	const { user } = useAuthContext();
	const { currentChat, messages, isLoading, sendMessage } =
		useChatContext();
	const { recipientUser } = useFetchRecipient({ chat: currentChat, user });

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	if (!recipientUser) {
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>
				No conversation selected yet
			</p>
		);
	}

	if (isLoading) {
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>Loading chat...</p>
		);
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		sendMessage({
			textMessage,
			currentChatId: currentChat?._id,
			sender: user,
		}).then((data) => data && setTextMessage(''));
	};

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
			className='chat-box'
		>
			<div className='chat-header'>
				<strong>{recipientUser.name}</strong>
			</div>
			<div className='messages'>
				{messages?.map((message, index) => (
					<div
						ref={scrollRef}
						key={index.toString()}
						className={`${
							message.senderId === user?._id
								? 'message self align-self-end flex-grow-0'
								: 'message align-self-start flex-grow-0'
						}`}
					>
						<span>{message.text}</span>
						<span className='message-footer'>
							{new Date(message.createdAt).toLocaleString()}
						</span>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={textMessage}
					onChange={(e) => setTextMessage(e.currentTarget.value)}
				/>
				<button type='submit'>send</button>
				<button type='button'>&#128512;</button>
			</form>
		</div>
	);
};
