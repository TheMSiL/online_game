import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaTrash } from 'react-icons/fa6';
import { IoIosNotifications } from 'react-icons/io';
import { AppContext, user } from '../../context/AppContext';

const Messages = () => {
	const { isAuthorize, showMessage, setShowMessage } = useContext(AppContext);
	const [messageRes, setMessageRes] = useState([]);
	const [expandedMessages, setExpandedMessages] = useState([]);
	const messageRef = useRef(null);

	const deleteMessage = id => {
		axios
			.post('https://jet-tests.top/drop_message.php', { id })
			.then(response => {
				if (response.data.success) {
					setMessageRes(messageRes.filter(message => message.id !== id));
				}
			})
			.catch(error => {
				console.error(error);
			});
	};

	const fetchMessages = () => {
		if (isAuthorize && user) {
			axios
				.post('https://jet-tests.top/get_messages.php', {
					login: user.login,
				})
				.then(res => {
					setMessageRes(res.data.messages);
				})
				.catch(error => {
					console.error(error);
				});
		}
	};

	const markAsChecked = id => {
		axios
			.post('https://jet-tests.top/update_message.php', { id })
			.then(response => {
				if (response.data.success) {
					setMessageRes(
						messageRes.map(message =>
							message.id === id ? { ...message, checked: true } : message
						)
					);
				}
			})
			.catch(error => {
				console.error(error);
			});
	};

	useEffect(() => {
		const handleClickOutsideMenu = event => {
			if (messageRef.current && !messageRef.current.contains(event.target)) {
				setShowMessage(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, [setShowMessage]);

	useEffect(() => {
		fetchMessages();

		const intervalId = setInterval(() => {
			fetchMessages();
		}, 15000);

		return () => clearInterval(intervalId);
	}, [isAuthorize, user]);

	const toggleFullText = index => {
		setExpandedMessages(prevState =>
			prevState.includes(index)
				? prevState.filter(i => i !== index)
				: [...prevState, index]
		);
	};

	return (
		<>
			{isAuthorize && (
				<>
					{showMessage && (
						<div className='overlay flex'>
							<div
								className='message_cont'
								ref={messageRef}
								style={
									expandedMessages.includes()
										? { alignItems: 'start' }
										: { alignItems: 'center' }
								}
							>
								<h3>Сообщения</h3>
								<div className='messages'>
									{messageRes.length ? (
										messageRes.map((message, index) => (
											<div key={message.id} className='message' id={message.id}>
												<div
													className='message_top'
													onClick={() => {
														toggleFullText(index);
														markAsChecked(message.id);
													}}
												>
													{!message.checked && (
														<span className='message_circle'></span>
													)}
													<h5
														style={
															message.checked
																? { paddingLeft: '0px' }
																: { paddingLeft: '10px' }
														}
													>
														{message.theme}
													</h5>
													<p className='messages_time '>{message.time}</p>
												</div>
												{expandedMessages.includes(index) && (
													<p className='message_text'>{message.message}</p>
												)}
												<div className='message_trash'>
													{expandedMessages.includes(index) ? (
														<FaTrash
															onClick={() => deleteMessage(message.id)}
														/>
													) : (
														<FaArrowDown
															onClick={() => toggleFullText(index)}
														/>
													)}
												</div>
											</div>
										))
									) : (
										<div className='zero_message'>У вас нет сообщений</div>
									)}
								</div>
								<span
									className='message_close'
									onClick={() => setShowMessage(!showMessage)}
								>
									x
								</span>
							</div>
						</div>
					)}
					<div
						className='header_voices header_rules header_kray'
						onClick={() => setShowMessage(!showMessage)}
						style={
							messageRes.some(message => !message.checked)
								? { opacity: '1' }
								: { opacity: '0.5' }
						}
					>
						<div className='header_voices-content'>
							{messageRes.some(message => !message.checked) && (
								<span className='newMessage'></span>
							)}
							<IoIosNotifications style={{ width: '20px', height: '20px' }} />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Messages;
