import { useContext } from 'react';
import Authorize from './components/Authorize';
import Bets from './components/Bets/Bets';
import Chat from './components/Chat/Chat';
import Game from './components/Game/Game';
import Ban from './components/Header/Ban';
import Header from './components/Header/Header';
import Payment from './components/Payment';
import { AppContext, user } from './context/AppContext';

const isBanned = user?.ban_status;

function App() {
	const { showPayment, isCashOut, setShowPayment } = useContext(AppContext);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Bets />
				<Game />
				<Chat />
				<Authorize />
				{isBanned && <Ban />}
				{showPayment && (
					<Payment isCashOut={isCashOut} setShowPayment={setShowPayment} />
				)}
			</div>
		</div>
	);
}

export default App;
