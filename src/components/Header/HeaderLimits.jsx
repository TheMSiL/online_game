import limits from '../../assets/header/limits.svg';
import { user } from '../../context/AppContext';


const HeaderLimits = ({ setOnOverlay }) => {
	return (
		<div className='overlay_content header_limits-content'>
			<div className='header_limits-content-top'>
				<div className='header_limits-content-top--info'>
					<img src={limits} />
					<h2>Игровые лимиты</h2>
				</div>
				<div onClick={() => setOnOverlay(false)}>
					<span className='header_modal-close'>
						<div className='close_bg hgmBJG'>
							<div className='x'></div>
						</div>
					</span>
				</div>
			</div>
			<div className='header_limits-content-bottom'>
				<div className='limits' style={{ flexDirection: 'column' }}>
					<div className='limits_item limits_item-top'>
						<div className='limits_item-text'>Минимальная ставка</div>
						<div className='limits_item-price'>{user?.min_dep || '0.1'} $</div>
					</div>
					<div className='limits_item'>
						<div className='limits_item-text'>Максимальная ставка</div>
						<div className='limits_item-price'>{user?.max_dep || '140.00'} $</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderLimits;
