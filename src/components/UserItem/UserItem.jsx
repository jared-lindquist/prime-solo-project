import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


function UserItem() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    console.log('recipe details are:', store.details);

    const backToUserBrews = () => {
        history.push('/recipes');
    }

    const handleEdit = () => {
        console.log('handleEdit button clicked');
    }

    const handleDelete = () => {
        
        dispatch({type: 'DELETE_RECIPE', payload: store.details});
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
            <Button variant="contained"
                    className='edit'
                    onClick={handleEdit}
                    >Edit this Brew
            </Button>
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