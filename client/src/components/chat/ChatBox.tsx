import { FormEvent, useEffect, useRef, useState } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';

export const ChatBox = () => {
	const [textMessage, setTextMessage] = useState('');
	const { user } = useAuthContext();
	const { currentChat, messages, isLoading, sendMessage } = useChatContext();
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

	// if (isLoading) {
	// 	return (
	// 		<p style={{ textAlign: 'center', width: '100%' }}>Loading chat...</p>
	// 	);
	// }


	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (textMessage === '') return;

		sendMessage({
			textMessage,
			currentChatId: currentChat?._id,
			sender: user,
		}).then((data) => data && setTextMessage(''));
	};

	return (
		<div className='chat-box'>
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
			<form className='form-send' onSubmit={handleSubmit}>
				<input
					type='text'
					value={textMessage}
					onChange={(e) => {
						setTextMessage(e.currentTarget.value);
					}}
					className='input__send'
				/>
				<button
					className='btn__send'
					type='submit'
					disabled={textMessage.length === 0}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className={`${textMessage.length > 0 ? 'image-btn' : 'image-disabled'}`}
					>
						<title>send</title>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
						/>
					</svg>
				</button>
				<button type='button'>&#128512;</button>
			</form>
		</div>
	);
};
