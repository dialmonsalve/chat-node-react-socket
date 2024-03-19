import { useAuthContext } from '../../hooks/useAuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	children: ReactNode;
}

export const UnAuthorized = ({ children }: Props) => {
	const { user } = useAuthContext();

	return !user ? <Navigate to={'/login'} replace /> : children;
};

export const Authenticated = ({ children }: Props) => {
	const { user } = useAuthContext();

	return user ? <Navigate to={'/'} replace /> : children;
};
