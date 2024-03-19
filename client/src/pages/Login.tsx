import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from '../hooks/useForm';

import styles from '../styles/pages/register.module.css';

const formLogin = {
	email: '',
	password: '',
};
function LoginPage() {
	const { error, success, isLoading, actionAuth } = useAuthContext();

	const { email, password, handleChange, handleReset } = useForm({
		form: formLogin,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		actionAuth('login', { email, password }).then(
			(data) => data && handleReset(),
		);
	};
	return (
		<>
			<h3 className={styles.subtitle}>Login</h3>
			<form onSubmit={handleSubmit} className={styles.form}>
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
					autoComplete='off'
					value={password}
					onChange={handleChange}
				/>
				<button
					type='submit'
					className={`btn ${styles.btn} ${
						isLoading ? `${styles.disabled}` : 'btn-outline-blue'
					}`}
					disabled={isLoading}
				>
					{isLoading ? 'Validating...' : 'login'}
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
						<p className={styles.success}>User login successfully</p>
					</div>
				)}
			</form>
		</>
	);
}

export default LoginPage;
