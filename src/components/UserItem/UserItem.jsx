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
    const {ID} = useParams();
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();
    console.log(store);
    console.log("details item id:", ID);

    //getting the store on page load
    useEffect(()=> {
        window.scrollTo(0,0)
        dispatch({type: 'GET_DETAILS', payload: ID})
    }, []);

    useEffect(() => {
        setTitle(store.details[0]?.title);
        setCoffee(store.details[0]?.coffee);
        setRoast(store.details[0]?.roast_level);
        setInput(store.details[0]?.input);
        setOutput(store.details[0]?.output);
        setComments(store.details[0]?.comments);
        setMethod(store.details[0]?.brew_method);
        setImage(store.details[0]?.image);
        setId(store.details[0]?.id);
    }, [store.details])
    
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const [title, setTitle] = useState(store.details[0]?.title);
    const [coffee, setCoffee] = useState(store.details[0]?.coffee);
    const [roast, setRoast] = useState(store.details[0]?.roast_level);
    const [input, setInput] = useState(store.details[0]?.input);
    const [output, setOutput] = useState(store.details[0]?.output);
    const [comments, setComments] = useState(store.details[0]?.comments);
    const [method, setMethod] = useState(store.details[0]?.brew_method);
    const [image, setImage] = useState(store.details[0]?.image);
    const [id, setId] = useState(store.details[0]?.id);

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
        console.log('handleOpenEdit clicked:', recipeDetails);
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
        history.push('/userItem/' + ID);
    }

    //this function sends a dispatch to the recipeSaga
    const handleDelete = () => {
        console.log('Delete button clicked', recipeDetails);
        dispatch({type: 'DELETE_RECIPE', payload: recipeDetails});
        swal({
            text:'Recipe deleted',
            button: {
                color: '#6B6BB2'
            }
        })
        let timerInterval
        setDeleteOpen(false);
        history.push('/user');
    }

    const handleBackToUser = () => {
        history.push('/user');
    }

    return (
        <>
        <div className='recipe-details'>
            <h1 className="title">
                {store.details[0]?.title}
            </h1>
            
            <br/>
            <div className="recipe-text">
                <img  className="image" src={store.details[0]?.image} alt="brew-method-image"
                    height="400" width="400"/>
                    <div className='details-text'>
                        <p> Coffee used for this brew: {store.details[0]?.coffee}
                        <br/>
                        <br/>
                        Which is a {store.details[0]?.roast_level} roasted coffee brewed on {store.details[0]?.brew_method}
                        <br/>
                        <br/>
                        This brew recipe started with {store.details[0]?.input} grams of coffee
                        <br/>
                        <br/>
                        The finished weight of the brew was {store.details[0]?.output} grams.
                        <br/>
                        <br/>
                        Full Recipe Details:
                        <br/>
                        <br/>
                        '{store.details[0]?.comments}' </p>
                        </div>
                    
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
                    <TextField style={{backgroundColor: '#fff'}}
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
                        <Select style={{backgroundColor: '#fff'}}
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
                        <TextField style={{backgroundColor: '#fff'}}
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
                            <Select style={{backgroundColor: '#fff'}}
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
                            <TextField style={{backgroundColor: '#fff'}}
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
                            <TextField style={{backgroundColor: '#fff'}}
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
                            <TextField style={{backgroundColor: '#fff'}}
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
                    <Button 
                        style={{color: "#5A5A5A", backgroundColor: "#FFFFFFF", borderColor: "#5A5A5A"}}
                        variant="outlined"
                        onClick={handleCloseEdit}
                    >Cancel
                    </Button>
                    <Button 
                        variant='contained'
                        style={{color: "#FFFFFF", backgroundColor: "#6bb26b"}}
                        onClick={handleEdit}
                    >Update Brew
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
                
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
                            <Button 
                                style={{color: "#5A5A5A", backgroundColor: "#FFFFFFF", borderColor: "#5A5A5A"}}
                                variant="outlined"
                                onClick={handleCloseDelete}
                            >Cancel
                            </Button>
                            <Button 
                                variant="contained"
                                style={{color: '#FFFFFF', backgroundColor: "#b83d34"}}
                                onClick={handleDelete}
                            >Delete Recipe
                            </Button>
                        </DialogActions>
                    </Dialog>
        </div>
        <div className="button-group">
            <ButtonGroup >
                <Button 
                    style={{color: "#FFFFFF", backgroundColor: "#6B6BB2"}}
                    variant="contained" 
                    onClick={handleOpenEdit}
                >Edit this brew
                </Button>
                <Button 
                    variant="contained"
                    style={{color: '#FFFFFF', backgroundColor: "#b83d34"}}
                    className='delete'
                    onClick={handleOpenDelete}
                >Delete this Brew
                </Button>
                <Button 
                    style={{color: "#FFFFFF", backgroundColor: "#5A5A5A"}}
                    variant="contained" 
                    className='back'
                    onClick={handleBackToUser}
                >Back to My Brews
                </Button>
            </ButtonGroup>
        </div>
        
    </>
    )
}

export default UserItem;