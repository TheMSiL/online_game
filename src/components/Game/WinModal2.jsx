import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const WinModal2 = () => {
	const { winValue, showWinModal2, form2Income } = useContext(AppContext);

	return (
		<div className={showWinModal2 ? 'win_modal show2' : 'win_modal'}>
			<div className='win_modal-left'>
				Вы успели забрать!
				<span>x{winValue}</span>
			</div>
			<div className='win_modal-right'>
				{form2Income} $<span>Ваш выигрыш</span>
			</div>
		</div>
	);
};

export default WinModal2;
