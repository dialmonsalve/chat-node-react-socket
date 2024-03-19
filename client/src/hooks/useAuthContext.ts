import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context || context === undefined)
		throw new Error('Context is not used inside the parent components');

	return context;
};
