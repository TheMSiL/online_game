import  { useEffect, useRef } from 'react';
import { getXBackgroundColor } from '../../helpers';

const GameTopItem = ({ item, index }) => {
	const elementRef = useRef(null);

	useEffect(() => {
		if (elementRef.current) {
			elementRef.current.classList.add('bets_item-x--animation');
			setTimeout(() => {
				elementRef.current.classList.remove('bets_item-x--animation');
			}, 5000); 
		}
	}, [item, index]); 

	return (
		<div ref={elementRef} className='bets_item-x'>
			<span style={{ backgroundColor: getXBackgroundColor(item) }}>
				{item}x
			</span>
		</div>
	);
};

export default GameTopItem;
