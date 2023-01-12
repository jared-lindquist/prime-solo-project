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
import { CardActionArea, CardHeader, Grid} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import './UserRecipes.css';


function UserRecipes() {

    const {ID} = useParams();
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    //Grabs all recipes for logged in user, renders on page load only once
    useEffect(()=> {
        window.scrollTo(0,0)
        dispatch({type: 'FETCH_USER_RECIPES'});
    }, []);

    //this function takes the details for the recipe clicked on and sends a dispatch
    //to the details.reducer and navigates user to UserItem component
    const recipeDetails = (recipe) => {
        //confirming button click pulls data correctly
        console.log('clicked on a recipe', recipe.id);
        //navigates user to the recipe details page
        history.push('/useritem/' + recipe.id)
    }

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}
            display="flex"
            justifyContent="center"
            justify="center"
            alignItems="center"> 
            {/* map over all recipes to display cards */}
            {store.allRecipes.map(recipe  => (
                <Grid   item xs={2} sm={3} md={3} 
                        display="flex"
                        justifyContent="center"
                        justify="center"
                        alignItems="center"
                        key={recipe.id}
                >
                    <Card sx={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',}}
                        className='card' 
                        key={recipe.id} 
                        sx={{ height: 375, width:350 }}
                        >
                        <CardActionArea onClick={ () => recipeDetails(recipe)}>
                            <CardMedia
                                component="img"
                                height="250"
                                //this pulls the image url from DB
                                image={recipe.image}
                                alt="brew method image"
                            />
                            <CardContent>
                                    <h2>
                                    {recipe.title}
                                    </h2>
                                    <Typography variant="body2" color="text.secondary">
                                    {recipe.roast_level} roast {recipe.brew_method}
                                    </Typography>
                                </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                ))
            }
            </Grid>
    )
}

export default UserRecipes;