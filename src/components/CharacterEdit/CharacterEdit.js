import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfiguration';
import CharacterForm from '../CharacterForm/CharacterForm';

function CharacterEdit(props) {
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(false);
    const { id } = useParams();
    let navigate = useNavigate();

    const getCharacterDetail = async () => {
        try {
            const response = await fetch(`${API_URL}characters/${id}`);
            if (response.status === 200){
                const data = await response.json();
                setCharacter(data);
            }
        } catch (error){

        }
    };

    const handleChange = (event) => {
        setCharacter({...character, [event.target.name]: event.target.value });
    }

    const handleCharacterEdit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        try {
            const response = await fetch(API_URL + `characters/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: data,
            });
            if (response.status === 200){
                navigate(`/characters/${id}`);
            }
        } catch (error){

        }
    };

    useEffect(() => {
        getCharacterDetail();
    }, []);

    if (!character) {
        return null;
    }
    return (
        <div>
            <h2>Edit Character</h2>
            <CharacterForm error={error} character={character} handleSubmit={handleCharacterEdit} handleChange={handleChange} behavior='edit' />
        </div>
    );
}

export default CharacterEdit;