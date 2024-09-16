import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { IoIosNotifications } from 'react-icons/io';

const MenuItem = ({ icon, title, className, href, handleMenuItemClick }) => {
	const {
		showAnimation,
		setShowAnimation,
		hideSounds,
		setHideSounds,
		isPlayingMusic,
		setIsPlayingMusic,
		showMessage,
		setShowMessage,
	} = useContext(AppContext);

	return (
		<div
			className={`${className} header_menu-item`}
			onClick={
				icon
					? () => handleMenuItemClick(title)
					: () => setShowMessage(!showMessage)
			}
		>
			{icon ? (
				<img src={icon} alt='' />
			) : (
				<IoIosNotifications style={{ width: '18px', height: '18px' }} />
			)}
			{href ? (
				<p>
					<a href={href}>{title}</a>
				</p>
			) : (
				<p>{title}</p>
			)}

			{title === 'Анимация' && (
				<div
					className='animation_switcher'
					onClick={() => setShowAnimation(!showAnimation)}
				>
					<span
						style={{
							left: !showAnimation ? '2px' : 'calc(100% - 17px)',
							backgroundColor: !showAnimation
								? 'rgb(148, 138, 197)'
								: 'rgb(148, 78, 245)',
						}}
					></span>
				</div>
			)}
			{title === 'Музыка' && (
				<div
					className='animation_switcher'
					onClick={() => setIsPlayingMusic(!isPlayingMusic)}
				>
					<span
						style={{
							left: !isPlayingMusic ? '2px' : 'calc(100% - 17px)',
							backgroundColor: !isPlayingMusic
								? 'rgb(148, 138, 197)'
								: 'rgb(148, 78, 245)',
						}}
					></span>
				</div>
			)}
			{title === 'Звуки' && (
				<div
					className='animation_switcher'
					onClick={() => setHideSounds(!hideSounds)}
				>
					<span
						style={{
							left: !hideSounds ? '2px' : 'calc(100% - 17px)',
							backgroundColor: !hideSounds
								? 'rgb(148, 138, 197)'
								: 'rgb(148, 78, 245)',
						}}
					></span>
				</div>
			)}
		</div>
	);
};

export default MenuItem;
