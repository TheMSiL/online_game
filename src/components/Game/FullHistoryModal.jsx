import historyImg from '../../assets/header/bets_history.svg';
import { getXBackgroundColor } from '../../helpers';

const FullHistoryModal = ({
	setShowHistoryModal,
	showHistoryModal,
	history,
}) => {
	return (
		<div className='full_history-modal'>
			<div className='full_history-modal--top'>
				<div className='full_history-modal--top-info'>
					<img src={historyImg} />
					<h2>История раундов</h2>
				</div>
				<span
					className='header_modal-close'
					onClick={() => setShowHistoryModal(!showHistoryModal)}
				>
					<div className='close_bg hgmBJG'>
						<div className='x'></div>
					</div>
				</span>
			</div>
			<div className='full_history-modal--bottom'>
				<div className='game_history game_history-modal game_history-modal--flex'>
					{history.map((item, index) => (
						<div key={index} className='bets_item-x'>
							<span style={{ backgroundColor: getXBackgroundColor(item) }}>
								{item}x
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FullHistoryModal;
