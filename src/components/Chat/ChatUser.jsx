const ChatUser = ({ name, text, color }) => {
	return (
		<div className='chat_user'>
			<div className='chat_user-avatar' style={{ backgroundColor: color }}>
				{name.slice(0, 2)}
			</div>
			<span>{name}</span>
			<p>{text}</p>
		</div>
	);
};

export default ChatUser;
