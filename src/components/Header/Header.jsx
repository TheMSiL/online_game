import { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import img2 from '../../assets/cashout.svg';
import img1 from '../../assets/escape.svg';
import logo from '../../assets/logo.svg';
import { AppContext, user } from '../../context/AppContext';
import BackgroundMusic from '../BackgroundMusic';
import ChatSwitcher from './ChatSwitcher';
import HeaderMenu from './HeaderMenu';
import HeaderRules from './HeaderRules';
import Messages from './Messages';

const Header = () => {
	const {
		hideSounds,
		setHideSounds,
		balance,
		showAuthorize,
		setShowAuthorize,
		isAuthorize,
		setIsAuthorize,
		setShowPayment,
		setIsCashOut,
	} = useContext(AppContext);
	const isBanned = user?.ban_status;
	const [onOverlay, setOnOverlay] = useState(false);
	const [showWalletModal, setShowWalletModal] = useState(false);
	const [overlayContent, setOverlayContent] = useState(null);
	const overlayRef = useRef(null);
	const walletRef = useRef(null);
	const walletContRef = useRef(null);
	const overlayContainerRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 480);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const setRulesOverlay = () => {
		setOnOverlay(true);
		setOverlayContent(<HeaderRules setOnOverlay={setOnOverlay} />);
	};

	useEffect(() => {
		const handleClickOutsideMenu = event => {
			if (
				walletRef.current &&
				!walletRef.current.contains(event.target) &&
				walletContRef.current &&
				!walletContRef.current.contains(event.target)
			) {
				setShowWalletModal(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = event => {
			if (overlayRef.current && !overlayRef.current.contains(event.target)) {
				setOnOverlay(false);
			}
		};

		overlayContainerRef.current.addEventListener('click', handleClickOutside);
	}, [overlayRef]);

	return (
		<header className='header'>
			<div className='logo'>
				<img src={logo} alt='logo' />
			</div>
			<div className='header_right'>
				<div className='header_audio header_info'>
					<div
						className='header_voices header_rules'
						onClick={() => setHideSounds(!hideSounds)}
						style={hideSounds ? { opacity: '1' } : { opacity: '0.5' }}
					>
						<div className='header_voices-content'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M10.8636 6.46858C10.8316 6.15909 10.7982 5.83798 10.7161 5.51756C10.4926 4.75101 9.87335 4.27277 9.2094 4.27277C8.83905 4.27141 8.37062 4.49959 8.10503 4.73052L5.90365 6.57447H4.75124C3.90311 6.57447 3.22114 7.2283 3.09236 8.1718C2.98292 9.07772 2.95623 10.7878 3.09236 11.7846C3.21047 12.7813 3.86174 13.4256 4.75124 13.4256H5.90365L8.14774 15.2969C8.37796 15.4971 8.78433 15.7266 9.15802 15.7266C9.18204 15.7273 9.20339 15.7273 9.22475 15.7273C9.90138 15.7273 10.4973 15.2313 10.7208 14.4668C10.8056 14.1416 10.8349 13.8369 10.8636 13.5424L10.8936 13.2507C11.0084 12.3045 11.0084 7.68946 10.8936 6.75006L10.8636 6.46858Z'
									fill='#948AC5'
								></path>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M14.6391 4.41308C14.9047 4.22452 15.2697 4.29352 15.4519 4.56339C16.4502 6.03295 17 7.96436 17 9.99961C17 12.0362 16.4502 13.967 15.4519 15.4365C15.3431 15.5971 15.1636 15.6934 14.9721 15.6934C14.8533 15.6934 14.7386 15.6565 14.6398 15.5868C14.3756 15.3976 14.3102 15.0252 14.493 14.7547C15.3565 13.4826 15.8322 11.7937 15.8322 9.99961C15.8322 8.20621 15.3565 6.51734 14.493 5.24522C14.3102 4.97536 14.3756 4.60233 14.6391 4.41308ZM12.6271 6.34626C12.8933 6.15838 13.257 6.22601 13.4405 6.49656C14.0851 7.44621 14.4408 8.69032 14.4408 10C14.4408 11.3097 14.0851 12.5538 13.4405 13.5035C13.3311 13.664 13.1522 13.7603 12.9607 13.7603C12.8419 13.7603 12.7265 13.7235 12.6277 13.6538C12.3635 13.4645 12.2981 13.0915 12.4816 12.8216C12.9921 12.0694 13.273 11.0672 13.273 10C13.273 8.93217 12.9921 7.9306 12.4816 7.1784C12.2981 6.90853 12.3635 6.5355 12.6271 6.34626Z'
									fill='#948AC5'
								></path>
							</svg>
						</div>
					</div>
					<BackgroundMusic />
					<Messages />
				</div>
				<div className='header_info'>
					<div className='header_rules' onClick={() => setRulesOverlay()}>
						<div className='header_rules-content'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 20 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M3 10C3 13.864 6.136 17 10 17C13.864 17 17 13.864 17 10C17 6.136 13.864 3 10 3C6.136 3 3 6.136 3 10ZM9.125 14.375V14.025C9.125 13.6384 9.4384 13.325 9.825 13.325H10.175C10.5616 13.325 10.875 13.6384 10.875 14.025V14.375C10.875 14.7616 10.5616 15.075 10.175 15.075H9.825C9.4384 15.075 9.125 14.7616 9.125 14.375ZM11.519 10.119C11.1443 10.4989 10.8741 10.8285 10.7601 11.404C10.7548 11.4305 10.7498 11.461 10.7451 11.4956C10.6973 11.842 10.4013 12.1 10.0516 12.1H10C9.62979 12.1 9.32968 11.7999 9.32968 11.4297C9.32968 11.4107 9.33048 11.3917 9.33212 11.3728C9.33793 11.3045 9.34425 11.2528 9.35105 11.2177C9.45933 10.6599 9.73403 10.1593 10.119 9.769L10.987 8.887C11.246 8.635 11.4 8.285 11.4 7.9C11.4 7.13 10.77 6.5 10 6.5C9.51072 6.5 9.07797 6.75437 8.82747 7.1374C8.78315 7.20516 8.74311 7.29596 8.70735 7.4098C8.6157 7.70152 8.34531 7.9 8.03953 7.9H7.9C7.56989 7.9 7.30228 7.63239 7.30228 7.30228C7.30228 7.25785 7.30724 7.21356 7.31707 7.17023C7.3594 6.98335 7.40744 6.8323 7.4612 6.71706C7.90685 5.7617 8.8758 5.1 10 5.1C11.547 5.1 12.8 6.353 12.8 7.9C12.8 8.516 12.548 9.076 12.149 9.475L11.519 10.119Z'></path>
							</svg>
							Как играть?
						</div>
					</div>
					{isAuthorize && (
						<div
							className='header_wallet'
							ref={walletContRef}
							onClick={() => {
								setShowWalletModal(!showWalletModal);
							}}
						>
							{!isAuthorize && (
								<span
									className='game_board-noAUTH'
									onClick={() => setShowAuthorize(true)}
								></span>
							)}
							<div className='header_waller-content'>
								<svg
									width='21'
									height='20'
									viewBox='0 0 21 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M17.4975 7.46273H14.5334C13.154 7.46516 12.0365 8.55469 12.0341 9.89962C12.0322 11.2476 13.1509 12.342 14.5334 12.3438H17.5V12.5579C17.5 14.9093 16.0746 16.2997 13.6623 16.2997H7.33898C4.92612 16.2997 3.50067 14.9093 3.50067 12.5579V7.43664C3.50067 5.08529 4.92612 3.70032 7.33898 3.70032H13.6598C16.0721 3.70032 17.4975 5.08529 17.4975 7.43664V7.46273ZM6.81758 7.45771H10.7654H10.7679H10.7729C11.0684 7.4565 11.3073 7.22172 11.3061 6.93296C11.3048 6.64481 11.0634 6.41185 10.7679 6.41307H6.81758C6.52391 6.41428 6.28561 6.64663 6.28436 6.93357C6.28312 7.22172 6.52204 7.4565 6.81758 7.45771Z'
									></path>
									<path
										opacity='0.4'
										d='M13.3267 10.2076C13.473 10.8734 14.0568 11.3418 14.7232 11.3297H16.9981C17.2754 11.3297 17.5003 11.1 17.5003 10.8162V9.04415C17.4997 8.7609 17.2754 8.53064 16.9981 8.53003H14.6697C13.9116 8.53247 13.2993 9.16171 13.3005 9.93716C13.3005 10.0279 13.3094 10.1187 13.3267 10.2076Z'
									></path>
									<ellipse
										cx='14.7002'
										cy='9.9297'
										rx='0.699968'
										ry='0.699967'
									></ellipse>
								</svg>
								{user?.currency && (
									<div>
										<span>{balance}</span>
										{user.currency}
									</div>
								)}
							</div>
							{showWalletModal && user && !isBanned && (
								<div className='wallet_modal' ref={walletRef}>
									<div
										onClick={() => {
											setShowPayment(true);
											setIsCashOut(false);
										}}
									>
										{' '}
										<img src={img1} /> <span>Пополнить</span>
									</div>
									<div
										onClick={() => {
											setShowPayment(true);
											setIsCashOut(true);
										}}
									>
										{' '}
										<img src={img2} /> <span>Вывести</span>
									</div>
								</div>
							)}
						</div>
					)}

					<HeaderMenu
						setOnOverlay={setOnOverlay}
						setOverlayContent={setOverlayContent}
						setIsAuthorize={setIsAuthorize}
						isAuthorize={isAuthorize}
					/>

					{!isAuthorize ? (
						<div
							className='header_auth'
							onClick={() => setShowAuthorize(!showAuthorize)}
							style={isMobile ? { display: 'none' } : { display: 'flex' }}
						>
							<div className='header_voices-content'>
								<FaUser style={{ width: '18px', height: '18px' }} />
							</div>
						</div>
					) : (
						<div
							className='header_auth'
							onClick={() => {
								localStorage.removeItem('userLuckyJet');
								setIsAuthorize(!isAuthorize);
								window.location.reload();
							}}
							style={isMobile ? { display: 'none' } : { display: 'flex' }}
						>
							<div className='header_voices-content exit'>
								<IoIosExit
									style={{ width: '18px', height: '18px', stroke: 'red' }}
								/>
							</div>
						</div>
					)}
				</div>
				<ChatSwitcher />
			</div>
			<div
				ref={overlayContainerRef}
				className={onOverlay ? 'overlay grid' : 'overlay'}
			>
				<div ref={overlayRef}>{overlayContent}</div>
			</div>
		</header>
	);
};

export default Header;
