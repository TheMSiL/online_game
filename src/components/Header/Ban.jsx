import { useState } from 'react';
const Ban = () => {
	const [close, setClose] = useState(false);
	return (
		<div className='overlay_ban' style={close ? { display: 'none' } : {}}>
			<div className='message_cont'>
				<p className='error'>You was banned!</p>
				<div>
					<span onClick={() => setClose(!close)} className='message_close'>x</span>
				</div>
				<p className='ban_message'>
					Если вы считаете это решение ошибочным или у вас есть дополнительные
					вопросы, можете обратиться в нашу{' '}
					<a href='https://t.me/maksim4kkk'>поддержку</a>
				</p>
			</div>
		</div>
	);
};

export default Ban;
