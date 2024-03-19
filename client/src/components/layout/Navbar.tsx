import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Notification } from '../chat/Notification';

import styles from '../../styles/components/navbar.module.css';

export const Navbar = () => {
	const { user, logout } = useAuthContext();
	return (
		<nav className={styles.navbar}>
			<Link className={styles.link} to={'/'}>
				<h3 className={styles['link-home']}>ChatApp</h3>
			</Link>
			<h3 className={styles.logged}>
				{user ? `Logged in as ${user.name}` : 'Logged'}
			</h3>
			<ul className={styles.container}>
				{user ? (
					<>
						<Notification />
						<li className={styles.item}>
							<Link onClick={logout} className={styles.link} to='/login'>
								Logout
							</Link>
						</li>
					</>
				) : (
					<>
						<li className={styles.item}>
							<Link className={styles.link} to='/login'>
								Login
							</Link>
						</li>
						<li>
							<Link className={styles.link} to='/register'>
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};
