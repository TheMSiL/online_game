import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import { getRandomColor } from '../helpers';
import ResetPassword from './ResetPassword';

const Authorize = () => {
	const { showAuthorize, setShowAuthorize, isAuthorize, setIsAuthorize } =
		useContext(AppContext);
	const [isRegister, setIsRegister] = useState(true);
	const [isReset, setIsReset] = useState(false);
	const [registerResponse, setRegisterResponse] = useState(null);
	const [loginResponse, setLoginResponse] = useState(null);
	const [success, setSuccess] = useState(false);

	const formRef = useRef(null);

	const loginValidationSchema = Yup.object({
		login: Yup.string()
			.matches(/^\S*$/, 'Логин не должен содержать пробелов')
			.matches(
				/^[^\s]*[a-zA-Z0-9_-]+[^\s]*$/,
				'Только буквы латинского алфавита и цифры'
			)
			.min(4, 'Логин должен быть не менее 4 символов')
			.max(20, 'Логин должен быть не более 20 символов')
			.required('Это поле обязательно'),
		password: Yup.string()
			.matches(
				/^[a-zA-Z0-9]{6,20}$/,
				'Только буквы латинского алфавита и цифры (минимум 6 символов)'
			)
			.required('Это поле обязательно'),
		referal_code: Yup.string()
			.matches(/^\d+$/, 'Только цифры без пробелов')
			.optional(),
	});

	const registerValidationSchema = Yup.object({
		...loginValidationSchema.fields,
		email: Yup.string()
			.email('Неверный адрес электронной почты')
			.matches(
				/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
				'Неверный адрес электронной почты'
			)
			.required('Это поле обязательно'),
	});

	const validationSchema = isRegister
		? registerValidationSchema
		: loginValidationSchema;

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		isValid,
		resetForm,
	} = useFormik({
		initialValues: {
			login: '',
			email: '',
			password: '',
			referal_code: '',
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			if (isValid) {
				if (isRegister) {
					axios
						.post(
							'https://jet-tests.top/reg.php',
							{
								mail: values.email,
								login: values.login,
								password: values.password,
								referal_code: values.referal_code,
								referal_id: referalId,
								color: getRandomColor(),
							},
							{
								headers: {
									'Content-Type': 'application/json',
								},
							}
						)
						.then(response => {
							if (response.data.status === 1) {
								setRegisterResponse('Недопустимый логин');
							} else if (response.data.status === 2) {
								setRegisterResponse('Недопустимый e-mail');
							} else {
								setSuccess(true);
								setTimeout(() => {
									resetForm();
									setIsRegister(!isRegister);
									setRegisterResponse(null);
									setSuccess(false);
								}, 1000);
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
				if (!isRegister) {
					axios
						.post('https://jet-tests.top/login.php', {
							login: values.login,
							password: values.password,
						})
						.then(res => {
							if (res.data.exists === true) {
								setSuccess(true);
								axios
									.post('https://jet-tests.top/user.php', {
										login: values.login,
									})
									.then(res => {
										const userData = {
											...res.data.user_data,
											login: values.login,
										};
										localStorage.setItem(
											'userLuckyJet',
											JSON.stringify(userData)
										);
									})
									.then(() => window.location.reload())
									.catch(error => {
										console.error(error);
									});
								setTimeout(() => {
									resetForm();
									setIsAuthorize(!isAuthorize);
									setShowAuthorize(!showAuthorize);
									setLoginResponse(null);
								}, 1000);
							} else {
								setLoginResponse('Пользователь не существует');
								setTimeout(() => {
									setLoginResponse(null);
									resetForm();
								}, 2000);
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
			}
		},
	});

	const getUserIdFromUrl = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const referalId = urlParams.get('referal_id');
		return referalId ? referalId : '-';
	};
	const referalId = getUserIdFromUrl() || '-';

	useEffect(() => {
		const handleClickOutsideMenu = event => {
			if (!formRef.current?.contains(event.target)) {
				setShowAuthorize(false);
				resetForm();
			}
		};

		document.addEventListener('mousedown', handleClickOutsideMenu);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideMenu);
		};
	}, []);

	const getInputClass = field => {
		if (touched[field]) {
			return errors[field]
				? 'authorize_form-input invalid'
				: 'authorize_form-input valid';
		}
		return 'authorize_form-input';
	};

	return (
		<>
			{showAuthorize && (
				<div className='overlay flex'>
					{isReset ? (
						<ResetPassword
							isReset={isReset}
							formRef={formRef}
							setIsRegister={setIsRegister}
							setIsReset={setIsReset}
						/>
					) : (
						<form
							className='authorize_form'
							ref={formRef}
							onSubmit={handleSubmit}
						>
							<div
								style={{ width: '30px', marginLeft: 'auto' }}
								onClick={() => {
									setShowAuthorize(false);
									resetForm();
								}}
							>
								<span className='header_modal-close'>
									<div className='close_bg hgmBJG'>
										<div className='x'></div>
									</div>
								</span>
							</div>
							<h2>{isRegister ? 'Регистрация' : 'Логин'}</h2>
							<input
								name='login'
								value={values.login}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Логин'
								type='text'
								className={getInputClass('login')}
							/>
							{touched.login && errors.login && (
								<span className='error_span'>{errors.login}</span>
							)}
							{isRegister && (
								<input
									name='email'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Почта'
									type='email'
									className={getInputClass('email')}
								/>
							)}
							{touched.email && errors.email && (
								<span className='error_span'>{errors.email}</span>
							)}
							<input
								name='password'
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Пароль'
								type='password'
								className={getInputClass('password')}
							/>
							{touched.password && errors.password && (
								<span className='error_span'>{errors.password}</span>
							)}
							{isRegister && (
								<input
									name='referal_code'
									value={values.referal_code}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Реферальный код'
									type='text'
									className={getInputClass('referal_code')}
								/>
							)}
							{touched.referal_code && errors.referal_code && (
								<span className='error_span'>{errors.referal_code}</span>
							)}

							{!isRegister && (
								<span
									onClick={() => setIsReset(!isReset)}
									className='reset_password'
								>
									Сбросить пароль
								</span>
							)}
							{registerResponse && (
								<span className='error_span'>{registerResponse}</span>
							)}
							{success && (
								<span className='greenBTN' style={{ fontSize: '14px' }}>
									Добро пожаловать!
								</span>
							)}
							{loginResponse && (
								<span className='error_span'>{loginResponse}</span>
							)}
							<button>{isRegister ? 'Регистрация' : 'Логин'}</button>
							<p>
								{isRegister ? 'Уже есть аккаунт ?' : 'Нет аккаунта ?'}{' '}
								<span
									onClick={() => {
										setIsRegister(!isRegister);
										resetForm();
									}}
								>
									{isRegister ? 'Логин' : 'Регистрация'}
								</span>{' '}
							</p>
						</form>
					)}
				</div>
			)}
		</>
	);
};

export default Authorize;
