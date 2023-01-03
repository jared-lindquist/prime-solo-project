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
import { CardActionArea, Grid} from '@mui/material';
import { useHistory } from 'react-router-dom';



function UserRecipes() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_USER_RECIPES'});
    }, []);

    const recipeDetails = (recipe) => {
        //confirming button click pulls data correctly
        console.log('clicked on a recipe', recipe);
        //collects recipe info to store locally
        dispatch({type: 'SET_DETAILS', payload: recipe});
        //navigates user to the recipe details page
        history.push('/useritem')
    }

    return (
        <div>
            {/* {JSON.stringify(store)} */}
            <Grid  
            container spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="row"
            >
            
            {/* <h2>All {store.user.username}'s Brews</h2> */}
            <Grid item xs={12}></Grid>

            {store.allRecipes.map(recipe  => (
                <Grid 
                key={recipe.id}
                    item xs={3}>
                    <Card key={recipe.id} sx={{ maxWidth: 200, maxHeight:400 }}>
                        <Typography>
                            {/* Brewed by: {recipe.username} */}
                        </Typography>
                            <CardMedia
                                component="img"
                                height="150"
                                image="./images/chemex.jpg"
                                alt="something cool"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                            {recipe.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {/* {recipe.comments} */}
                            </Typography>
                            </CardContent>
                        <CardActions>
                            <Button 
                                size="medium"
                                onClick={ () => recipeDetails(recipe)}
                                >See Full Recipe
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))
            }
            </Grid>
        </div>
    )
}

export default UserRecipes;