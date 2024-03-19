import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Login';

import RegisterPage from '../pages/Register';
import { Layout } from '../components/layout/Layout';

import { Authenticated, UnAuthorized } from './private/UnAuthorized';
import ChatPage from '../pages/Chat';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<UnAuthorized>
						<ChatPage />,
					</UnAuthorized>
				),
			},

			{
				path: 'login',
				element: (
					<Authenticated>
						<LoginPage />,
					</Authenticated>
				),
			},
			{
				path: 'register',
				element: (
					<Authenticated>
						<RegisterPage />,
					</Authenticated>
				),
			},
		],
	},
];

export const router = createBrowserRouter(routes);
