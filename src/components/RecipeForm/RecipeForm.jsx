import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'; 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { InputLabel, Select, MenuItem, FormControl, Grid, Paper } from '@mui/material';

function RecipeForm() {
    const history = useHistory();

    const dispatch = useDispatch();
    //need to add useStates for all the input fields 
    const [title, setTitle] = useState('');
    const [coffee, setCoffee] = useState('');
    const [roast, setRoast] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [comments, setComments] = useState('');
    const [method, setMethod] = useState('');

    //storing the input values from the form component to send to saga/reducer/DB
    const recipeDetails = {
        title: title,
        method: method,
        coffee: coffee,
        roast: roast,
        input: input,
        output: output,
        comments: comments
    }

    const handleSave = () => {
        console.log('in handle save', recipeDetails);
        if (recipeDetails.title === '' || recipeDetails.method === '' || 
        recipeDetails.coffee === '' || recipeDetails.roast === '' ||
        recipeDetails.input === '' || recipeDetails.output === '') {
            return swal('Please fill in required fields to submit')
        }
        dispatch({type: 'ADD_RECIPE', payload: recipeDetails});
        swal('You added a brew!');
        setTitle('');
        setCoffee('');
        setRoast('');
        setInput('');
        setOutput('');
        setComments('');
        history.push('./user')
    }

    return ( 
        <div>
            <FormControl 
                justify="center"
                style={{minWidth: 120}}>

            <p>Give this recipe a title:</p>

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

            <p>What brew method did you use?</p>

            <Select
                required
                labelId="roast-level"
                id="roast-level"
                value={roast}
                label="Roast Level"
                style={{
                    width: 200,
                }}
                onChange={(e) => {
                    console.log("Roast Level", e.target.value)
                    setRoast(e.target.value)
                }}
            >
                <InputLabel id="Roast Level">Roast Level</InputLabel>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
            </Select>

            <br/>

            <p>What coffee did you use? (Roaster and country of origin)</p>

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

            <p>Was this a Light, Medium, or Dark roast?</p>

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
            <p>How many grams of coffee did you start the brew with?</p>
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
            <p>Once the brew was complete, how much coffee did you end up with?</p>
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
            <p>Please fill in details for this brew recipe below</p>
            <TextField
                id="comments"
                label="Tasting Notes/Comments"
                type="text"
                variant="filled"
                multiline
                maxRows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            </FormControl>
            <br/>
            <br/>
            <Button onClick={handleSave}
                variant="contained"
            >
            Save this brew
            </Button>
            <br/>
            {/* clicking save navigates to UserRecipes list 
            and sends POST request to DB. */}
        </div>
    )
}

export default RecipeForm;