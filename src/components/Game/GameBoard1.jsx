import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext, user } from '../../context/AppContext';

const minAmount = user ? user?.min_dep : '0.10';
const maxAmount = user ? user?.max_dep : '140.00';

const GameBoard1 = ({
	setReqData,
	isBet1,
	setIsBet1,
	isClicked,
	setIsClicked,
	validationSchema,
	addBalance,
}) => {
	const {
		gameLoader,
		gameValue,
		endGame,
		balance,
		setForm1Income,
		setWinValue,
		setShowWinModal,
		setShowPayment,
		setIsCashOut,
	} = useContext(AppContext);

	const btnRef = useRef(null);
	const winBtnRef = useRef(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [localIncome, setLocalIncome] = useState(0);
	const [isFormActive, setIsFormActive] = useState(true);

	const betAmount = isBet1 && isBet1?.amountInput;

	const formik = useFormik({
		initialValues: {
			betInput: '2.00',
			amountInput: minAmount,
			checkedST: false,
			checkedAV: false,
		},
		validationSchema,
		onSubmit: formSubmit,
	});

	useEffect(() => {
		if (isClicked === true) {
			setReqData(formik.values);
		}
	}, [formik.values, isClicked]);

	function formSubmit() {
		if (gameLoader) {
			setIsSubmitted(true);
			setIsFormActive(false);
		}
	}

	useEffect(() => {
		const incomeGrow = (betAmount * gameValue).toFixed(2);
		setLocalIncome(incomeGrow);
	}, [betAmount, gameValue]);

	const btnClick = () => {
		const changedBalance = parseFloat(balance.replace(/,/g, ''));
		if (changedBalance >= parseFloat(formik.values.amountInput)) {
			setIsClicked(prev => !prev);
		} else {
			setShowPayment(true);
			setIsCashOut(false);
		}
	};


	useEffect(() => {
		if (isSubmitted) {
			if (formik.values.checkedAV) {
				if (Number(formik.values.betInput) === Number(gameValue)) {
					getMoney();
				}
			}
		}
	}, [formik.values.betInput, formik.values.checkedAV, gameValue, isSubmitted]);


	const addBets = () => {
		const data = {
			login: user.login,
			amount: formik.values.amountInput.toString(),
			crash: gameValue,
			result: localIncome,
		};
		axios
			.post('https://jet-tests.top/add_bets.php', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(response => {})
			.catch(error => {
				console.error('Ошибка при получении сообщений:', error);
			});
	};

	const getMoney = () => {
		setWinValue(gameValue);
		setForm1Income(localIncome);
		setIsSubmitted(false);
		setIsFormActive(true);
		setIsClicked(false);
		setIsBet1({});
		setShowWinModal(true);
		setTimeout(() => {
			setShowWinModal(false);
			addBalance(localIncome);
		}, 2500);
		addBets();
		if (formik.values.checkedST) {
			setIsClicked(true);
		} else {
			formik.resetForm();
		}
	};

	useEffect(() => {
		if (endGame === true) {
			if (winBtnRef.current) {
				winBtnRef.current.disabled = true;
				formik.resetForm();
				setIsBet1({});
				setForm1Income(0);
				setIsSubmitted(false);
				setIsFormActive(true);
			}
		}
	}, [endGame]);

	useEffect(() => {
		if (isClicked === true) {
			if (gameLoader === true) {
				formik.handleSubmit();
				setIsClicked(false);
			}
		}
	}, [isClicked, gameLoader]);

	const handleAmountChange = e => {
		let newValue = e.target.value;

		// Разрешить только цифры и точки
		newValue = newValue.replace(/[^\d.]/g, '');

		const dotIndex = newValue.indexOf('.');
		if (dotIndex !== -1) {
			const afterDot = newValue.substring(dotIndex + 1);
			// Удалить лишние точки
			if (afterDot.includes('.')) {
				newValue =
					newValue.substring(0, dotIndex + 1) + afterDot.replace(/\./g, '');
			}

			const numbersAfterDot = newValue.substring(dotIndex + 1);
			// Ограничить до двух цифр после точки
			if (numbersAfterDot.length > 2) {
				newValue = newValue.substring(0, dotIndex + 3);
			}
		}

		// Преобразовать в число и проверить на maxAmount
		if (parseFloat(newValue) > maxAmount) {
			newValue = maxAmount.toString();
		}

		formik.setFieldValue('amountInput', newValue);
	};

	const handleInputChange = e => {
		let newValue = e.target.value;

		newValue = newValue.replace(/[^\d.]/g, '');

		const dotIndex = newValue.indexOf('.');
		if (dotIndex !== -1) {
			const afterDot = newValue.substring(dotIndex + 1);
			if (afterDot.includes('.')) {
				newValue =
					newValue.substring(0, dotIndex + 1) + afterDot.replace(/\./g, '');
			}

			const numbersAfterDot = newValue.substring(dotIndex + 1);
			if (numbersAfterDot.length > 2) {
				newValue = newValue.substring(0, dotIndex + 3);
			}
		}

		if (parseFloat(newValue) > 999.99) {
			newValue = '999.99';
		}

		formik.setFieldValue('betInput', newValue);
	};

	const handleXBlur = () => {
		let newValue = parseFloat(formik.values.betInput);
		formik.setFieldValue('betInput', newValue.toFixed(2));
	};

	const handleBlur = () => {
		let newValue = parseFloat(formik.values.amountInput);
		if (isNaN(newValue) || newValue < minAmount) {
			newValue = minAmount;
		} else if (newValue > maxAmount) {
			newValue = maxAmount;
		}

		formik.setFieldValue('amountInput', newValue);
	};

	const handleMinusClick = () => {
		const newValue = parseFloat(formik.values.amountInput) - 1;
		const newAmount = newValue >= minAmount ? newValue.toFixed(2) : minAmount;
		formik.setFieldValue('amountInput', newAmount);
	};

	const handlePlusClick = () => {
		const newValue = parseFloat(formik.values.amountInput) + 1;
		const newAmount = newValue <= maxAmount ? newValue.toFixed(2) : maxAmount;
		formik.setFieldValue('amountInput', newAmount);
	};

	const handlePlus10Click = () => {
		const newValue = parseFloat(formik.values.amountInput) + 10;
		const newAmount = newValue <= maxAmount ? newValue.toFixed(2) : maxAmount;
		formik.setFieldValue('amountInput', newAmount);
	};

	const handlePlus50Click = () => {
		const newValue = parseFloat(formik.values.amountInput) + 50;
		const newAmount = newValue <= maxAmount ? newValue.toFixed(2) : maxAmount;
		formik.setFieldValue('amountInput', newAmount);
	};

	const setMinAmount = () => {
		formik.setFieldValue('amountInput', minAmount);
	};

	const setMaxAmount = () => {
		formik.setFieldValue('amountInput', maxAmount);
	};

	return (
		<form className='game_board' onSubmit={formik.handleSubmit}>
			<div className='game_board-top'>
				<div
					className='game_board-top--checkbox'
					onClick={() =>
						isFormActive &&
						formik.setFieldValue('checkedST', !formik.values.checkedST)
					}
				>
					<div className='game_board-top--checkbox-content'>
						<span>{formik.values.checkedST && '✓'}</span>
					</div>
					<p>Автоставка</p>
				</div>
				<div
					className='game_board-top--checkbox'
					onClick={() => {
						if (isFormActive) {
							formik.setFieldValue('checkedAV', !formik.values.checkedAV);
							setIsSubmitted(false);
						}
					}}
				>
					<div className='game_board-top--checkbox-content'>
						<span>{formik.values.checkedAV && '✓'}</span>
					</div>
					<p>Автовывод</p>
				</div>
				<div className='game_board-top--input-container'>
					<input
						type='text'
						name='betInput'
						value={formik.values.betInput}
						readOnly={!isFormActive || isSubmitted}
						onBlur={handleXBlur}
						onChange={handleInputChange}
					/>
					<div className='sc-dsHJmm ehBGBb'>
						<div>x</div>
						<div>{formik.values.betInput}</div>
					</div>
				</div>
			</div>
			<div className='game_board-bottom'>
				<div className='bet_amount-controller'>
					<div className='bet_amount-controller-top'>
						<div
							className='minus_container'
							onClick={() => isFormActive && handleMinusClick()}
						>
							<div className='minus_btn'>
								<div className='minus_btn-bg'>
									<img src='https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg' />
								</div>
							</div>
						</div>
						<div className='amount_container'>
							<input
								className='amount_input'
								type='text'
								value={formik.values.amountInput}
								onChange={handleAmountChange}
								onBlur={handleBlur}
								readOnly={!isFormActive || isSubmitted}
							/>
							<div className='sc-jTjUTQ fdFMLQ'>
								<div>{formik.values.amountInput}</div>
								<div>$</div>
							</div>
						</div>
						<div className='minus_container'>
							<div
								className='minus_btn plus_btn'
								onClick={() => isFormActive && handlePlusClick()}
							>
								<div className='minus_btn-bg'>
									<img src='https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg' />
								</div>
							</div>
						</div>
					</div>
					<div className='bet_control-actions'>
						<div
							className='bet_control-actions--item pointer'
							onClick={() => isFormActive && setMinAmount()}
						>
							<div className='minus_btn-bg'>min</div>
						</div>
						<div className='bet_control-actions--item pointer'>
							<div
								onClick={() => isFormActive && handlePlus10Click()}
								className='minus_btn-bg'
							>
								+10
							</div>
						</div>
						<div className='bet_control-actions--item pointer'>
							<div
								className='minus_btn-bg'
								onClick={() => isFormActive && handlePlus50Click()}
							>
								+50
							</div>
						</div>
						<div
							className='bet_control-actions--item pointer'
							onClick={() => isFormActive && setMaxAmount()}
						>
							<div className='minus_btn-bg'>max</div>
						</div>
					</div>
				</div>
				{isSubmitted === false ? (
					<button
						className={
							gameLoader
								? 'bet_button-wait'
								: !isClicked
								? 'bet_button'
								: 'bet_button-clicked'
						}
						type='submit'
						onClick={btnClick}
						ref={btnRef}
						disabled={endGame || !isFormActive}
					>
						<div
							className={
								gameLoader
									? 'bet_button-content-wait'
									: !isClicked
									? 'bet_button-content'
									: 'bet_button-content--clicked'
							}
						>
							{gameLoader ? 'ОЖИДАНИЕ' : !isClicked ? 'СТАВКА' : 'ОТМЕНИТЬ'}
						</div>
					</button>
				) : (
					<button
						className={gameLoader ? 'bet_button-wait' : 'bet_button-get'}
						type='button'
						onClick={() => getMoney()}
						ref={winBtnRef}
						disabled={endGame}
					>
						<div
							className={
								gameLoader
									? 'bet_button-content-wait'
									: 'bet_button-content-get'
							}
						>
							{!gameLoader && <span className='income'>{localIncome} $</span>}
							{gameLoader ? 'ОЖИДАНИЕ' : 'ЗАБРАТЬ'}
						</div>
					</button>
				)}
			</div>
		</form>
	);
};

export default GameBoard1;
