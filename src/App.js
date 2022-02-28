import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Characters from './components/Characters/Characters';
import Login from './components/Login/Login';
import API_URL from './apiConfiguration';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import CreateCharacter from './components/CreateCharacter/CreateCharacter';
import CharacterDetail from './components/CharacterDetail/CharacterDetail';
import CharacterEdit from './components/CharacterEdit/CharacterEdit';
import Quotes from './components/Quotes/Quotes';
import QuoteDetail from './components/QuoteDetail/QuoteDetail';
import CreateQuote from './components/CreateQuote/CreateQuote';
import QuoteEdit from './components/QuoteEdit/QuoteEdit';

function App() {
	const navigate = useNavigate();

	const [loggedIn, setLoggedIn] = useState(
		localStorage.getItem('token') ? true : false
	);

	const [userInfo, setUserInfo] = useState(null);

	const handleSetLoggedIn = (token) => {
		localStorage.setItem('token', token);
		setLoggedIn(true);
		return;
	};

	const getUserInfo = async () => {
		try {
			const response = await fetch(API_URL + 'users/me/', {
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				setUserInfo(data);
			} else {
				setUserInfo(null);
				setLoggedIn(false);
				localStorage.clear();
			}
		} catch (error) {}
		return;
	};

	const handleLogout = async () => {
		try {
			const response = await fetch(API_URL + 'token/logout/', {
				method: 'POST',
				body: JSON.stringify(localStorage.getItem('token')),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${localStorage.getItem('token')}`,
				},
			});
			if (response.status === 204) {
				setUserInfo(null);
				setLoggedIn(false);
				localStorage.clear();
			}
		} catch (error) {
			return;
		}
	};

	useEffect(() => {
		if (loggedIn) {
			getUserInfo();
		}
	}, [loggedIn]);

	return (
		<div className='wrapper'>
			<Header
				loggedIn={loggedIn}
				handleLogout={handleLogout}
				userInfo={userInfo}
			/>
			<Routes>
				<Route path='/' element={<Characters />} />
				<Route
					path='/login'
					element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
				/>
				<Route path='/signup' element={<SignUp />} />
				<Route
					path='/characters'
					element={<Characters loggedIn={loggedIn} />}
				/>
				<Route
					path='/characters/new'
					element={<CreateCharacter loggedIn={loggedIn} />}
				/>
				<Route
					path='/characters/:id'
					element={<CharacterDetail userInfo={userInfo} loggedIn={loggedIn} />}
				/>
				<Route 
					path='/character/:id/edit' 
					element={<CharacterEdit />} 
				/>
				<Route
					path='/quotes'
					element={<Quotes loggedIn={loggedIn} />}
				/>
				<Route
					path='/quotes/:id'
					element={<QuoteDetail loggedIn={loggedIn} />}
				/>
				<Route
					path='/characters/:id/quotes/new' 
					element={<CreateQuote />} 
				/>
				<Route
					path='/characters/:characterId/quotes/:quoteId/edit'
					element={<QuoteEdit />} 
				/>
			</Routes>
		</div>
	);
}

export default App;
