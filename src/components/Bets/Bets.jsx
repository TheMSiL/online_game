import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import AllBets from './AllBets';
import MyBets from './MyBets';
import TopBets from './TopBets';

const Bets = () => {
	const [activeTab, setActiveTab] = useState('all');
	const [showBets, setShowBets] = useState(true);
	const windowWidth = window.innerWidth;

	const { showChat } = useContext(AppContext);
	const handleTabClick = tab => {
		setActiveTab(tab);
	};

	useEffect(() => {
		if (windowWidth < 1500 && windowWidth > 1055) {
			setShowBets(!showChat);
		} else {
			setShowBets(true);
		}
	}, [windowWidth, showChat]);

	useEffect(() => {
		if (windowWidth >= 1500 && !showChat) {
			setShowBets(true);
		}
	}, [showChat, windowWidth]);

	return (
		<section className='bets' style={{ display: !showBets ? 'none' : 'block' }}>
			<div className='bets_nav'>
				<div
					className='active_bets'
					style={{
						transform:
							activeTab === 'all'
								? 'translateX(-102%)'
								: activeTab === 'my'
								? 'translateX(0px)'
								: 'translateX(102%)',
					}}
				></div>
				<div
					onClick={() => handleTabClick('all')}
					className={activeTab === 'all' ? 'active_tab' : ''}
				>
					Все
				</div>
				<div
					onClick={() => handleTabClick('my')}
					className={activeTab === 'my' ? 'active_tab' : ''}
				>
					Мои
				</div>
				<div
					onClick={() => handleTabClick('top')}
					className={activeTab === 'top' ? 'active_tab' : ''}
				>
					Топ
				</div>
			</div>
			<AllBets activeTab={activeTab} />
			<MyBets activeTab={activeTab} />
			<TopBets activeTab={activeTab} />
		</section>
	);
};

export default Bets;
