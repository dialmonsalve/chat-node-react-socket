import { useAuthContext } from '../hooks/useAuthContext';
import { useForm } from '../hooks/useForm';

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
			<h3 className="login__subtitle">Register</h3>
			<form onSubmit={handleSubmit} className="login__form">
				<input
					type='text'
					name='name'
					placeholder='Name'
					className="login__input"
					value={name}
					onChange={handleChange}
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					className="login__input"
					value={email}
					onChange={handleChange}
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					className="login__input"
					value={password}
					onChange={handleChange}
					autoComplete='off'
				/>
				<button
					type='submit'
					className="login__btn btn btn-outline-blue"
					disabled={isLoading}
				>
					{isLoading ? 'Creating account' : 'register'}
				</button>
				{error && (
					<div className='login__container-error'>
						{error.map((err, i) => (
							<p className="login__error" key={i.toString()}>
								{err.msg}
							</p>
						))}
					</div>
				)}
				{success && (
					<div className='login__container-success'>
						<p className="login__success">User create successfully</p>
					</div>
				)}
			</form>
		</>
	);
}

export default RegisterPage;
