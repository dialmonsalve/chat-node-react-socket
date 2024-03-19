import { useAuthContext } from '../hooks/useAuthContext';
import { useChatContext } from '../hooks/useChatContext';

import { PotencialChats } from '../components/chat/PotencialChats';
import { UserChat } from '../components/chat/UserChat';
import { ChatBox } from '../components/chat/ChatBox';

function ChatPage() {
	const { userChats, updateChat,  } = useChatContext();
	const { user, isLoading: userLoading } = useAuthContext();

	return (
		<div className='chat'>
			{<PotencialChats />}
			{userChats && userChats?.length < 1 ? null : (
				<div className='contain-chat'>
					<div className='messages-box'>
						{userLoading && <p>Loading chats...</p>}
						{userChats?.map((chat, index) => {
							return (
								<div key={index.toString()} onClick={() => updateChat(chat)}>
									<UserChat chat={chat} user={user} />
								</div>
							);
						})}
					</div>

					<ChatBox />
				</div>
			)}
		</div>
	);
}

export default ChatPage;
