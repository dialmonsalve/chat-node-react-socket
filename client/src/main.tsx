import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterApp';
import './styles/main/index.css';
import { AuthProvider } from './context/auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
);
