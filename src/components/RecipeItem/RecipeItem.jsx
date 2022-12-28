import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';




function RecipeItem() {
    const history = useHistory();
    const store = useReduxStore();

    console.log('recipe details are: ', store);

    const backToCommunity = () => {
        history.push('/allrecipes');
    }

    return (
        <div>
            full recipe details view goes here
            {/* {JSON.stringify(store)} */}
            <Button variant="contained" 
                    className='back'
                    onClick={backToCommunity}
                    >Back to Community Brews
            </Button>
        </div>
    )
}

export default RecipeItem;