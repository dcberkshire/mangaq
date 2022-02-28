import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfiguration';
import {
	Button,
	Card,
	Container,
	CardMedia,
	CardContent,
	Typography,
} from '@mui/material';

// display all characters with manga they are from
const Characters = ({ loggedIn }) => {
	const [characters, setCharacters] = useState([]);

	const getCharactersIndex = async () => {
		try {
			const response = await fetch(API_URL + 'characters/');
			if (response.status === 200) {
				const data = await response.json();
				setCharacters(data);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getCharactersIndex();
	}, []);

	if (!characters.length) {
		return null;
	}

	return (
		<Container maxWidth='sm'>
			<h1>Characters</h1>
			{loggedIn && (
				<Link to='/characters/new'>
					<Button>Add a Character</Button>
				</Link>
			)}

			{characters.map((character) => {
				return (
					<Link to={`/characters/${character.id}`} key={character.id}>
						<Card sx={{ maxWidth: 500 }}>
							<CardMedia
								component='img'
								height='140'
								image={character.character_image}
								alt='picture of character'
							/>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									{character.name}
								</Typography>
								{character.manga}
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</Container>
	);
};

export default Characters;
