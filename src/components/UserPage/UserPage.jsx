import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, MenuItem, FormControl, Grid, Paper } from '@mui/material';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import UserRecipes from '../UserRecipes/UserRecipes';

//I need to use this component as my user dashboard page 
//(user home page view in Figma)

function UserPage() {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  //getting the user data from the redux store
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [coffee, setCoffee] = useState('');
  const [roast, setRoast] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [comments, setComments] = useState('');
  const [method, setMethod] = useState('');

  const recipeDetails = {
    title: title,
    coffee: coffee,
    roast: roast,
    input: input,
    output: output,
    comments: comments,
    method: method,
}

  //getting all the recipes for the logged in user
  useEffect(() => {
    dispatch({type: 'FETCH_USER_RECIPES'})
  }, []);

  const handleNewBrew = () => {
    setOpen(true);
    // history.push('/recipeform');
  }
//button submits new recipe to DB
  const handleSubmit = () => {
    console.log('handleSubmit button clicked', recipeDetails);
    dispatch({type: 'ADD_RECIPE', payload: recipeDetails});
    swal('You added a brew!');
    setTitle('');
    setCoffee('');
    setRoast('');
    setInput('');
    setOutput('');
    setComments('');
    setOpen(false);
  }
//navigates user to AllRecipes list component, showing all recipes from all users
  const handleAllRecipes = () => {
    history.push('/allrecipes');
  }

  const handleClose = () => {
    setOpen(false);
    };

  return (
    <div className="container">
      <Grid
        container spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        
          <Grid 
                container item spacing={4}
                item xs={12}
                justifyContent="center">
            <h2>Welcome {user.username}!</h2>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid 
                container item spacing={3}
                item xs={3}>
            <Button 
                  variant="contained"
                  onClick={handleNewBrew}
                  >Start a new brew
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Recipe</DialogTitle>
            
            <DialogContent>
            <DialogContentText>
            
            </DialogContentText>
            <div>
            <FormControl 
                justify="center"
                style={{minWidth: 120}}>
            <TextField
                required
                id="recipe-title-input"
                label="Give this recipe a title:"
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
                label="Brew Method:"
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
            <br/>
            <TextField
                required
                id="coffee-input"
                label="What coffee did you use? (Roaster and country of origin)"
                variant="filled"
                type="text"
                value={coffee}
                onChange={(e) => setCoffee(e.target.value)}
            />
            <br/>
            <br/>
            <TextField
                required
                id="roast-level"
                label="Was this a Light, Medium, or Dark roast?"
                type="text"
                variant="filled"
                value={roast}
                onChange={(e) => setRoast(e.target.value)}
            />
            <br/>
            <br/>
                
            <TextField
                required
                id="input"
                label="How many grams of coffee did you start the brew with?"
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
                label="Output in grams"
                type="number"
                variant="filled"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
            />
            <br/>
            <p>Please fill in details for this brew recipe below</p>
            <TextField
                id="comments"
                label="How long did it take? Any special instructions?"
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
            <Button onClick={handleSubmit}>Add Recipe</Button>
        </DialogActions>
        </Dialog>
          </Grid>
            
            <br/>
            <br/>
          <Grid 
                container item spacing={3}
                item xs={3}>
            <Button 
                  variant="contained"
                  onClick={handleAllRecipes}>view community brews
            </Button>
          </Grid>
            <Grid
                container item spacing={4}
                item xs={12}
                justifyContent="center"
                >
                <h3>
                  Here are all your brew recipes:
                </h3>
            </Grid>
            <UserRecipes />
      </Grid>


    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
