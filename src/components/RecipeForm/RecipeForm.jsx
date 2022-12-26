import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'; 
import { useState } from 'react';

function RecipeForm() {
    //need to add useStates for all the input fields 
    const [title, setTitle] = useState('');
    const [coffee, setCoffee] = useState('');
    const [roast, setRoast] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [comments, setComments] = useState('');

    return (
        <Box
        component="form"
        alignItems="center"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        margin="auto"
        justifyContent="center"
        >   
        <div>
            <TextField
                required
                id="recipe-title-input"
                label="Recipe Title"
                variant="filled"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <TextField
                required
                id="coffee-input"
                label="Coffee Used"
                variant="filled"
                type="text"
                value={coffee}
                onChange={(e) => setCoffee(e.target.value)}
            />
            <br/>
            <TextField
                required
                id="roast-level"
                label="Light/Medium/Dark Roast?"
                type="text"
                variant="filled"
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
            />
            <br/>
            <TextField
                required
                id="input"
                label="Input in Grams"
                variant="filled"
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br/>
            <TextField
                required
                id="output"
                label="Output in Grams"
                type="number"
                variant="filled"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
            />
            <br/>
            <TextField
                id="comments"
                label="Tasting Notes/Comments"
                type="text"
                variant="standard"
                multiline
                maxRows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <br/>
            <br/>
            <Button
                variant="contained"
            >
            Save this brew
            </Button>
            <br/>
            clicking save navigates to UserRecipes list 
            and sends POST request to DB.
        </div>
</Box> 
    )
}

export default RecipeForm;