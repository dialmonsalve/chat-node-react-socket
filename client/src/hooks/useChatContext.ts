import { useContext } from 'react';
import { ChatContext } from '../context/chat/ChatContext';

export const useChatContext = () => {
	const context = useContext(ChatContext);

	if (!context || context === undefined)
		throw new Error('Context is not used inside the parent components');

	return context;
};
