import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import './RecipeItem.css';


function RecipeItem() {

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
        setIsFavorite(store.details[0]?.is_favorite)
    }, [store.details]);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: 'GET_DETAILS', payload: ID });
    }, []);

    useEffect(() => {
        dispatch({ type: 'GET_FAVORITES' });
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
    const [isFavorite, setIsFavorite] = useState(store.details[0]?.is_favorite);

    // console.log('recipe details are: ', store.details, store.details[0]?.is_favorite);

    const backToCommunity = () => {
        history.push('/allrecipes');
    }

    const addToFavorites = () => {
        console.log('in ReciptItem addToFavorites', store.details);
        // setIsFavorite(true);
        console.log(store.details[0]?.is_favorite);
        dispatch({ type: 'ADD_TO_FAVORITES', payload: store.details });
        dispatch({type: 'UPDATE_FAVORITE', payload: store.details})
        
        Swal.fire({
            text: 'Added to Favorites!',
            confirmButtonColor: '#6B6BB2',
            confirmButtonText: 'Nice!'
        })
    }

    const checkFavorite = () => {
        console.log(store.allRecipes.some( item => item.id === ID))
        if (store.allRecipes.some()) {

        }
        return false;
    }
const buttonText = isFavorite ? "Already in Your Favorites" : "Add To Favorites";

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
                        '{store.details[0]?.comments}' </p>
                </div>
            </div>
            <Button style={{ color: "#FFFFFF", backgroundColor: "#5A5A5A" }}
                variant="contained"
                className='back'
                onClick={backToCommunity}
            >Back to Community Brews
            </Button>
                <Button 
                    disabled={false}
                    variant="contained"
                    style={{ color: "#FFFFFF", backgroundColor: "#6B6BB2"}}
                    onClick={addToFavorites}
                    >{buttonText}
                </Button>
        </div>
    )
}

export default RecipeItem;