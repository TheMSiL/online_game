import { useState, useEffect, useRef } from 'react';
import rules from '../../assets/header/rules.svg';
import rulesintro1 from '../../assets/header/rules-intro1.png';
import rulesintro2 from '../../assets/header/rules-intro2.png';
import rulesintro3 from '../../assets/header/rules-intro3.png';

const HeaderRules = ({ setOnOverlay }) => {
	const headerRef = useRef(null);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop } = headerRef.current;
			if (scrollTop === 0) {
				setIsScrolled(false);
			} else {
				setIsScrolled(true);
			}
		};

		headerRef.current.addEventListener('scroll', handleScroll);
	}, []);
	return (
		<div className='overlay_content header_menurules-content header_limits_content'>
			<div className='header_limits-content-top'>
				<div className='header_limits-content-top--info'>
					<img src={rules} />
					<h2>Правила игры</h2>
				</div>
				<div onClick={() => setOnOverlay(false)}>
					<span className='header_modal-close'>
						<div className='close_bg hgmBJG'>
							<div className='x'></div>
						</div>
					</span>
				</div>
			</div>
			<div className='header_menurules-info'>
				Lucky Jet – новейшее азартное развлечение которое подойдет новому
				поколению игроков. Ты можешь выиграть в несколько раз больше буквально
				за несколько секунд! Lucky Jet устроен на схеме которую можно проверить
				и которая в настоящий момент считается единственной реально работающей
				гарантией честности в индустрии азартных игр.
			</div>
			<div
				ref={headerRef}
				className='header_menurules-container'
				style={{
					maskImage: isScrolled
						? 'none'
						: 'linear-gradient(to top, transparent 0%, black 50%)',
				}}
			>
				<div className='header_menurules-intro'>
					<div className='header_menurules-intro-item'>
						<img src={rulesintro1} />
						<div className='header_menurules-intro-text'>
							Введите нужную сумму и нажмите кнопку СТАВКА
						</div>
					</div>
					<div className='header_menurules-intro-item'>
						<img src={rulesintro2} />
						<div className='header_menurules-intro-text'>
							Следи как твой Счастливчик Джо планирует а коэффициент растет
						</div>
					</div>
					<div className='header_menurules-intro-item'>
						<img src={rulesintro3} />
						<div className='header_menurules-intro-text'>
							Выводи прежде чем Счастливчик Джо исчезнет и выиграй в X раз
							больше!
						</div>
					</div>
				</div>
				<p className='header_menurules--text'>
					Однако не забывайте что у вас есть ограничения по времени. Вам нужно
					вывести средства до того как улетит Счастливчик Джо иначе вы потеряете
					свою ставку. Игра в Lucky Jet — азарт в чистом виде! Здесь вы рискуете
					и побеждаете. Все зависит от вас!
				</p>
				<div className='header_menurules--rules'>
					<h3>Как играть и какие правила?</h3>
					<ul>
						<li>
							Чтобы сделать ставку нужно выбрать желаемую сумму и нажать на
							кнопку «Ставка».
						</li>
						<li>
							При этом нет нужды ограничивать себя только одной ставкой за раз.
							Вы можете делать две ставки одновременно используя как левую так и
							правую панель ставки.
						</li>
						<li>
							Чтобы вывести выигрыш нужно нажать кнопку «Вывод». Ваш выигрыш
							складывается из совокупности вашей ставки умноженной на множитель
							кэшаута.
						</li>
						<li>
							Если не сделать Вывод до того как Счастливчик Джо улетит то ставка
							будет потеряна.
						</li>
					</ul>
				</div>
				<div className='header_menurules--rules'>
					<h3>Автоставка и Автовывод</h3>
					<ul>
						<li>
							Автоматическую Ставку можно активировать на панели любой ставки
							если поставить галочку в строчке «Автоставка». В таком случае
							ставки делаются автоматически. Тем не менее чтобы вывести выигрыш
							все равно необходимо нажимать кнопку «Вывод» для каждого раунда.
						</li>
						<li>
							Если желаете полностью автоматизировать игру то имеется
							возможность и настройки автоматического вывода выигрыша. Для этого
							необходимо активировать на панели ставки «Автовывод». Тогда
							средства будут автоматически выводиться при достижении заданного
							вами коэффициента.
						</li>
					</ul>
				</div>
				<div className='header_menurules--rules'>
					<h3>Интерфейс нашей игры</h3>
					<h5>Лайв Ставки и Статистика</h5>
					<ul>
						<li>
							Слева (если использовать мобильный интерфейс то под панелью
							ставок) находится панель «Лайв Ставки». На ней отображаются ставки
							которые были сделаны в текущем раунде.
						</li>
						<li>
							Панели «Мои ставки» содержит информацию о сделанных ставках и
							выводе средств за все время игры.
						</li>
						<li>
							Панель «Топ» содержит игровую статистику. Тут можно изучить
							выигрыши других игроков как по сумме так и по коэффициенту
							обналичивания. Так можно увидеть самые большие коэффициенты в
							раунде.
						</li>
					</ul>
					<h5>Внутриигровой чат</h5>
					<ul>
						<li>
							Справа (если использовать мобильный интерфейс то в правом верхнем
							углу) находится панель общего чата. Он предназначен для общения с
							другими игроками. Кроме того в чате автоматически выкладываются
							сведения о получении крупных выигрышей.
						</li>
						<li>
							Во внутриигровом чате запрещена любая реклама (например ссылки на
							сторонние ресурсы группы или каналы в социальных сетях или
							мессенджерах сигналы о предполагаемом исходе раундов и т.п.).
							Использование рекламных сообщений в качестве ника пользователя
							также запрещена. В случае нарушения пользователь может быть
							отправлен во временный или постоянный бан.
						</li>
					</ul>
					<h5>Работа с техническими проблемами</h5>
					<ul>
						<li>
							Оператор не несет ответственности за потерю ставки по причине
							разрыва интернет-соединения. Рекомендуем играть при наличии
							стабильного соединения.
						</li>
						<li>
							Если же неисправность возникнет на игровом оборудовании либо
							игровом программном обеспечении то все ставки и выплаты будут
							аннулированы. При это ставки возмещаются пострадавшим игрокам в
							полном объеме в течение 1 часа.
						</li>
					</ul>
				</div>
			</div>
			<div className='header_menurules-finish'>Играй и выигрывай</div>
		</div>
	);
};

export default HeaderRules;
