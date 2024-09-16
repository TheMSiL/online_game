import { useEffect, useRef, useState } from 'react';
import HeaderBetsHistory from './HeaderBetsHistory';
import HeaderLimits from './HeaderLimits';
import HeaderRules from './HeaderRules';
import MenuItem from './MenuItem';

import animation from '../../assets/header/animation.svg';
import music from '../../assets/music_mob.svg';
import sounds from '../../assets/sounds_mob.svg';
import support from '../../assets/header/support.svg';


import bets_history from '../../assets/header/bets_history.svg';
import limits from '../../assets/header/limits.svg';
import rules from '../../assets/header/rules.svg';

const HeaderMenu = ({
	setOnOverlay,
	setOverlayContent,
	setIsAuthorize,
	isAuthorize,
}) => {
	const [activeMenu, setActiveMenu] = useState(false);

	const menuRef = useRef(null);
	const switchRef = useRef(null);

	const user = JSON.parse(localStorage.getItem('userLuckyJet'));

	useEffect(() => {
		const handleClickOutsideMenu = event => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				switchRef.current &&
				!switchRef.current.contains(event.target)
			) {
				setActiveMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, []);

	const handleMenuItemClick = title => {
		switch (title) {
			case 'Правила игры':
				setOnOverlay(true);
				setOverlayContent(<HeaderRules setOnOverlay={setOnOverlay} />);
				setActiveMenu(!activeMenu);
				break;
			case 'Лимиты игры':
				setOnOverlay(true);
				setOverlayContent(<HeaderLimits setOnOverlay={setOnOverlay} />);
				setActiveMenu(!activeMenu);
				break;
			case 'История ставок':
				setOnOverlay(true);
				setOverlayContent(<HeaderBetsHistory setOnOverlay={setOnOverlay} />);
				setActiveMenu(!activeMenu);
				break;
			default:
				setOverlayContent(null);
				break;
		}
	};

	const menuItems = [
		{ icon: animation, title: 'Анимация', className: 'header_menu-animation' },
		{ icon: music, title: 'Музыка', className: 'header_menu-animation' },
		{ icon: sounds, title: 'Звуки', className: 'header_menu-animation' },
		{ icon: rules, title: 'Правила игры', className: 'header_menu-rules' },
		{
			icon: support,
			title: 'Поддержка',
			className: 'header_menu-rules',
			href: 'https://t.me/maksim4kkk',
		},
		{
			icon: bets_history,
			title: 'История ставок',
			className: 'header_menu-history',
		},
		{ icon: limits, title: 'Лимиты игры', className: 'header_menu-limits' },
	];

	if (isAuthorize) {
		menuItems.push({
			title: 'Уведомления',
			className: 'header_menu-limits header_menu-notification',
		});
	}

	return (
		<>
			<div
				className='header_user'
				id='user_header'
				onClick={() => setActiveMenu(!activeMenu)}
				ref={switchRef}
			>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						opacity='0.4'
						d='M12.8527 3.00098H15.2227C16.2043 3.00098 16.9996 3.80303 16.9996 4.79286V7.18292C16.9996 8.17275 16.2043 8.9748 15.2227 8.9748H12.8527C11.8711 8.9748 11.0758 8.17275 11.0758 7.18292V4.79286C11.0758 3.80303 11.8711 3.00098 12.8527 3.00098Z'
					></path>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M4.77687 3H7.14692C8.12846 3 8.9238 3.80205 8.9238 4.79188V7.18195C8.9238 8.17177 8.12846 8.97383 7.14692 8.97383H4.77687C3.79534 8.97383 3 8.17177 3 7.18195V4.79188C3 3.80205 3.79534 3 4.77687 3ZM4.77787 11.0262H7.14792C8.12946 11.0262 8.92479 11.8283 8.92479 12.8181V15.2082C8.92479 16.1973 8.12946 17.0001 7.14792 17.0001H4.77787C3.79633 17.0001 3.00099 16.1973 3.00099 15.2082V12.8181C3.00099 11.8283 3.79633 11.0262 4.77787 11.0262ZM15.2227 11.0262H12.8527C11.8711 11.0262 11.0758 11.8283 11.0758 12.8181V15.2082C11.0758 16.1973 11.8711 17.0001 12.8527 17.0001H15.2227C16.2043 17.0001 16.9996 16.1973 16.9996 15.2082V12.8181C16.9996 11.8283 16.2043 11.0262 15.2227 11.0262Z'
					></path>
				</svg>
			</div>
			<div
				className={activeMenu ? 'grid header_menu' : 'header_menu'}
				ref={menuRef}
			>
				<div className='header_menu_user'>
					<div
						className={'header_menu_user-avatar'}
						style={{ background: isAuthorize ? user.color : '#008000' }}
					>
						{user ? user.login.slice(0, 2) : 'DE'}
					</div>
					<p>{user ? user.login : 'DEMO'}</p>
				</div>
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						{...item}
						handleMenuItemClick={handleMenuItemClick}
					/>
				))}
				{isAuthorize && (
					<button
						onClick={() => {
							setIsAuthorize(!isAuthorize);
							setActiveMenu(false);
							localStorage.removeItem('userLuckyJet');
							window.location.reload();
						}}
						className='header-menu-top-logout'
					>
						Exit
					</button>
				)}
			</div>
		</>
	);
};

export default HeaderMenu;
