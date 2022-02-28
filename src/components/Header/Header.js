import { Link } from 'react-router-dom';
import React from 'react';

const Header = ({ loggedIn, handleLogout, userInfo }) => {
	return (
		<div className='header-nav'>
			<Link to='/characters' className='links'>
				<h1 className='nav-title'>Manga Q</h1>
			</Link>
			<nav className='nav-bar'>
				<ul className='nav-ul'>
					<li className='nav-li'>
						{loggedIn ? <Link to='/create'>Create Character</Link> : <></>}
					</li>
					<li className='nav-li'>
						<Link to='/signup'>Sign up</Link>
						<Link to='/login'>Log In</Link>
					</li>
				</ul>
				<div className='main-nav'>{loggedIn ? <></> : <></>}</div>
			</nav>
		</div>
	);
};

export default Header;
