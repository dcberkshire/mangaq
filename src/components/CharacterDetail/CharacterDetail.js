import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container } from '@mui/material'
import API_URL from '../../apiConfiguration';

const CharacterDetail = ({ userInfo, loggedIn }) => {
    const [character, setCharacter] = useState(null);
    const [reload, setReload] = useState(false);
    const { id } = useParams();
    let navigate = useNavigate();

    const getCharacterDetail = async () => {
        if (reload) {
            setReload(false);
        } try {
            const response = await fetch(`${API_URL}characters/${id}`)
            if (response.status === 200){
                const data = await response.json();
                setCharacter(data);
            }
        } catch (error){

        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this character?');
        if (confirm) {
            try {
                const response = await fetch(`${API_URL}characters/${id}`, {
                    method: 'DELETE',
                    headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 204){
                    prompt('You have deleted the character');
                    navigate('/characters');
                }
            } catch (error){}
        } else {
            return;
        }
    };

    const handleQuoteDelete = async (quoteId) => {
        const confirm = window.confirm('Are you sure you want to delete this quote?');
        if (confirm) {
            try {
                const response = await fetch(`${API_URL}quotes/${quoteId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    }
                });
                if (response.status === 204){
                    setReload(true);
                }
            } catch (error) {}
        } else {
            return;
        }
    }

    useEffect(() => {
        getCharacterDetail();
    }, [reload]);

    if (!character) {
        return null;
    }
    
    return (
        <Container>
            <div>
                <img src={character.character_image}/>
                <div>
                    <h2>{character.name}</h2>
                </div>
                {userInfo && userInfo.username === character.owner && (
                    <div>
                        <Link to={`/characters/${id}/edit`}>
                            <Button onClick={handleDelete}>Delete</Button>
                        </Link>
                    </div>
                )}
            </div>
            <h3>Bio: {character.bio}</h3>
            <h2>Quotes:</h2>
            {!character.quotes.length && <p>No quotes yet!</p>}
            {loggedIn && (
                <Link to={`/characters/${character.id}/quotes/new`}>
                    <Button>Write a quote</Button>
                </Link>
            )}
            {character.quotes.length > 0 && character.quotes.map((quote) => {
                return (
                    <Link to={`/quotes/${quote.id}`} key={quote.id}>
                        <h4>{quote.quote}</h4>
                    </Link>
                )
            })}
        </Container>
    )

};

export default CharacterDetail;