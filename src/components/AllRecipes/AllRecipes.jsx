import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useReduxStore from '../../hooks/useReduxStore';

function AllRecipes() {

    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_ALL_RECIPES'});
    }, []);

    return (
        <div className='recipe-container'>
            {JSON.stringify({store})}
            <p>List with all recipes from all other users goes here. 
            filter recipes by brew method(drop down) </p> 
        </div>
    )
}

export default AllRecipes;