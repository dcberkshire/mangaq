import { Card, CardContent, CardMedia, Container, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfiguration';


const Quotes = ({ loggedIn }) => {
    const [quotes, setQuotes] = useState([]);

    const getQuotesIndex = async () => {
        try {
            const response = await fetch(API_URL + 'quotes/');
            if (response.status === 200) {
                const data = await response.json();
                setQuotes(data);
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getQuotesIndex();
    }, []);

    if (!quotes.length) {
        return null;
    }

    return (
        <Container maxWidth='sm'>
            <h1>Quotes</h1>
            {loggedIn && (
                <Link to='/quotes/new'>
                    <Button>Add a Quote</Button>
                </Link>
            )}

            {quotes.map((quote) => {
                return (
                    <Link to={`/quotes/${quote.id}`} key={quote.id}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardMedia
                                component='img'
                                height='140'
                                image={quote.manga_image}
                                alt='picture of character in manga'
                            />
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {quote.quote}
                                </Typography>
                                {quote.manga_volume}
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </Container>
    );
}

export default Quotes;