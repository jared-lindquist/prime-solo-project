import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


function RecipeItem() {
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch({type: 'SET_DETAILS'})
    // }, []);

    console.log('recipe details are: ', store.details);
    
    const backToCommunity = () => {
        history.push('/allrecipes');
    }

    return (
        <div>
            {/* {JSON.stringify(store.details)} */}
            <h1>
                This brew is brought to you by {store.details.username}
            </h1>
                {/* <img src={store.details.image}/> */}
                <h3>
                    {store.details.title}
                </h3>
                    <p> Coffee used for this brew: {store.details.coffee}</p>
                    <p>Which is a {store.details.roast_level} roasted coffee</p>
                    <p>{store.details.username} brewed with a {store.details.brew_method}</p>
                    <p>They started this brew with {store.details.input} grams of coffee</p>
                    <p>The finished weight of the brew was {store.details.output} grams.</p>
                    <p>Comments left by {store.details.username}:</p>
                    <p>'{store.details.comments}.' </p>
                    <p>Thanks for checking out my brew!</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button style={{color: "#FFFFFF",
                                backgroundColor: "#6B6BB2"}}
                    variant="contained" 
                    className='back'
                    onClick={backToCommunity}
                    >Back to Community Brews
            </Button>
        </div>
    )
}

export default RecipeItem;