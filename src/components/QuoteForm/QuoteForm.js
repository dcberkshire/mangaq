import { FormControl, FormGroup, FormLabel, Button, Alert } from '@mui/material';

function QuoteForm({handleSubmit, formData, handleChange, error}) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId='quote'>
                    <FormLabel>Quote</FormLabel>
                    <FormControl
                        required
                        autoFocus
                        type='text'
                        name='quote'
                        value={formData.quote}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='volume'>
                    <FormLabel>Manga Volume</FormLabel>
                    <FormControl 
                        required
                        autoFocus
                        type='text'
                        name='volume'
                        value={formData.manga_volume}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type='submit' disabled={error}>Submit</Button>
                {error && (
                    <Alert severity='warning'>Ooops, something went wrong. Please try again.</Alert>
                )}
            </form>
        </div>
    );
}

export default QuoteForm;