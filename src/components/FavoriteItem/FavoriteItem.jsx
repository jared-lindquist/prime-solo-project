import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import './FavoriteItem.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ButtonGroup } from '@mui/material';
import { InputLabel, Select, MenuItem, FormControl, FormGroup } from '@mui/material';


function FavoriteItem() {

    const { ID } = useParams();
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

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
    }, [store.details]);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: 'GET_DETAILS', payload: ID })
    }, []);

    const [title, setTitle] = useState(store.details[0]?.title);
    const [coffee, setCoffee] = useState(store.details[0]?.coffee);
    const [roast, setRoast] = useState(store.details[0]?.roast_level);
    const [input, setInput] = useState(store.details[0]?.input);
    const [output, setOutput] = useState(store.details[0]?.output);
    const [comments, setComments] = useState(store.details[0]?.comments);
    const [method, setMethod] = useState(store.details[0]?.brew_method);
    const [image, setImage] = useState(store.details[0]?.image);
    const [id, setId] = useState(store.details[0]?.id);
    const [username, setUsername] = useState(store.details[0]?.username);

    const [isFavorite, setIsFavorite] = useState(isFavorite);
    const [deleteOpen, setDeleteOpen] = useState(false);

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

    console.log('recipe details are: ', recipeDetails);

    const backToFavorites = () => {
        history.push('/favorites');
    }

    //this opens the remove from favorites confirmation dialog
    const handleOpenDelete = () => {
        setDeleteOpen(true);
    }
    //this closes the remove from favorites confirmation dialog
    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const handleDelete = () => {
        console.log('Delete button clicked', recipeDetails);
        dispatch({ type: 'REMOVE_FAVORITE', payload: recipeDetails });
        dispatch({type: 'UPDATE_FAVORITE', payload: store.details})

        Swal.fire({
            text: 'Recipe Removed From Favorites',
            // color: '#6B6BB2',
            confirmButtonColor: '#6B6BB2',
            confirmButtonText: 'Got It'
        })
        setDeleteOpen(false);
        history.push('/favorites');
    }


    return (
        <div className='recipe-details'>
            <h1 className='title'>
                {store.details[0]?.title}
            </h1>
            <h2>
                Brewed by {store.details[0]?.username}
            </h2>
            <div className='recipe-text'>
                <img className="image" src={store.details[0]?.image} alt="brew-method-image"
                    height="400" width="400" />
                <br />
                <br />
                <Dialog
                    open={deleteOpen}
                    onClose={handleCloseDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Remove From Favorites"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ color: "#5A5A5A", backgroundColor: "#FFFFFFF", borderColor: "#5A5A5A" }}
                            variant="outlined"
                            onClick={handleCloseDelete}
                        >Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{ color: '#FFFFFF', backgroundColor: "#b83d34" }}
                            onClick={handleDelete}
                        >Remove From Favorites
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className='details-text'>
                    <p> Coffee used for this brew: <b>{store.details[0]?.coffee}</b>
                        <br />
                        <br />
                        Roast Level:  <b>{store.details[0]?.roast_level} roast</b>
                        <br />
                        <br />
                        Brew Method: <b>{store.details[0]?.brew_method}</b>
                        <br />
                        <br />
                        Starting dose:  <b>{store.details[0]?.input} grams</b>
                        <br />
                        <br />
                        Final Output: <b>{store.details[0]?.output} grams</b>
                        <br />
                        <br />
                        Full Recipe Details:
                        <br />
                        <br />
                        {store.details[0]?.comments} </p>
                </div>
            </div>
            <Button style={{ color: "#FFFFFF", backgroundColor: "#5A5A5A" }}
                variant="contained"
                className='back'
                onClick={backToFavorites}
            >Back to My Favorite Brews
            </Button>
            <Button
                variant="contained"
                style={{ color: '#FFFFFF', backgroundColor: "#b83d34" }}
                onClick={handleOpenDelete}
                    >Remove From Favorites
            </Button>
        </div>
    )
}

export default FavoriteItem;