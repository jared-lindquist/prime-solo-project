import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ButtonGroup } from '@mui/material';
import { InputLabel, Select, MenuItem, FormControl, Grid, Paper, FormGroup } from '@mui/material';

import swal from 'sweetalert';
import './UserItem.css';


function UserItem() {
    const params = useParams();
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();
    console.log(store);

    //getting the store on page load
    useEffect(()=> {
        dispatch({type: 'GET_DETAILS', payload: store})
    }, [store.details]);
    
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const [title, setTitle] = useState(store.details.title);
    const [coffee, setCoffee] = useState(store.details.coffee);
    const [roast, setRoast] = useState(store.details.roast_level);
    const [input, setInput] = useState(store.details.input);
    const [output, setOutput] = useState(store.details.output);
    const [comments, setComments] = useState(store.details.comments);
    const [method, setMethod] = useState(store.details.brew_method);
    const [image, setImage] = useState(store.details.image);
    const [id, setId] = useState(store.details.id);

    //storing all the input values to send in the dispatch in the handleEdit function below
    const recipeDetails = {
        title: title,
        coffee: coffee,
        roast_level: roast,
        input: input,
        output: output,
        comments: comments,
        brew_method: method,
        id: id,
        image: image
    }
    //this opens the edit dialog form
    const handleOpenEdit = () => {
    setEditOpen(true);
    };

    //this closes the edit dialog form
    const handleCloseEdit = () => {
    setEditOpen(false);
    };
    //this opens the delete confirmation dialog
    const handleOpenDelete = () => {
        setDeleteOpen(true);
    }
    //this closes the delete confirmation dialog
    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    //This function sends a dispatch to the edit.item.reducer
    //and closes the edit dialog form
    const handleEdit = () => {
        console.log('handleEdit button clicked', recipeDetails);
        // dispatch({type: 'SET_EDIT_STATE', payload: true});
        dispatch({type: 'EDIT_RECIPE', payload: recipeDetails});
        setEditOpen(false);
        swal('Recipe Updated!')
        // history.push('/recipes');
    }

    //this function sends a dispatch to the recipeSaga
    const handleDelete = () => {
        console.log('Delete button clicked', recipeDetails);
        dispatch({type: 'DELETE_RECIPE', payload: store.details});
        swal('Recipe deleted')
        setDeleteOpen(false);
        history.push('/user');
    }

    const handleBackToUser = () => {
        history.push('/user');
    }

    return (
        <div className='recipe-details'>
            <h1 className="title">
                {store.details.title}
            </h1>
            <ButtonGroup>
                <Button style={{color: "#FFFFFF",
                                backgroundColor: "#9999FF"}}
                        variant="contained" 
                        onClick={handleOpenEdit}
                    >Edit this brew
                </Button>
                <Button style={{color: "#F44336",
                                    backgroundColor: "#FFFFFF",
                                    borderColor: "#F44336"}}
                        variant="outlined"
                        className='delete'
                        onClick={handleOpenDelete}
                    >Delete this Brew
                </Button>
                <Button style={{color: "#FFFFFF",
                                backgroundColor: "#6B6BB2"}}
                    variant="contained" 
                    className='back'
                    onClick={handleBackToUser}
                    >Back to My Brews
                </Button>
            </ButtonGroup>
            <br/>
            <br/>
            <br/>
            <img  className="image" src={store.details.image} alt="brew-method-image"
                    height="400" width="400"/>
                <div className="recipe-text">
                    <p> Coffee used for this brew: {store.details.coffee}</p>
                    <p>Which is a {store.details.roast_level} roasted coffee brewed on {store.details.brew_method}</p>
                    <p>This brew recipe started with {store.details.input} grams of coffee</p>
                    <p>The finished weight of the brew was {store.details.output} grams.</p>
                    <p>Full Recipe Details:</p>
                    <p>'{store.details.comments}.' </p>
                </div>
            <br/>
            <br/>
            <div>
                    <Dialog open={editOpen} onClose={handleCloseEdit}>
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
                    <TextField style={{backgroundColor: '#F6F6FD'}}
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
                    <FormControl>
                        <Select style={{backgroundColor: '#F6F6FD'}}
                            required
                            labelId="brew-method"
                            id="brew-method"
                            value={method}
                            label="Brew Method"
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
                    </FormControl>
                    <br/>
                    <p>What coffee did you use? (Roaster and country of origin)</p>
                        <TextField style={{backgroundColor: '#F6F6FD'}}
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
                        <FormGroup>
                            <Select style={{backgroundColor: '#F6F6FD'}}
                                required
                                labelId="roast-level"
                                id="roast-level"
                                value={roast}
                                label="Roast Level"
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
                        </FormGroup>
                        <br/>
                        <p>How many grams of coffee did you start the brew with?</p>
                            <TextField style={{backgroundColor: '#F6F6FD'}}
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
                            <TextField style={{backgroundColor: '#F6F6FD'}}
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
                            <TextField style={{backgroundColor: '#F6F6FD'}}
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
                    <Button style={{color: "#F44336"}}onClick={handleCloseEdit}>Cancel</Button>
                    <Button style={{color: "#4CAF50"}}onClick={handleEdit}>Update Brew</Button>
                </DialogActions>
                </Dialog>
            </div>
                <br/>
                <br/>
                    <Dialog
                        open={deleteOpen}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete this recipe?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDelete}>Cancel</Button>
                            <Button onClick={handleDelete}>
                                Delete Recipe
                            </Button>
                        </DialogActions>
                    </Dialog>
        </div>
    )
}

export default UserItem;