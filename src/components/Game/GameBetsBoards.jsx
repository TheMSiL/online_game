import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { AppContext, user } from '../../context/AppContext';
import GameBoard1 from './GameBoard1';
import GameBoard2 from './GameBoard2';

const isBanned = user?.ban_status;

const validationSchema = Yup.object({
	betInput: Yup.number().required('Введите ставку'),
	amountInput: Yup.number().required('Введите сумму'),
});

const GameBetsBoards = () => {
	const { setShowAuthorize, gameLoader, setBalance } = useContext(AppContext);
	const [form1Data, setForm1Data] = useState(null);
	const [form2Data, setForm2Data] = useState(null);
	const [isBet1, setIsBet1] = useState({});
	const [isBet2, setIsBet2] = useState({});
	const [isClicked1, setIsClicked1] = useState(false);
	const [isClicked2, setIsClicked2] = useState(false);

	useEffect(() => {
		if (gameLoader && (isClicked1 || isClicked2)) {
			const bets = [];
			if (isClicked1 && form1Data) {
				bets.push(form1Data);
			}
			if (isClicked2 && form2Data) {
				bets.push(form2Data);
			}
			if (bets.length > 0) {
				const requestData = {
					login: user.login,
					bets,
				};
				axios
					.post('https://jet-tests.top/change_balance.php', requestData, {
						headers: {
							'Content-Type': 'application/json',
						},
					})
					.then(response => {
						setBalance(response.data.balance);
						if (isClicked1) setIsBet1(form1Data);
						if (isClicked2) setIsBet2(form2Data);
					})
					.catch(error => {
						console.error('Ошибка при получении сообщений:', error);
					});
			}
		}
	}, [gameLoader, isClicked1, isClicked2, form1Data, form2Data]);


	useEffect(() => {
		if (gameLoader) {
			if (!isClicked1) {
				setForm1Data(null);
			}
			if (!isClicked2) {
				setForm2Data(null);
			}
		}
	}, [isClicked1, isClicked2, gameLoader]);

	const addBalance = form => {
		axios
			.post(
				'https://jet-tests.top/add_balance.php',
				{
					login: user.login,
					amount: form,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(response => {
				setBalance(response.data.balance);
			})
			.catch(error => {
				console.error('Ошибка при получении сообщений:', error);
			});
	};

	return (
		<div className='game_bottom'>
			{!user && (
				<span
					className='game_board-noAUTH'
					onClick={() => setShowAuthorize(true)}
				></span>
			)}
			{isBanned && (
				<span
					className='game_board-noAUTH'
					onClick={() => setShowAuthorize(true)}
				></span>
			)}
			<GameBoard1
				setReqData={setForm1Data}
				isBet1={isBet1}
				setIsBet1={setIsBet1}
				isClicked={isClicked1}
				setIsClicked={setIsClicked1}
				validationSchema={validationSchema}
				addBalance={addBalance}
			/>
			<GameBoard2
				setReqData={setForm2Data}
				isBet2={isBet2}
				setIsBet2={setIsBet2}
				isClicked={isClicked2}
				setIsClicked={setIsClicked2}
				validationSchema={validationSchema}
				addBalance={addBalance}
			/>
		</div>
	);
};

export default GameBetsBoards;
