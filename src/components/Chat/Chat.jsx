import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, user } from '../../context/AppContext';
import ChatUser from './ChatUser';

const emojis = [
	'😀',
	'😃',
	'😄',
	'😁',
	'😆',
	'😅',
	'😂',
	'🤣',
	'😊',
	'😇',
	'🙂',
	'🙃',
	'😉',
	'😌',
	'😍',
	'🥰',
	'😘',
	'😗',
	'😙',
	'😚',
	'😋',
	'😛',
	'😝',
	'😜',
	'🤪',
	'🤨',
	'🧐',
	'🤓',
	'😎',
	'🤩',
	'😏',
	'😒',
	'😞',
	'😔',
	'😟',
	'😕',
	'🙁',
	'☹️',
	'😣',
	'😖',
	'😫',
	'😩',
	'😢',
	'😭',
	'😤',
	'😠',
	'😡',
	'🤬',
	'🤯',
	'😳',
	'🥺',
	'😨',
	'😰',
	'😥',
	'😓',
	'🤗',
	'🤔',
	'🤭',
	'🤫',
	'🤥',
	'😶',
	'😐',
	'😑',
	'😬',
	'🙄',
	'😯',
	'😦',
	'😧',
	'😮',
	'😲',
	'🥱',
	'😴',
	'🤤',
	'😪',
	'😵',
	'🤐',
	'🥴',
	'🤢',
	'🤮',
	'🤧',
	'😷',
	'🤒',
	'🤕',
	'🤑',
	'🤠',
	'😈',
	'👿',
	'👹',
	'👺',
	'💀',
	'👻',
	'👽',
	'🤖',
	'💩',
	'😺',
	'😸',
	'😹',
	'😻',
	'😼',
	'😽',
	'🙀',
	'😿',
	'😾',
	'🥰',
	'🥵',
	'🥶',
	'🥳',
	'🥴',
	'😹',
	'😸',
	'👏',
	'👍',
	'🙌',
	'👌',
	'👋',
	'✌️',
	'🤞',
	'🤟',
	'🤘',
	'🤙',
	'👊',
	'✊',
	'🤛',
	'🤜',
	'👈',
	'👉',
	'👆',
	'👇',
	'☝️',
	'✋',
	'🤚',
	'🖐️',
	'🖖',
	'👋',
	'🤚',
	'🖐️',
	'🖖',
	'👌',
	'✌️',
	'🤟',
	'👍',
	'👎',
	'✊',
	'👊',
	'🤛',
	'🤜',
	'👏',
	'🙌',
	'👐',
	'🤲',
	'🤝',
	'🙏',
	'✍️',
	'💅',
	'🤳',
	'💪',
	'🦵',
	'🦶',
	'👂',
	'👃',
	'🧠',
	'👀',
];
const Chat = () => {
	const { showChat, isAuthorize, setShowAuthorize } = useContext(AppContext);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [inputText, setInputText] = useState('');
	const [isWideWindow, setIsWideWindow] = useState(window.innerWidth > 1055);
	const [messages, setMessages] = useState([]);
	const [isSendingBlocked, setIsSendingBlocked] = useState(false);
	const [archivedMessages, setArchivedMessages] = useState([]);
	const chatFieldRef = useRef(null);

	useEffect(() => {
		axios
			.post('https://jet-tests.top/chat.php')
			.then(response => {
				setMessages(response.data);
				setArchivedMessages(response.data.slice(0, 5));
			})
			.catch(error => {
				console.error('Ошибка при получении сообщений:', error);
			});
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsWideWindow(window.innerWidth > 1055);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const chatFormSubmit = event => {
		if (isSendingBlocked === false) {
			event.preventDefault();
			if (inputText.trim() !== '') {
				const newMessage = {
					name: user.login,
					color: user.color,
					message: inputText,
				};
				setArchivedMessages(prevMessages => [...prevMessages, newMessage]);
				setIsSendingBlocked(true);
				setTimeout(() => {
					setIsSendingBlocked(false);
				}, [60000]);
			}
		}
		setInputText('');
	};

	const toggleEmojiPicker = () => {
		setShowEmojiPicker(prevState => !prevState);
	};

	const insertEmoji = emoji => {
		setInputText(prevText => prevText + emoji);
	};
	useEffect(() => {
		if (!showChat) {
			document.body.classList.remove('chat-open');
		} else {
			document.body.classList.add('chat-open');
		}
	}, [showChat]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setArchivedMessages(prevArchivedMessages => {
				if (messages.length > prevArchivedMessages.length) {
					const newArchivedMessage = messages[prevArchivedMessages.length];
					return [...prevArchivedMessages, newArchivedMessage];
				}
				return prevArchivedMessages;
			});
		}, 10000);

		return () => clearInterval(intervalId);
	}, [messages]);

	return (
		<section
			className={'chat'}
			style={{
				position: isWideWindow && showChat ? 'static' : 'absolute',
				width: isWideWindow ? '291px' : '100%',
				top: showChat ? '0' : '',
			}}
		>
			<div className='chat_field' ref={chatFieldRef}>
				{archivedMessages.map(({ name, color, message }, index) => (
					<ChatUser key={index} name={name} text={message} color={color} />
				))}
			</div>
			<div className='chat_form-container'>
				<form onSubmit={chatFormSubmit}>
					{!isAuthorize && (
						<span
							className='game_board-noAUTH'
							onClick={() => setShowAuthorize(true)}
						></span>
					)}
					<input
						type='text'
						placeholder='Введите собщение'
						maxLength={160}
						className='chat_input'
						value={inputText}
						onChange={e => setInputText(e.target.value)}
					/>
					<div className='chat_btn-container'>
						<button
							type='submit'
							className='chat_btn'
							disabled={isSendingBlocked}
						>
							<div className='chat_btn-svg'>
								<svg width='13' height='14' fill='#FFF'>
									<path d='M7.01014 7.1313L2.30313 7.9681C2.19288 7.9877 2.10084 8.06861 2.06175 8.18029L0.438061 12.8186C0.28264 13.2449 0.70103 13.6515 1.08457 13.447L12.3346 7.44699C12.6801 7.26273 12.6801 6.73682 12.3346 6.55256L1.08457 0.552563C0.70103 0.348009 0.28264 0.754703 0.438061 1.181L2.06175 5.81926C2.10084 5.93095 2.19288 6.01186 2.30313 6.03145L7.01014 6.86826C7.07824 6.88036 7.12424 6.94906 7.11289 7.0217C7.10411 7.07789 7.06282 7.12193 7.01014 7.1313Z'></path>
								</svg>
							</div>
						</button>
					</div>
				</form>
				<div className='chat_bottom'>
					<div
						style={{
							width: '25px',
							display: 'grid',
							gridAutoColumns: '1fr',
							gridTemplateRows: '1fr',
						}}
						onClick={toggleEmojiPicker}
					>
						<button className='emoji_btn'>
							<div className='emoji_btn-content'>
								<svg
									width='10'
									height='10'
									viewBox='0 0 10 10'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M1.22827 5.84969C1.6366 5.50902 2.23121 5.57541 2.56134 5.99664C2.56325 5.99897 2.56832 6.00507 2.57655 6.01445C2.59445 6.03487 2.62694 6.07047 2.67391 6.11639C2.76823 6.20861 2.91818 6.33978 3.12282 6.47316C3.52831 6.73747 4.14982 7.01227 5.00019 7.01227C5.85055 7.01227 6.47206 6.73747 6.87756 6.47316C7.08219 6.33978 7.23214 6.20861 7.32646 6.11639C7.37343 6.07047 7.40592 6.03487 7.42382 6.01445L7.43645 5.99976L7.43904 5.99664C7.76916 5.57541 8.36378 5.50902 8.7721 5.84969C9.18309 6.19258 9.24972 6.81802 8.92093 7.24663L8.17678 6.62577C8.92093 7.24663 8.92093 7.24663 8.92093 7.24663L8.91975 7.24818L8.91845 7.24985L8.91556 7.25358L8.90849 7.26257L8.88929 7.28641C8.87424 7.30481 8.85464 7.32815 8.83047 7.35571C8.78219 7.41078 8.71542 7.48302 8.63003 7.56651C8.45963 7.73311 8.21251 7.94704 7.88771 8.15875C7.23434 8.58462 6.26755 9 5.00019 9C3.73282 9 2.76603 8.58462 2.11266 8.15875C1.78786 7.94704 1.54075 7.73311 1.37035 7.56651C1.28496 7.48302 1.21818 7.41078 1.1699 7.35571C1.14574 7.32815 1.12614 7.30481 1.11108 7.28641L1.09188 7.26257L1.08482 7.25358L1.08192 7.24985L1.08063 7.24818C1.08063 7.24818 1.07944 7.24663 1.82359 6.62577L1.07944 7.24663C0.750653 6.81802 0.817287 6.19258 1.22827 5.84969Z'
										fill='#DFE5F2'
										fillOpacity='0.6'
									></path>
									<path
										d='M3.14716 1.38037C3.14716 2.14272 2.55458 2.76073 1.82358 2.76073C1.09259 2.76073 0.5 2.14272 0.5 1.38037C0.5 0.618011 1.09259 0 1.82358 0C2.55458 0 3.14716 0.618011 3.14716 1.38037Z'
										fill='#DFE5F2'
										fillOpacity='0.6'
									></path>
									<path
										d='M8.17642 2.76073C8.90741 2.76073 9.5 2.14272 9.5 1.38037C9.5 0.618011 8.90741 0 8.17642 0C7.44542 0 6.85284 0.618011 6.85284 1.38037C6.85284 2.14272 7.44542 2.76073 8.17642 2.76073Z'
										fill='#DFE5F2'
										fillOpacity='0.6'
									></path>
								</svg>
							</div>
						</button>
					</div>
					<p className='chat_maxlength'>Макс. 160 символов</p>
					{showEmojiPicker && (
						<div className='emoji_container'>
							<div className='sc-gGfaQS iYZfUs'>
								<div className='sc-iuuDEZ bcxeDU'>Эмоджи</div>
								<svg
									onClick={toggleEmojiPicker}
									viewBox='0 0 20 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='sc-dcntqk hcEAVw'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M6.46455 5.05025C6.07402 4.65973 5.44086 4.65973 5.05033 5.05025C4.65981 5.44078 4.65981 6.07394 5.05033 6.46446L8.58589 10L5.05035 13.5356C4.65983 13.9261 4.65983 14.5592 5.05035 14.9498C5.44088 15.3403 6.07404 15.3403 6.46457 14.9498L10.0001 11.4142L13.5356 14.9497C13.9261 15.3403 14.5593 15.3403 14.9498 14.9497C15.3404 14.5592 15.3404 13.9261 14.9498 13.5355L11.4143 10L14.9499 6.46449C15.3404 6.07396 15.3404 5.4408 14.9499 5.05027C14.5593 4.65975 13.9262 4.65975 13.5356 5.05027L10.0001 8.58581L6.46455 5.05025Z'
										fill='#DFE5F2'
									></path>
								</svg>
							</div>
							<div className='emojiies'>
								{emojis.map((item, index) => (
									<div onClick={() => insertEmoji(item)} key={index}>
										{item}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Chat;
