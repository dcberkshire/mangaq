import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfiguration';
import { TextField, FormLabel, Button, Alert } from '@mui/material';

const Login = ({ handleSetLoggedIn }) => {
	const initialFormData = {
		username: '',
		password: '',
	};

	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(false);
    
	const handleChange = (event) => {
		setFormData((previousState) => {
			return { ...previousState, [event.target.id]: event.target.value };
		});
	};

	const _handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(API_URL + 'token/login/', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				handleSetLoggedIn(data.auth_token);
				navigate('/');
			}
		} catch (error) {}
	};
	console.log(formData);
	return (
		<div>
            <h2>Log In</h2>
			<form onSubmit={_handleLogin}>
				<TextField
					autoFocus
					id='username'
                    label='username'
                    variant='standard'
					value={formData.username}
					onChange={handleChange}
				/>
				<TextField
                    autoFocus
					id='password'
                    label='password'
                    variant='standard'
					value={formData.password}
					onChange={handleChange}
				/>
				<Button type='submit'>Login</Button>
			</form>
			{error && (
				<Alert severity='warning'>
					No valid user found with the entered credentials. Please try loggin in
					again or <Link to='/signup'>Sign Up</Link> for an account.
				</Alert>
			)}
		</div>
	);
};

export default Login;
