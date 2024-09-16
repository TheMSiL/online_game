import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ChatSwitcher = () => {
	const { showChat, setShowChat } = useContext(AppContext);
	return (
		<div>
			<div
				className={!showChat ? 'chat_switcher header_info' : 'none'}
				onClick={() => {
					setShowChat(!showChat);
				}}
			>
				<div className='chat_switcher-content'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M9.81002 3.22656C10.7869 3.22656 11.7196 3.39046 12.5732 3.6882C12.2149 4.2473 12.0077 4.91144 12.0077 5.62399C12.0077 7.61008 13.6177 9.22012 15.6038 9.22012C16.1581 9.22012 16.6831 9.09472 17.152 8.87074C17.185 9.11561 17.2021 9.36592 17.2021 9.61969C17.2021 13.1505 13.8925 16.0128 9.81002 16.0128C9.1117 16.0128 8.436 15.9291 7.7956 15.7726C6.95692 16.5193 5.55687 17.1386 3.59678 17.6299C3.51221 17.6511 3.42275 17.6393 3.34663 17.5968C3.18151 17.5046 3.12238 17.296 3.21455 17.1309L3.35704 16.8718C3.9865 15.7105 4.36351 14.7713 4.48805 14.0543C3.20589 12.9061 2.41797 11.3425 2.41797 9.61969C2.41797 6.08886 5.7275 3.22656 9.81002 3.22656Z'></path>
						<path
							opacity='0.4'
							d='M18.0014 5.62399C18.0014 4.29993 16.928 3.22656 15.604 3.22656C14.2799 3.22656 13.2065 4.29993 13.2065 5.62399C13.2065 6.94805 14.2799 8.02141 15.604 8.02141C16.928 8.02141 18.0014 6.94805 18.0014 5.62399Z'
						></path>
					</svg>
				</div>
			</div>
			<div className={showChat ? 'chat_header' : 'none'}>
				<div className='chat_header-info'>
					<div>
						<svg width='20' height='20'>
							<path
								opacity='0.15'
								fillRule='evenodd'
								clipRule='evenodd'
								d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z'
							></path>
							<path d='M15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10Z'></path>
						</svg>
					</div>
					<div className='chat_header-info-players'>
						<span>250</span>
						Игроков онлайн
					</div>
				</div>
				<div
					className={showChat ? 'chat_switcher header_info' : 'none'}
					onClick={() => {
						setShowChat(!showChat);
					}}
				>
					<div className='chat_switcher-content mob_svg-chat'>
						<svg
							width='12'
							height='20'
							viewBox='0 0 12 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M3.21967 6.03033C2.92678 5.73744 2.92678 5.26256 3.21967 4.96967C3.51256 4.67678 3.98744 4.67678 4.28033 4.96967L8.78033 9.46967C9.07322 9.76256 9.07322 10.2374 8.78033 10.5303L4.28033 15.0303C3.98744 15.3232 3.51256 15.3232 3.21967 15.0303C2.92678 14.7374 2.92678 14.2626 3.21967 13.9697L7.18934 10L3.21967 6.03033Z'></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatSwitcher;
