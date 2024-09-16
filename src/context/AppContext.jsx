import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';

const AppContext = createContext();

export const user = JSON.parse(localStorage.getItem('userLuckyJet'));

const AppContextProvider = ({ children }) => {
	const [showChat, setShowChat] = useState(false);
	const [loading, setLoading] = useState(true);
	const [hideSounds, setHideSounds] = useState(true);
	const [showAnimation, setShowAnimation] = useState(true);
	const [endGame, setEndGame] = useState(false);
	const [gameLoader, setGameLoader] = useState(false);
	const [gameValue, setGameValue] = useState(1.0);
	const [gameX, setGameX] = useState(user ? null : getRandomNumber());
	const [balance, setBalance] = useState(user ? user.balance : 0);
	const [winValue, setWinValue] = useState(0);
	const [form1Income, setForm1Income] = useState(0);
	const [form2Income, setForm2Income] = useState(0);
	const [showWinModal, setShowWinModal] = useState(false);
	const [showWinModal2, setShowWinModal2] = useState(false);
	const [isPlayingMusic, setIsPlayingMusic] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [showPayment, setShowPayment] = useState(false);
	const [isCashOut, setIsCashOut] = useState(true);
	const [history, setHistory] = useState([
		1.09, 1.85, 2.31, 4.46, 14.43, 1.83, 2.93, 24.77, 1.09, 1.85, 2.31, 4.46,
		14.43, 1.83, 2.93, 24.77, 14.43, 1.83, 2.93, 24.77, 1.09, 1.85, 2.31, 4.46,
		14.43, 1.83, 2.93, 24.77, 1.09, 1.85, 2.31, 4.46,
	]);
	const [showAuthorize, setShowAuthorize] = useState(false);
	const [isAuthorize, setIsAuthorize] = useState(user);

	function getRandomNumber() {
		return parseFloat((Math.random() * 14 + 1).toFixed(2));
	}

	console.log(gameValue);

	useEffect(() => {
		if (user) {
			axios
				.post(
					'https://jet-tests.top/game.php',
					{ login: user.login },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then(response => {
					setGameX(Number(response.data.maxNumber));
					setGameValue(Number(response.data.randomNumber));
				})
				.catch(error => {
					console.error('Ошибка при получении сообщений:', error);
				});
		}
	}, []);

	useEffect(() => {
		if (user) {
			axios
				.post(
					'https://jet-tests.top/balance.php',
					{ login: user.login },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				.then(res => {
					user.balance = res.data.balance;
					localStorage.setItem('userLuckyJet', JSON.stringify(user));
					setBalance(user.balance);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [user]);

	useEffect(() => {
		setTimeout(() => {
			setLoading(!loading);
		}, 2000);
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<AppContext.Provider
			value={{
				showChat,
				setShowChat,
				hideSounds,
				setHideSounds,
				showAnimation,
				setShowAnimation,
				endGame,
				setEndGame,
				history,
				setHistory,
				gameX,
				setGameX,
				gameLoader,
				setGameLoader,
				gameValue,
				setGameValue,
				balance,
				setBalance,
				form1Income,
				setForm1Income,
				winValue,
				setWinValue,
				showWinModal,
				setShowWinModal,
				showWinModal2,
				setShowWinModal2,
				isPlayingMusic,
				setIsPlayingMusic,
				showAuthorize,
				setShowAuthorize,
				isAuthorize,
				setIsAuthorize,
				showMessage,
				setShowMessage,
				showPayment,
				setShowPayment,
				isCashOut,
				setIsCashOut,
				form2Income,
				setForm2Income,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppContextProvider };
