import { useEffect, useState } from 'react';
import { user } from '../../context/AppContext';
import axios from 'axios';

import bets_history from '../../assets/header/bets_history.svg';


const HeaderBetsHistory = ({ setOnOverlay }) => {
		const [myBets, setMyBest] = useState([]);

		useEffect(() => {
			if (user) {
				axios
					.post('https://jet-tests.top/user.php', {
						login: user.login,
					})
					.then(res => {
						setMyBest(res.data.history);
					})
					.catch(error => {
						console.error(error);
					});
			}
		}, []);
	
	return (
		<div className='overlay_content header_betshistory-content'>
			<div className='header_limits-content-top'>
				<div className='header_limits-content-top--info'>
					<img src={bets_history} />
					<h2>МОЯ ИСТОРИЯ СТАВОК</h2>
				</div>
				<div onClick={() => setOnOverlay(false)}>
					<span className='header_modal-close'>
						<div className='close_bg hgmBJG'>
							<div className='x'></div>
						</div>
					</span>
				</div>
			</div>
			<div className='header_limits-content-bottom'>
				{myBets.length ? (
					myBets.map(value => (
						<div className='header_mybets limits limits_grid' key={value.result}>
							<p>
								<span>Ставка:</span> {value.amount}{' '}
								{value.currency === 'USD' ? '$' : ''}
							</p>
							<p>
								{' '}
								<span>Выигрыш:</span> {value.crash}
							</p>
							<p className='koef'>
								{' '}
								<span>Коэфф:</span> {value.result}{' '}
								{value.currency === 'USD' ? '$' : ''}
							</p>
						</div>
					))
				) : (
					<div className='header_mybets limits'>Вы ещё не делали ставок</div>
				)}
			</div>
		</div>
	);
};

export default HeaderBetsHistory;
