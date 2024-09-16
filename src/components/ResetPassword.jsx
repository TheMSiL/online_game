import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';

const ResetPassword = ({ isReset, setIsReset, formRef, setIsRegister }) => {
	const { showAuthorize, setShowAuthorize } = useContext(AppContext);
	const [sendCode, setSendCode] = useState(false);
	const [approveCode, setApproveCode] = useState(false);
	const [sendEmailRes, setSendEmailRes] = useState(null);
	const [sendCodeRes, setSendCodeRes] = useState(null);
	const [changePassRes, setChangePassRes] = useState(null);

	const passwordsSchema = Yup.object().shape({
		password: Yup.string()
			.matches(
				/^[a-zA-Z0-9]{6,20}$/,
				'Password must be 6-20 characters long and contain only letters and numbers'
			)
			.required('Password is required'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Confirm Password is required'),
	});

	const emailSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
	});

	const validationSchema = approveCode ? passwordsSchema : emailSchema;

	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		isValid,
	} = useFormik({
		initialValues: {
			email: '',
			password: '',
			code: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			if (isValid) {
				if (sendCode) {
					axios
						.post('https://jet-tests.top/code.php', {
							mail: values.email,
							code: values.code,
						})
						.then(res => {
							if (res.data.valid) {
								setSendCodeRes('code approved');
								setTimeout(() => {
									setApproveCode(true);
								}, 1500);
							} else {
								setSendCodeRes('invalid code');
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
				if (approveCode === true) {
					axios
						.post('https://jet-tests.top/change_pass.php', {
							mail: values.email,
							password: values.password,
						})
						.then(res => {
							if (res.data.success) {
								setChangePassRes('password changed');
								setTimeout(() => {
									setIsReset(!isReset);
									setIsRegister(false);
									setApproveCode(!approveCode);
									setSendCode(!sendCode);
								}, 1500);
							} else {
								setChangePassRes('something went wrong');
							}
						})
						.catch(error => {
							console.error(error);
							setChangePassRes('something went wrong');
						});
				}
				if (!sendCode) {
					axios
						.post('https://jet-tests.top/check_user.php', {
							email: values.email,
						})
						.then(res => {
							if (res.data.exists) {
								setSendEmailRes('We send code to your email');
								setSendCode(true);
								console.log('Отправка код на почту');
								setTimeout(() => {
									setSendEmailRes(null);
								}, 1500);
							} else {
								setSendEmailRes('Invalid email');
							}
						})
						.catch(error => {
							console.error(error);
						});
				}
			}
		},
	});

	const getInputClass = field => {
		if (touched[field]) {
			return errors[field]
				? 'authorize_form-input invalid'
				: 'authorize_form-input valid';
		}
		return 'authorize_form-input';
	};

	return (
		<form className='authorize_form' ref={formRef} onSubmit={handleSubmit}>
			<div
				style={{ width: '30px', marginLeft: 'auto' }}
				onClick={() => {
					setShowAuthorize(!showAuthorize);
					setIsReset(false);
				}}
			>
				<span className='header_modal-close'>
					<div className='close_bg hgmBJG'>
						<div className='x'></div>
					</div>
				</span>
			</div>
			<h2>Change password</h2>
			{!sendCode && (
				<>
					<input
						name='email'
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						type='email'
						placeholder='Your email'
						className={getInputClass('email')}
					/>
					{touched.email && errors.email && (
						<span className='error_span'>{errors.email}</span>
					)}
				</>
			)}
			{sendCode && !approveCode && (
				<input
					type='text'
					name='code'
					value={values.code}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Code from e-mail'
					required
					className={getInputClass('code')}
				/>
			)}
			{approveCode && (
				<>
					<input
						type='password'
						name='password'
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='New password'
						className={getInputClass('password')}
					/>
					{touched.password && errors.password && (
						<span className='error_span'>{errors.password}</span>
					)}
					<input
						name='confirmPassword'
						value={values.confirmPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						type='password'
						placeholder='Confirm new password'
						className={getInputClass('confirmPassword')}
					/>
					{touched.confirmPassword && errors.confirmPassword && (
						<span className='error_span'>{errors.confirmPassword}</span>
					)}
				</>
			)}
			{sendEmailRes && <span className='error_span'>{sendEmailRes}</span>}
			{sendCodeRes && <span className='error_span'>{sendCodeRes}</span>}
			{changePassRes && <span className='error_span'>{changePassRes}</span>}
			<button>Change</button>
		</form>
	);
};

export default ResetPassword;
