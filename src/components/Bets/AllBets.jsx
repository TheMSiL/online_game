import axios from 'axios';
import { gsap } from 'gsap';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getXBackgroundColor, randomInt } from '../../helpers';

const AllBets = ({ activeTab }) => {
	const { gameLoader, gameX, gameValue } = useContext(AppContext);
	const [counter, setCounter] = useState(0);
	const [isCounterAnimating, setIsCounterAnimating] = useState(false);
	const [isRemovingBets, setIsRemovingBets] = useState(false);
	const [bets, setBets] = useState([]);

	useEffect(() => {
		axios
			.post('https://jet-tests.top/bets.php', {
				gameX: gameX,
			})
			.then(response => {
				setBets(response.data);
			})
			.catch(error => {
				console.error('Ошибка при получении сообщений:', error);
			});
	}, [gameX]);

	useEffect(() => {
		if (gameLoader === false) {
			setIsCounterAnimating(true);
			const targetValue = randomInt(100, 150);
			gsap.to(
				{ value: 0 },
				{
					value: targetValue,
					duration: 3,
					ease: 'linear',
					onUpdate: function () {
						setCounter(Math.round(this.targets()[0].value));
					},
					onComplete: function () {
						setIsCounterAnimating(false);
					},
				}
			);
		}
	}, [gameLoader]);

	useEffect(() => {
		if (gameLoader === false) {
			setIsRemovingBets(false);
		} else {
			setIsRemovingBets(true);
		}
	}, [gameLoader]);

	return (
		<div className={activeTab === 'all' ? 'fullOpac' : 'zeroOpac'}>
			<div
				className='bets_info'
				style={!isRemovingBets ? { opacity: 1 } : { opacity: 0 }}
			>
				<div className='bets_round'>Всего ставок:</div>
				<span id='bets_quantity'>{counter}</span>
			</div>
			{isRemovingBets ? (
				<div></div>
			) : (
				<div className='bets_items'>
					{bets.map((player, index) => (
						<div
							key={index}
							className={
								parseFloat(player.x) <= gameValue
									? 'bets_item-win'
									: 'bets_item'
							}
						>
							<div
								className='bets_item-avatar'
								style={{ backgroundColor: player.color }}
							>
								{player.name.slice(0, 2)}
							</div>
							<div className='bets_item-name'>{player.name}</div>
							<div className='bets_item-price'>{`${player.amount} $`}</div>
							{parseFloat(player.x) <= gameValue ? (
								<>
									<div className='bets_item-x'>
										<span
											style={{ backgroundColor: getXBackgroundColor(player.x) }}
										>
											{`${player.x}x`}
										</span>
									</div>
									<div className='bets_item-total'>{player.result}</div>
								</>
							) : (
								<>
									<div className='bets_item-x'>-</div>
									<div className='bets_item-total'>-</div>
								</>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AllBets;
