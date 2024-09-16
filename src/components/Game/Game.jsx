import { useContext } from 'react';
import { AppContext} from '../../context/AppContext';
import FullHistory from './FullHistory';
import GameBetsBoards from './GameBetsBoards';
import Jet from './Jet';
import WinModal1 from './WinModal1';
import WinModal2 from './WinModal2';
import GameTopItem from './GameTopItem';


const Game = () => {
	const { history } = useContext(AppContext);


	return (
		<section className='game'>
			<div className='game_top'>
				<div className='game_history'>
					{history.map((item, index) => (
						<GameTopItem key={index} index={index} item={item} />
					))}
					<div className='sc-jNJNQp lfYmQl'></div>
				</div>
				<FullHistory history={history} />
			</div>
			<WinModal1 />
			<WinModal2 />
			<Jet />
			<GameBetsBoards />
		</section>
	);
};

export default Game;
