import { useContext, useEffect, useRef, useState } from 'react';
import euro from '../assets/currency/euro.svg';
import hryvna from '../assets/currency/hryvna.svg';
import rouble from '../assets/currency/rouble.svg';
import zloty from '../assets/currency/zloty.svg';
import { AppContext, user } from '../context/AppContext';

import bitcoin from '../assets/currency/bitcoin.svg';
import credit_card from '../assets/currency/credit-card.svg';
import ethereum from '../assets/currency/etherium.svg';
import usdt from '../assets/currency/usdt.svg';

import axios from 'axios';
import revolut from '../assets/currency/Revolut.png';
import transfer from '../assets/currency/TransferGo.png';

const methods = [
	{
		img: credit_card,
		name: 'Credit card',
		type: 'card',
	},
	{
		img: ethereum,
		name: 'Ethereum',
		type: 'eth',
	},
	{
		img: usdt,
		name: 'USDT TRC20',
		type: 'usdt',
	},
	{
		img: bitcoin,
		name: 'Bitcoin',
		type: 'btc',
	},
];

const currencies = [
	{
		img: hryvna,
		title: 'UAH',
		type: 'uah',
	},
	{
		img: zloty,
		title: 'PLN',
		type: 'pln',
	},
	{
		img: euro,
		title: 'EUR',
		type: 'eur',
	},
	{
		img: rouble,
		title: 'RUB',
		type: 'rub',
	},
];

