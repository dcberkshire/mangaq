import { Button } from '@mui/material';

const CharacterForm = ({ handleSubmit, error, character, handleChange, behavior }) => {
    return (
        <div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor='name'>Name: </label>
                <input
                    type='text'
                    name='name'
                    required
                    autoFocus
                    onChange={handleChange}
                    value={character.name}
                />
                <label htmlFor='manga'>Manga: </label>
                <input
                    type='text'
                    name='manga'
                    required
                    autoFocus
                    onChange={handleChange}
                    value={character.manga}
                />
                <label htmlFor='bio'>Bio: </label>
                <input
                    type='text'
                    name='bio'
                    required
                    autoFocus
                    onChange={handleChange}
                    value={character.bio}
                />
                <label htmlFor='character-image'>Character Image</label>
                <input type='file' accept='image/*' name='character-image' />
                <Button type='submit' disabled={error}>
                    {behavior === 'create' && 'Create'}
                    {behavior === 'edit' && 'Edit'}
                    Submit
                </Button>
                {error && (
                    <prompt variant='danger'>
                        Oops, something went wrong. Please try again.
                    </prompt>
                )}
            </form>
        </div>
		);
}

export default CharacterForm;