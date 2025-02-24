import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BackgroundMusic = () => {
	const [audio] = useState(new Audio('/bg_audio.mp3'));
	const [volume, setVolume] = useState(0.15);
	const { isPlayingMusic, setIsPlayingMusic } = useContext(AppContext);

	useEffect(() => {
		audio.loop = true;
		audio.volume = volume;
		if (isPlayingMusic) {
			audio.play();
		} else {
			audio.pause();
		}
		return () => audio.pause();
	}, [audio, volume, isPlayingMusic]);

	const toggleMusic = () => {
		setIsPlayingMusic(!isPlayingMusic);
	};

	return (
		<div
			className='header_audio-content'
			onClick={toggleMusic}
			style={isPlayingMusic ? { opacity: '1' } : { opacity: '0.5' }}
		>
			<svg
				width='21'
				height='20'
				viewBox='0 0 21 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10.999 3.92554C10.9964 3.91307 10.9943 3.9007 10.9926 3.88845C10.9566 3.6266 10.7207 3.44029 10.4629 3.4554C10.201 3.47353 9.99808 3.69206 9.99808 3.95693V12.93C9.57928 12.6742 9.06353 12.5171 8.4988 12.5171C7.12146 12.5171 6 13.4205 6 14.5313C6 15.6421 7.12146 16.5455 8.4988 16.5455C9.87614 16.5455 10.9976 15.6421 10.9976 14.5313V8.66202C10.9981 8.66219 10.9985 8.66237 10.999 8.66255V3.92554Z'
					fill='#948AC5'
				></path>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10.999 8.66295V3.92596C11.0501 4.17679 11.265 4.46872 11.4564 4.72775L11.5174 4.81033C11.8569 5.27311 12.337 5.5972 12.8452 5.94022L12.8468 5.94129L12.8471 5.94149C13.5286 6.40166 14.2342 6.878 14.6449 7.72584C14.9068 8.26563 15.0277 8.83967 14.9947 9.38652C14.9428 10.2385 14.6749 11.0996 14.2711 11.7804C14.2611 11.7975 14.2501 11.8126 14.2381 11.8267C14.1241 12.014 14.0052 12.1933 13.8713 12.3463C13.6884 12.5548 13.3725 12.577 13.1666 12.3917C12.9587 12.2084 12.9387 11.8901 13.1216 11.6817C13.1743 11.621 13.2213 11.5489 13.2682 11.4771C13.2836 11.4535 13.299 11.4299 13.3145 11.4067C12.9769 9.68869 11.7498 8.95236 10.999 8.66295Z'
					fill='#948AC5'
				></path>
			</svg>
		</div>
	);
};

export default BackgroundMusic;
