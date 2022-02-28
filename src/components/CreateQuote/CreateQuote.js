import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../../apiConfiguration';
import QuoteForm from '../QuoteForm/QuoteForm';

function CreateQuote(props) {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialState = {
        quote: '',
        volume: '',
        image: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(false);

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {...formData, quote_id: id };
        try {
            const response = await fetch(API_URL + 'quotes/', {
                method: 'POST',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            if (response.status === 201){
                const data = await response.json();
                navigate(`/characters/${id}`);
            }
        } catch (error){}
    };

    return (
        <div>
            <h2>Write a Quote</h2>
            <QuoteForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
        </div>
    );
}

export default CreateQuote;