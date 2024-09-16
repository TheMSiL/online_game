import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const WinModal1 = () => {
	const { winValue, showWinModal, form1Income } = useContext(AppContext);

	return (
		<div className={showWinModal ? 'win_modal show' : 'win_modal'}>
			<div className='win_modal-left'>
				Вы успели забрать!
				<span>x{winValue}</span>
			</div>
			<div className='win_modal-right'>
				{form1Income} $<span>Ваш выигрыш</span>
			</div>
		</div>
	);
};

export default WinModal1;
