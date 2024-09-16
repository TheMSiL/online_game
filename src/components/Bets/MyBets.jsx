import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { user, AppContext } from '../../context/AppContext';

const MyBets = ({ activeTab }) => {
	const { endGame } = useContext(AppContext);
	const [myBets, setMyBest] = useState([]);

	useEffect(() => {
		if (user) {
			axios
				.post('https://jet-tests.top/user.php', {
					login: user.login,
				})
				.then(res => {
					setMyBest(res.data.history);
					localStorage.setItem(
						'userLuckyJet',
						JSON.stringify(res.data.user_data)
					);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [endGame]);

	return (
		<div className={activeTab === 'my' ? 'fullOpac bets_items' : 'zeroOpac'}>
			{myBets.length ? (
				myBets.map((value, index) => (
					<div key={index} className='mybet'>
						<div className='top_bet-fields'>
							<p>
								<span>Ставка:</span> {value.amount}{' '}
							</p>
							<p>
								<span>Коэфф:</span> {value.crash}{' '}
							</p>
							<p className='koef'>
								{' '}
								<span>Выигрыш:</span> {value.result}
							</p>
						</div>
					</div>
				))
			) : (
				<div className='top_bet-fields'>
					<p className='zeroMyBets'>
						<span>Вы ещё не делали ставок</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default MyBets;
