import axios from 'axios';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { gsap } from 'gsap/gsap-core';
import { useContext, useEffect, useRef, useState } from 'react';
import start from '../../../public/start.mp3';
import uletel from '../../../public/uletel.mp3';
import fire from '../../assets/fire.svg';
import game_loader from '../../assets/game_loader.svg';
import hero from '../../assets/hero.webp';
import light from '../../assets/light.webp';
import { AppContext, user } from '../../context/AppContext';

function getRandomNumber() {
	return parseFloat((Math.random() * 14 + 1).toFixed(2));
}

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(MotionPathPlugin);

const Jet = () => {
	const [isEndValueReached, setIsEndValueReached] = useState(false);
	const [animationDuration, setAnimationDuration] = useState(20);

	const [speedFactor, setSpeedFactor] = useState(2000);

	let {
		hideSounds,
		showAnimation,
		gameX,
		setGameX,
		gameLoader,
		setGameLoader,
		gameValue,
		setGameValue,
		setEndGame,
		setHistory,
		history,
	} = useContext(AppContext);

	const boyRef = useRef(null);
	const lineRef = useRef(null);
	const gameContainer = useRef(null);
	const gameXRef = useRef(null);
	const dRtoonRef = useRef(null);
	const hbRYLARef = useRef(null);
	const jtWVEWRef = useRef(null);
	const gBPGTIRef = useRef(null);
	const audioRef1 = useRef(new Audio(uletel));
	const audioRef2 = useRef(new Audio(start));

	gsap.registerPlugin(MotionPathPlugin, CSSPlugin);

	useEffect(() => {
		const interval = setInterval(() => {
			if (animationDuration > 1) {
				setAnimationDuration(animationDuration - 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [animationDuration]);

	const playStartSound = () => {
		if (hideSounds) {
			audioRef2.current.play();
		}
	};

	useEffect(() => {
		let speed;

		if (gameX > 10) {
			if (gameValue > 50) {
				speed = 250;
			} else if (gameValue > 20) {
				speed = 500;
			} else if (gameValue > 10) {
				speed = 1000;
			} else if (gameValue > 5) {
				speed = 1250;
			} else if (gameValue > 2) {
				speed = 4000;
			} else {
				speed = 8000;
			}
		} else if (gameX > 5 && gameX < 10) {
			if (gameValue > 5) {
				speed = 1500;
			} else if (gameValue > 2) {
				speed = 1800;
			} else {
				speed = 4000;
			}
		} else if (gameX > 2 && gameX < 5) {
			if (gameValue > 2) {
				speed = 1500;
			} else {
				speed = 2500;
			}
		} else if (gameX > 1 && gameX < 2) {
			speed = gameValue > 1.5 ? 1000 : 2000;
		}

		setSpeedFactor(speed);
	}, [gameValue, gameX]);

	useEffect(() => {
		if (gameXRef.current) {
			const updateValue = () => {
				if (gameValue >= gameX) {
					gameValue = gameX;
					setIsEndValueReached(!isEndValueReached);
					clearInterval(animationInterval);
				}

				if (gameValue >= gameX) {
					setIsEndValueReached(true);
					clearInterval(animationInterval);
				} else {
					setGameValue((gameValue += (gameX - 0.01) / speedFactor));
				}

				// Обновляем gameValue с двумя знаками после запятой
				setGameValue(prevValue => {
					const newValue = prevValue + (gameX - prevValue) / speedFactor;
					const formattedValue = Number.isFinite(newValue)
						? parseFloat(newValue.toFixed(2))
						: newValue;
					return formattedValue;
				});
			};

			const animationInterval = setInterval(updateValue, 1000 / 30); // Интервал анимации
			return () => {
				clearInterval(animationInterval);
			};
		}
	}, [gameX, speedFactor]);

	const gameCrash = () => {
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
	};

	const playEndSound = () => {
		if (hideSounds) {
			audioRef1.current.play();
		}
	};

	useEffect(() => {
		if (isEndValueReached) {
			boyRef.current.classList.add('leave');
			playEndSound();
			setEndGame(true);
			setHistory([gameX, ...history]);
			setTimeout(() => {
				setGameLoader(true);
				fetchNewGameX();
			}, 1500);
		}
	}, [isEndValueReached]);

	useEffect(() => {
		if (gameLoader === false) {
			playStartSound();
			startAnimations();
			if (user) {
				gameCrash();
			} else {
				setGameValue(1.0);
				setGameX(getRandomNumber());
			}
		}
	}, [gameLoader]);

	const fetchNewGameX = () => {
		setTimeout(() => {
			setEndGame(false);
			setGameLoader(false);
			setIsEndValueReached(!isEndValueReached);
			setAnimationDuration(10);
			setGameValue(1.0);
		}, 8000);
	};

	const startAnimations = () => {
		if (dRtoonRef.current) {
			gsap.to(dRtoonRef.current, {
				duration: animationDuration,
				x: '+=10%',
				yoyo: true,
				repeat: -1,
				ease: 'linear',
			});
		}

		if (hbRYLARef.current) {
			gsap.to(hbRYLARef.current, {
				duration: animationDuration,
				backgroundPosition: '350px 0',
				yoyo: true,
				repeat: -1,
				ease: 'linear',
			});
		}

		if (jtWVEWRef.current) {
			gsap.to(jtWVEWRef.current, {
				duration: animationDuration,
				backgroundPosition: '100% 0',
				repeat: -1,
				ease: 'linear',
			});
		}

		if (gBPGTIRef.current) {
			gsap.to(gBPGTIRef.current, {
				duration: animationDuration,
				backgroundPosition: '0 100%',
				repeat: -1,
				ease: 'linear',
			});
		}

		let data = 'M 0 254.59375 Q 530 254.59375 930 30';
		let data_grad = 'M 0 254.59375 Q 530 254.59375 930 30 L 920 258 Z';

		gsap.to(boyRef.current, {
			duration: 3.5,
			motionPath: {
				path: '.path_jet',
				align: '.path_jet',
				alignOrigin: [0.5, 0.5],
			},
			onComplete: () => {
				gsap.to(boyRef.current, {
					duration: 3,
					yoyo: true,
					repeat: -1,
					y: '+=40px',
				});
				gsap.to('.path_jet', {
					attr: {
						d: data,
					},
					duration: 3,
					repeat: -1,
					yoyo: true,
				});
				gsap.to('.grad_jet', {
					attr: {
						d: data_grad,
					},
					duration: 3,
					repeat: -1,
					yoyo: true,
				});
			},
		});

		let paths = document.querySelectorAll('svg path');
		const animateGrad = document.querySelector('.animate-grad');
		let i = 0;

		paths.forEach(function (item, index) {
			i++;
			let pathLength = item.getTotalLength();

			const width = window.innerWidth;

			item.setAttribute('stroke-dasharray', pathLength);
			item.setAttribute('stroke-dashoffset', pathLength);
			if (width >= 2100) {
				item.innerHTML =
					"<animate attributeName='stroke-dashoffset' begin='0s' dur='3.8s' to='0' fill='freeze'/>";
				animateGrad.setAttribute('dur', '3.8s');
			} else {
				item.innerHTML =
					"<animate attributeName='stroke-dashoffset' begin='0s' dur='3.6s' to='0' fill='freeze'/>";
			}
		});
	};

	return (
		<div className='jet'>
			<audio ref={audioRef2} src={start}></audio>
			{gameLoader ? (
				<div className='jet_loader'>
					<img src={game_loader} />
					<p>Ожидание следующего раунда</p>
					<div className='jet_loader-line--container'>
						<div className='jet_loader-line'></div>
					</div>
				</div>
			) : (
				<div className='jet_game' ref={gameContainer}>
					<div className='jet_game-container'>
						<div className='jet_game-elements'>
							<div
								className='dRtoon'
								style={!showAnimation ? { opacity: '0' } : {}}
								ref={dRtoonRef}
							></div>
							<div
								className='hbRYLA'
								style={!showAnimation ? { opacity: '0' } : {}}
								ref={hbRYLARef}
							></div>
							<div
								className='jtWVEW'
								style={!showAnimation ? { opacity: '0' } : {}}
								ref={jtWVEWRef}
							></div>
							<div
								className='gBPGTI'
								style={!showAnimation ? { opacity: '0' } : {}}
								ref={gBPGTIRef}
							></div>
							<div
								className='GzoPb'
								style={
									!showAnimation ? { opacity: '0' } : { overflow: 'hidden' }
								}
							>
								<div className='boy_container' ref={boyRef}>
									<div className='boy'>
										<img src={fire} className='fcngae' />
										<img src={light} className='lgqJFl' />
										<img src={hero} className='EECPQ' />
									</div>
								</div>
								<div className='svg-container'>
									<svg
										ref={lineRef}
										viewBox='0 0 1068 554'
										className='jet_line'
										preserveAspectRatio='xMaxYMin meet'
									>
										<defs>
											<linearGradient
												id='grad_stroke'
												x1='0'
												x2='1'
												y1='0'
												y2='1'
											>
												<stop stopColor='#9D7AFF'></stop>
												<stop offset='.787' stopColor='#622BFC'></stop>
												<stop
													offset='1'
													stopColor='#5c24fc'
													stopOpacity='0'
												></stop>
											</linearGradient>
											<linearGradient id='grad' x1='100%' x2='0%' y1='0' y2='0'>
												<stop offset='0' stopColor='#9d7aff' stopOpacity='0'>
													<animate
														className='animate-grad'
														attributeName='offset'
														from='1'
														to='0'
														dur='3.6s'
														fill='freeze'
													/>
												</stop>
												<stop
													offset='0.5'
													stopColor='#9d7aff'
													stopOpacity='0.20'
												></stop>
												<stop
													offset='0.987'
													stopColor='#9d7aff'
													stopOpacity='0'
												></stop>
											</linearGradient>
										</defs>
										<path
											x='0'
											y='0'
											d='M 0 254.59375 Q 500 254.59375 890 0'
											fill='transparent'
											stroke='url(#grad_stroke)'
											className='path_jet'
											transform='translate(0,300)'
										></path>
										<path
											d='M 0 254.59375 Q 500 254.59375 890 0 L 920 254.59375 Z'
											fill='url(#grad)'
											className='grad_jet'
											transform='translate(0,300)'
										></path>
									</svg>
								</div>
							</div>
							<div
								className='hObvQp'
								style={!showAnimation ? { marginTop: '70px' } : {}}
							>
								<div className='hvYjYJ' ref={gameXRef}>
									{gameValue.toFixed(2)}
								</div>
								<div
									className='bkBagU'
									style={{ opacity: isEndValueReached ? 1 : 0 }}
								>
									Улетел
									<audio ref={audioRef1} src={uletel}></audio>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Jet;
