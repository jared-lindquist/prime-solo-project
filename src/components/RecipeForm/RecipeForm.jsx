import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function RecipeForm() {

    return (
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >   
        <div>
            <TextField
                required
                id="recipe-title-input"
                label="Recipe Title"
                variant="filled"
                type="text"
            />
            <br/>
            <TextField
                required
                id="coffee-input"
                label="Coffee Used"
                variant="filled"
                type="text"
            />
            <br/>
            <TextField
                required
                id="roast-level"
                label="Light/Medium/Dark Roast?"
                type="text"
                variant="filled"
            />
            <br/>
            <TextField
                required
                id="input"
                label="Input in Grams"
                variant="filled"
                type="number"
            />
            <br/>
            <TextField
                required
                id="output"
                label="Output in Grams"
                type="number"
                variant="filled"
            />
            <br/>
            <TextField
                id="comments"
                label="Tasting Notes/Comments"
                type="text"
                variant="standard"
                multiline
                maxRows={4}
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