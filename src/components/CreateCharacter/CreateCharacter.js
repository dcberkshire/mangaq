import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import CharacterForm from '../CharacterForm/CharacterForm';
import API_URL from '../../apiConfiguration';


const CreateCharacter = ({ loggedIn }) => {
    const initialCharacterData = {
        name: '',
        manga: '',
        bio: '',
        character_image: '',
    };

    const navigate = useNavigate();
    const [newCharacter, setNewCharacter] = useState(initialCharacterData);
    const handleChange = (event) => {
        setNewCharacter((previousState) => {
            return { ...previousState, [event.target.id]: event.target.value };
        });
    };

    const createCharacter = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        try {
            const response = await fetch(API_URL + 'characters/', {
                method: 'POST',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
                body: data,
            });
            if (response.status === 201){
                const data = await response.json();
                navigate(`/characters/${data.id}`);
            }
        } catch (error) {

        }
    };

    return (
        <div>
            <h2>Add a Character</h2>
            <CharacterForm
                handleSubmit={createCharacter}
                handleChange={handleChange}
                character={newCharacter}
                behavior='create'
            />
        </div>
    );
};

export default CreateCharacter;