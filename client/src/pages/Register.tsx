import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from '../hooks/useForm';

import styles from '../styles/pages/register.module.css';

const userRegister = {
	name: '',
	email: '',
	password: '',
};

function RegisterPage() {
	const { name, email, password, handleChange, handleReset } = useForm({
		form: userRegister,
	});
	const { actionAuth, success, error, isLoading } = useAuthContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		actionAuth('register', { name, email, password }).then(
			(data) => data && handleReset(),
		);
	};
	return (
		<>
			<h3 className={styles.subtitle}>Register</h3>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type='text'
					name='name'
					placeholder='Name'
					className={styles.input}
					value={name}
					onChange={handleChange}
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					className={styles.input}
					value={email}
					onChange={handleChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					className={styles.input}
					value={password}
					onChange={handleChange}
					autoComplete='off'
				/>
				<button
					type='submit'
					className={`${styles.btn} btn btn-outline-blue`}
					disabled={isLoading}
				>
					{isLoading ? 'Creating account' : 'register'}
				</button>
				{error && (
					<div className={styles['container-error']}>
						{error.map((err, i) => (
							<p className={styles.error} key={i.toString()}>
								{err.msg}
							</p>
						))}
					</div>
				)}
				{success && (
					<div className={styles['container-success']}>
						<p className={styles.success}>User create successfully</p>
					</div>
				)}
			</form>
		</>
	);
}

export default RegisterPage;
