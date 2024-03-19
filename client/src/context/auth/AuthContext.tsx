import { createContext } from 'react';
import { Errors, Login, User } from '../../types';

type Action = 'register' | 'login';

type DataBackendUser<T> = {
	errors: Errors;
	data: T | null;
};

interface ContextProps {
	user: User | null;
	error: null | Errors;
	success: boolean;
	isLoading: boolean;

	actionAuth: (
		action: Action,
		data: Login | User,
	) => Promise<DataBackendUser<User > | undefined >;
	logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
