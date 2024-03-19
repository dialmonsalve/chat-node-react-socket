import { ReactNode, useCallback, useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { baseUrl, postRequest } from '../../services/api';
import { Errors, Login, User } from '../../types';

type Action = 'register' | 'login';

interface Props {
	children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>({} as User);

	const [error, setError] = useState<Errors | null>(null);

	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem('user');

		user ? setUser(JSON.parse(user)) : setUser(null);
	}, []);

	const actionAuth = useCallback(
		async (action: Action, data: User | Login) => {
			setIsLoading(true);
			setError(null);
			setSuccess(false);

			try {
				const resp = await postRequest<User>({
					url: `${baseUrl}/users/${action}`,
					body: JSON.stringify(data),
				});

				if (resp?.errors) {
					setError(resp?.errors);
					return;
				}
				localStorage.setItem('user', JSON.stringify(resp?.data));

				setUser(resp?.data);
				setSuccess(true);

				setTimeout(() => {
					setSuccess(false);
				}, 2000);
				return resp;
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		[error, success],
	);

	const logout = useCallback(() => {
		localStorage.removeItem('user');
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				error,
				isLoading,
				success,

				actionAuth,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
