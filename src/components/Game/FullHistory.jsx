import { useState } from 'react';
import FullHistoryModal from './FullHistoryModal';
import full_history from '../../assets/full_history.svg';

const FullHistory = ({history}) => {
	const [showHistoryModal, setShowHistoryModal] = useState(false);
	return (
		<>
			<div
				className='show_full-history'
				onClick={() => setShowHistoryModal(!showHistoryModal)}
			>
				<div className='show_full-history-content'>
					<img src={full_history} />
				</div>
			</div>
			{showHistoryModal && (
				<FullHistoryModal
					history={history}
					setShowHistoryModal={setShowHistoryModal}
					showHistoryModal={showHistoryModal}
					his
				/>
			)}
		</>
	);
};

export default FullHistory;
