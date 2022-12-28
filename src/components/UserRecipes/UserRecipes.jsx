import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useReduxStore from '../../hooks/useReduxStore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid} from '@mui/material'



function UserRecipes() {

    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_USER_RECIPES'});
    }, []);

    return (
        <div>
            user's recipe list goes here
            display recipes as clickable cards, clicking a 
            card navigates to UserItem details page
        </div>
    )
}

export default UserRecipes;