const Payment = ({ isCashOut, setShowPayment }) => {
	const [currency, setCurrency] = useState(null);
	const [currencyType, setCurrencyType] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [step, setStep] = useState('1');
	const [cardOption, setCardOption] = useState(null);
	const [userPayOff, setUserPayOff] = useState('');
	const [payValue, setPayValue] = useState('');
	const [promoValue, setPromoValue] = useState('');
	const [submited, setSubmited] = useState(false);
	const [serverErrorMessage, setServerErrorMessage] = useState('');
	const [convertSum, setConvertSum] = useState(0);
	const [bill, setBill] = useState('');
	const [isPayOffDisabled, setIsPayOffDisabled] = useState(false);
	const { setBalance } = useContext(AppContext);
	const payRef = useRef(null);

	const [copyMessageSum, setCopyMessageSum] = useState('Скопировать');
	const [copyMessageBill, setCopyMessageBill] = useState('Скопировать');

	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		const handleClickOutsideMenu = event => {
			if (payRef.current && !payRef.current.contains(event.target)) {
				setShowPayment(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, [setShowPayment]);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const cashOutSubmit = e => {
		e.preventDefault();
		setIsPayOffDisabled(true);
		axios
			.post(
				'https://jet-tests.top/withdraw.php',
				{ amount: userPayOff, login: user.login },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(res => {
				if (res.data.status === 'success') {
					setSubmited(true);
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
				} else {
					setServerErrorMessage(res.data.message);
				}
			})
			.catch(error => {
				setServerErrorMessage(
					'В данный момент невозможно совершить вывод. Попробуйте еще раз.'
				);
				console.error(error);
				setIsPayOffDisabled(false);
			});
	};

	const cashInSubmit = e => {
		e.preventDefault();
		setSubmited(true);
	};

	useEffect(() => {
		if (isCashOut) {
			setStep('payoff');
		}
	}, [isCashOut]);

	const cryptoSubmit = e => {
		e.preventDefault();
		const data = {
			login: user?.login,
			paymentMethod: paymentMethod,
			currency: currencyType,
			amount: payValue,
			promo: promoValue,
		};
		axios
			.post(
				'https://jet-tests.top/converter.php',
				{ amount: data.amount, currency: data.currency },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(res => {
				if (res.status === 200) {
					setConvertSum(res.data.convertedAmount);
					setBill(res.data.currencyAddress);
				} else {
					setServerErrorMessage(
						'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
					);
				}
				axios
					.post('https://jet-tests.top/payment.php', data, {
						headers: {
							'Content-Type': 'application/json',
						},
					})
					.then(res => {
						if (res.data.status === 'success') {
							setStep('3');
						}
					})
					.catch(error => {
						setServerErrorMessage(
							'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
						);
						console.error(error);
					});
			})
			.catch(error => {
				setServerErrorMessage(
					'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
				);
				console.error(error);
			});
	};

	const cardSubmit = e => {
		e.preventDefault();
		setStep('2');
	};

	const CardSecondStepSubmit = e => {
		e.preventDefault();
		const data = {
			login: user?.login,
			paymentMethod: paymentMethod,
			currency: currencyType,
			amount: payValue,
			promo: promoValue,
		};
		axios
			.post(
				'https://jet-tests.top/converter.php',
				{ amount: data.amount, currency: data.currency },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(res => {
				if (res.status === 200) {
					setConvertSum(res.data.convertedAmount);
					setBill(res.data.currencyAddress);
				} else {
					setServerErrorMessage(
						'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
					);
				}
				axios
					.post('https://jet-tests.top/payment.php', data, {
						headers: {
							'Content-Type': 'application/json',
						},
					})
					.then(res => {
						if (res.data.status === 'success') {
							setStep('3');
						}
					})
					.catch(error => {
						setServerErrorMessage(
							'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
						);
						console.error(error);
					});
			})
			.catch(error => {
				setServerErrorMessage(
					'В данный момент невозможно совершить пополнение. Мы уже работаем над исправлением.'
				);
				console.error(error);
			});
	};

	const copyToClipboard = (text, setCopyMessage) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyMessage('Скопировано');
			setTimeout(() => {
				setCopyMessage('Скопировать');
			}, 3000);
		});
	};

	const handlePaymentMethodSelect = method => {
		setPaymentMethod(method.name);
		setCurrencyType(method.type);
	};

	const handleCurrencySelect = currency => {
		setCurrency(currency.title);
		setCurrencyType(currency.type);
	};

	return (
		<div className='overlay_ban'>
			<div className='message_cont payment_cont' ref={payRef}>
				<span className='message_close' onClick={() => setShowPayment(false)}>
					x
				</span>
				{step === '1' && (
					<form
						onSubmit={
							paymentMethod === 'Credit card' ? cardSubmit : cryptoSubmit
						}
					>
						<div className='payment_flex'>
							<div>
								{paymentMethod && (
									<div className='pay_form'>
										<input
											type='number'
											min={Number(user?.min_cashup)}
											value={payValue}
											placeholder='Сумма в USD'
											className='authorize_form-input promo_input'
											required
											onChange={e => setPayValue(e.target.value)}
										/>
										{!isCashOut && (
											<div className='pay_form-promo'>
												<span>Есть промокод?</span>{' '}
												<div
													className='custom_checkbox'
													onClick={handleCheckboxChange}
												>
													{isChecked === true ? '✓' : ''}
												</div>
											</div>
										)}
										{isChecked === true && (
											<input
												type='text'
												value={promoValue}
												className='authorize_form-input promo_input'
												placeholder='Введите промокод'
												required
												onChange={e => setPromoValue(e.target.value)}
											/>
										)}
									</div>
								)}
							</div>
							<div className='currencies payment_methods'>
								{methods.map((item, index) => (
									<div className='currency' key={index}>
										<div
											onClick={() => handlePaymentMethodSelect(item)}
											className={
												paymentMethod === item.name
													? 'currency_img-cont choose'
													: 'currency_img-cont'
											}
										>
											<img src={item.img} />
										</div>
										<p>{item.name}</p>
									</div>
								))}
							</div>
						</div>

						<button className='currency_btn' type='submit'>
							Продолжить
						</button>

						{serverErrorMessage && (
							<p className='error payoff_message'>{serverErrorMessage}</p>
						)}
					</form>
				)}

				{step === '2' && (
					<form onSubmit={CardSecondStepSubmit}>
						<div className='currencies payment_methods'>
							{!isCashOut &&
								paymentMethod === 'Credit card' &&
								!currency &&
								currencies.map((item, index) => (
									<div className='currency' key={index}>
										<div
											onClick={() => handleCurrencySelect(item)}
											className={
												currency === item.title
													? 'currency_img-cont choose'
													: 'currency_img-cont'
											}
										>
											<img src={item.img} />
										</div>
										<p>{item.title}</p>
									</div>
								))}
						</div>
						{(currency === 'EUR' || currency === 'PLN') && (
							<div className='card_options'>
								<div
									className={cardOption === 'revolut' ? 'nogrey' : ''}
									onClick={() => setCardOption('revolut')}
								>
									<img src={revolut} />
								</div>
								<div
									className={cardOption === 'transfer' ? 'nogrey' : ''}
									onClick={() => setCardOption('transfer')}
								>
									<img src={transfer} />
								</div>
							</div>
						)}
						{(currency === 'UAH' || currency === 'RUB') && (
							<div className='currency'>
								<div className='currency_img-cont choose'>
									<img
										src={currencies.find(c => c.title === currency)?.img}
										alt={currency}
									/>
								</div>
								<p>{currencies.find(c => c.title === currency)?.title}</p>
							</div>
						)}
						{(currency === 'UAH' ||
							currency === 'RUB' ||
							((currency === 'PLN' || currency === 'EUR') && cardOption)) && (
							<button
								style={
									currency === 'UAH' || currency === 'RUB'
										? { marginTop: '40px' }
										: {}
								}
								className='currency_btn'
							>
								Продолжить
							</button>
						)}
					</form>
				)}
				{step === '3' && (
					<form className='second_cont' onSubmit={cashInSubmit}>
						<div className='method_cont'>
							<img
								src={methods.find(item => item.name === paymentMethod).img}
							/>
							<p>{paymentMethod}</p>
						</div>
						<div className='k_oplate k_oplate1'>
							<p>Будет начислено:</p>
							<div>
								<span className='authorize_form-input'>{payValue} USD</span>
							</div>
						</div>
						<div className='k_oplate k_oplate1'>
							<p>Сумма к оплате:</p>
							<div>
								<span className='authorize_form-input'>
									{convertSum} {currencyType.toUpperCase()}
								</span>
								<button
									className={
										copyMessageSum === 'Скопировано'
											? 'k_oplate_button greenBTN'
											: 'k_oplate_button'
									}
									onClick={() =>
										copyToClipboard(`${convertSum}`, setCopyMessageSum)
									}
									type='button'
								>
									{copyMessageSum}
								</button>
							</div>
						</div>
						<div className='k_oplate'>
							<p>Счёт:</p>
							<div>
								<span className='authorize_form-input'>{bill}</span>
								<button
									className={
										copyMessageBill === 'Скопировано'
											? 'k_oplate_button greenBTN'
											: 'k_oplate_button'
									}
									onClick={() => copyToClipboard(bill, setCopyMessageBill)}
									type='button'
								>
									{copyMessageBill}
								</button>
							</div>
						</div>
						{paymentMethod === 'Credit card' &&
							(currency === 'EUR' || currency === 'PLN') && (
								<>
									<p className='instruction_text'>Инструкция к пополнению:</p>
									<a
										className='instruction_link'
										href={
											cardOption === 'revolut'
												? 'https://telegra.ph/Sposob-oplaty-Revolut---Instrukciya-05-23'
												: 'https://telegra.ph/Sposob-oplaty-Transfer-GO---Instrukciya-05-23'
										}
									>
										{cardOption === 'revolut'
											? 'https://telegra.ph/Sposob-oplaty-Revolut---Instrukciya-05-23'
											: 'https://telegra.ph/Sposob-oplaty-Transfer-GO---Instrukciya-05-23'}
									</a>
								</>
							)}
						<button
							className='currency_btn'
							type='submit'
							disabled={!submited ? '' : 'false'}
						>
							Отправить на проверку
						</button>
						{serverErrorMessage && (
							<p className='payoff_message red'>{serverErrorMessage}</p>
						)}
						{submited === true && (
							<>
								<p className='payoff_message green'>
									Ожидайте зачисления средств
								</p>
								<p
									className='ban_message'
									style={{ marginTop: '10px', fontSize: '14px' }}
								>
									Если у вас остались вопросы либо не получается совершить
									оплату, можете обратиться в нашу{' '}
									<a href='https://t.me/maksim4kkk'>поддержку</a>
								</p>
							</>
						)}
					</form>
				)}
				{step === 'payoff' && (
					<form className='second_cont' onSubmit={cashOutSubmit}>
						<div className='k_oplate k_oplate1'>
							<p>Введите сумму вывода в USD:</p>
							<div>
								<input
									type='number'
									value={userPayOff}
									className='authorize_form-input'
									min={Number(user?.min_withdraw)}
									required
									disabled={isPayOffDisabled}
									onChange={e => setUserPayOff(e.target.value)}
								/>
							</div>
						</div>
						<button className='currency_btn' type='submit'>
							Подать заявку на вывод
						</button>
						{submited && (
							<p className='green payoff_message'>
								💸Вывод средств в размере {userPayOff} USD будет осуществлен на
								реквизиты с которых в последний раз было пополнение
							</p>
						)}
						{serverErrorMessage && (
							<p className='payoff_message red'>{serverErrorMessage}</p>
						)}
					</form>
				)}
			</div>
		</div>
	);
};

export default Payment;
