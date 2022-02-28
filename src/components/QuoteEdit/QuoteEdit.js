import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuoteForm from '../QuoteForm/QuoteForm';
import API_URL from '../../apiConfiguration';

function QuoteEdit(props) {
    const {characterId, quoteId} = useParams();
    let navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(false);

    async function getQuoteData(){
        try {
            const response = await fetch(`${API_URL}quotes/${quoteId}`)
            const data = await response.json();
            setFormData(data);
        } catch (error){}
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value })
    };

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}quotes/${quoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 200) {
                navigate(`/characters/${characterId}`);
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getQuoteData();
    }, []);

    return (
        <div>
            <h2>Edit Quote</h2>
            {formData && (<QuoteForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error} 
            />
            )}
        </div>
    );
}

export default QuoteEdit;