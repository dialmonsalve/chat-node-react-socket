import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Notification } from '../chat/Notification';


export const Navbar = () => {
	const { user, logout } = useAuthContext();
	return (
		<nav className="navbar">
			<Link className="navbar__link" to={'/'}>
				<h3 className='navbar__link-home'>ChatApp</h3>
			</Link>
			<h3 className="navbar__logged">
				{user ? `Logged in as ${user.name}` : 'Logged'}
			</h3>
			<ul className="navbar__container">
				{user ? (
					<>
						<Notification />
						<li className="navbar__item">
							<Link onClick={logout} className="navbar__link" to='/login'>
								Logout
							</Link>
						</li>
					</>
				) : (
					<>
						<li className="navbar__item">
							<Link className="navbar__link" to='/login'>
								Login
							</Link>
						</li>
						<li>
							<Link className="navbar__link" to='/register'>
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};
