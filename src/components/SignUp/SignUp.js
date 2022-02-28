import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfiguration';
import { Alert, Button, getTextFieldUtilityClass, TextField } from '@mui/material';

const SignUp = () => {
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        re_password: '',
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleChange = (event) => {
        setFormData((previousState) => {
            return { ...previousState, [event.target.name]: event.target.value };
        });
    };

    const _handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL + 'users/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.status === 201){
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handlePasswordMatch = (event) => {
        if (formData.password !== formData.re_password) {
            setError(true);
        } else {
            setError(false);
        }
    };


    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={_handleSignup}>
                <TextField
                    onChange={handleChange}
                    autoFocus
                    id='username'
                    label='username'
                    variant='standard'
                    value={formData.username} 
                />
                <TextField
                    onChange={handleChange}
                    autoFocus
                    id='email'
                    value={formData.email}
                    label='email'
                    variant='standard' 
                />
                <TextField
                    onChange={handleChange}
                    autoFocus
                    id='password'
                    label='password'
                    value={formData.password}
                    variant='standard'
                />
                <TextField
                    onChange={handleChange}
                    onBlur={handlePasswordMatch}
                    autoFocus
                    id='password'
                    label='re_password'
                    value={formData.re_password}
                    variant='standard'
                />
                <Button type='submit' disabled={error}>Sign Up</Button>
                {error && <Alert severity='error'>Passwords must match!</Alert>}
                {success && (
                    <Alert severity='success'>
                        User has successfully been created! You will be redirected to log in. If you are not automatically redirected, please click{' '}{<Link to='/login'>Here</Link>}.
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default SignUp;