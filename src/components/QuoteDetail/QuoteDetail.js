import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfiguration';

const QuoteDetail = ({ userInfo, loggedIn }) => {
    const [quote, setQuote] = useState(null);
    const [reload, setReload] = useState(false);
    const { id } = useParams();
    let navigate = useNavigate();

    const getQuoteDetail = async () => {
        if (reload) {
            setReload(false);
        } try {
            const response = await fetch(`${API_URL}quotes/${id}`)
            if (response.status === 200){
                const data = await response.json();
                setQuote(data);
            }
        } catch (error){

        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this quote?');
        if (confirm) {
            try {
                const response = await fetch(`${API_URL}quotes/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 204){
                    prompt('You have deleted the quote');
                    navigate('/quotes');
                }
            } catch (error){

            }
        } else {
            return;
        }
    };

    useEffect(() => {
        getQuoteDetail();
    }, [reload]);

    if (!quote) {
        return null;
    }


    return (
        <Container>
        <div>
           <img src={quote.manga_image} />
           <div>
            <h3>Quote: </h3>
            <h2>{quote.quote}</h2>
            <h4>Manga Volume: {quote.manga_volume}</h4>
            </div>
            {userInfo && userInfo.username === quote.owner && (
                <div>
                    <Link to={`/quotes/${id}/edit`}>
                        <button onClick={handleDelete}>Delete</button>
                    </Link>
                </div>
            )} 
        </div>
        </Container>
    );
}

export default QuoteDetail;