import axios from 'axios';
import { useEffect, useState } from 'react';
import { getRandomColor } from '../../helpers';

const TopBets = ({ activeTab }) => {
	const [topValues, setTopValues] = useState([]);

useEffect(() => {
	axios
		.get('https://jet-tests.top/top.php')
		.then(response => {
			if (response.data.topValues) {
				const valuesWithColors = response.data.topValues.map(value => ({
					...value,
					color: getRandomColor(),
				}));
				setTopValues(valuesWithColors);
			} else {
				console.log('Ошибка получения данных');
			}
		})
		.catch(error => {
			console.error('Произошла ошибка!', error);
			console.log('Ошибка при получении данных');
		});
}, []);

	return (
		<div className={activeTab === 'top' ? 'fullOpac bets_items' : 'zeroOpac'}>
			{topValues.map(value => (
				<div key={value.login} className='top_bet'>
					<div className='top_bet-left'>
						<div
							className='top_bet-avatar'
							style={{ backgroundColor: value.color }}
						>
							{value.login.slice(0, 2).toUpperCase()}
						</div>
						<p className='top_bet-login'>{value.login}</p>
					</div>
					<div className='top_bet-fields'>
						<p>
							<span>Ставка:</span> {value.amount}{' '}
						
						</p>
						<p>
							{' '}
							<span>Коэфф:</span> {value.crash}{' '}
						
						</p>
						<p className='koef'>
							{' '}
							<span>Выигрыш:</span> {value.result}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default TopBets;
