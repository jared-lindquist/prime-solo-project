import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, MenuItem, FormControl, Grid, Paper } from '@mui/material';
import swal from 'sweetalert';


function UserItem() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        dispatch({type: 'GET_DETAILS', payload: store})
    }, [store.details]);

    const [title, setTitle] = useState(store.details.title);
    const [coffee, setCoffee] = useState(store.details.coffee);
    const [roast, setRoast] = useState(store.details.roast_level);
    const [input, setInput] = useState(store.details.input);
    const [output, setOutput] = useState(store.details.output);
    const [comments, setComments] = useState(store.details.comments);
    const [method, setMethod] = useState(store.details.brew_method);
    const [id, setId] = useState(store.details.id);

    const recipeDetails = {
        title: title,
        coffee: coffee,
        roast_level: roast,
        input: input,
        output: output,
        comments: comments,
        brew_method: method,
        id: id
    }


    // console.log('recipe details are:', store.details);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const backToUserBrews = () => {
        history.push('/recipes');
    }

    const handleEdit = () => {
        console.log('handleEdit button clicked', recipeDetails);
        // dispatch({type: 'SET_EDIT_STATE', payload: true});
        dispatch({type: 'EDIT_RECIPE', payload: recipeDetails});
        setOpen(false);
        swal('Recipe Updated!')
        // history.push('/recipes');
    }

    const handleDelete = () => {
        
        dispatch({type: 'DELETE_RECIPE', payload: store.details});
        swal('Recipe deleted')
        history.push('/recipes');
    }


    return (
        <div>
            {/* checking to see correct data in store */}
            {/* {JSON.stringify(store.details)}
            user recipe item details view goes here
            can style this similar to movie saga details view */}
            <h1>
                {store.details.title}
            </h1>
                    <p> Coffee used for this brew: {store.details.coffee}</p>
                    <p>Which is a {store.details.roast_level} roasted coffee brewed on {store.details.brew_method}</p>
                    <p>This brew recipe started with {store.details.input} grams of coffee</p>
                    <p>The finished weight of the brew was {store.details.output} grams.</p>
                    <p>'{store.details.comments}.' </p>
            <br/>
            <br/>
            {/* <Button variant="contained"
                    className='edit'
                    onClick={() => handleEdit(store.details)}
                    >Edit this Brew
            </Button> */}
            <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit this brew
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogContent>
            <DialogContentText>
            Make a typo? Want to update anything? Edit the fields below
            </DialogContentText>
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
                labelId="brew-method"
                id="brew-method"
                value={method}
                label="Brew Method"
                style={{
                    width: 200,
                }}
                onChange={(e) => {
                    console.log("Brew Method", e.target.value)
                    setMethod(e.target.value)
                }}
                
            >
            <InputLabel id="Brew Method">Brew Method</InputLabel>
            <MenuItem value="drip-brewer">Drip Brewer</MenuItem>
            <MenuItem value="espresso">Espresso Machine</MenuItem>
            <MenuItem value="chemex">Chemex</MenuItem>
            <MenuItem value="french-press">French Press</MenuItem>
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
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEdit}>Update Brew</Button>
        </DialogActions>
        </Dialog>
            </div>
            <br/>
            <br/>
            <Button variant="contained"
                    className='delete'
                    onClick={handleDelete}
                    >Delete this Brew
            </Button>
            <br/>
            <br/>
            <Button variant="contained"
                    className='back-to-user-brews'
                    onClick={backToUserBrews}
                    >Back to my Brews
            </Button>

        </div>
    )
}

export default UserItem;