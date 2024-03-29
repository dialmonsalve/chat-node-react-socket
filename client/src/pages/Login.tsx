import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from '../hooks/useForm';

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
			<h3 className='login__subtitle'>Login</h3>
			<form onSubmit={handleSubmit} className='login__form'>
				<input
					type='email'
					name='email'
					placeholder='Email'
					className='login__input'
					value={email}
					onChange={handleChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					className='login__input'
					autoComplete='off'
					value={password}
					onChange={handleChange}
				/>
				<button
					type='submit'
					className={`btn login__btn ${
						isLoading ? 'login__disabled' : 'btn-outline-blue'
					}`}
					disabled={isLoading}
				>
					{isLoading ? 'Validating...' : 'login'}
				</button>
				{error && (
					<div className='login__container-error'>
						{error.map((err, i) => (
							<p className='login__error' key={i.toString()}>
								{err.msg}
							</p>
						))}
					</div>
				)}
				{success && (
					<div className='login__container-success'>
						<p className='login__success'>User login successfully</p>
					</div>
				)}
			</form>
		</>
	);
}

export default LoginPage;
