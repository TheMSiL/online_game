import { useEffect, useState } from 'react';

const Loader = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const animateProgress = () => {
			setProgress(prevProgress => prevProgress + 5);

			if (progress < 100) {
				setTimeout(animateProgress, 100);
			}
		};

		animateProgress();
	}, []);

	return (
		<div className='preloader container_load'>
			<div></div>
			<div className='middle'>
				<div className='animation'>
					<div className='content'>
						<div className='item bg-shine'></div>
						<div className='item bg-circle'></div>
						<div className='item mask'>
							<div className='item bg bg-man'></div>
						</div>
						<div className='item bg bg-man' style={{ height: '150px' }}></div>
						<div
							className='item bg bg-man'
							style={{
								width: '120px',
								backgroundPositionX: '-201px',
								marginLeft: '200px',
								height: '286px',
							}}
						></div>
						<div className='item name'>
							<div className='item bg bg-l'></div>
							<div className='item bg bg-u'></div>
							<div className='item bg bg-c'></div>
							<div className='item bg bg-k'></div>
							<div className='item bg bg-y'></div>
							<div className='item bg bg-j'></div>
							<div className='item bg bg-e'></div>
							<div className='item bg bg-t'></div>
						</div>
						<div className='item bg bg-star'></div>
						<div className='item bg bg-star bg-star-2'></div>
					</div>
				</div>
			</div>
			<div className='progress' progress='2'>
				<div className='progress__value'>{`${progress}%`}</div>
				<div className='progress__line' style={{ width: `${progress}%` }}></div>
			</div>
		</div>
	);
};

export default Loader;
