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
import { CardActionArea, CardHeader, Grid} from '@mui/material'
import { useHistory } from 'react-router-dom';
import './AllRecipes.css';


function AllRecipes() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_ALL_RECIPES'});
    }, []);

    console.log(store.allRecipes);

    const recipeDetails = (recipe) => {
        //console.log to confirm onClick
        console.log('clicked on a recipe', recipe);
        //collects recipe info to store locally
        dispatch({type: 'SET_DETAILS', payload: recipe})
        //navigates to the item details page
        history.push(`/recipeitem`)
    }


    return (
        <div>
            <Grid  
            container spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="row"
            >
            
                <h2 className='header'>All Community Brews</h2>
                <Grid item xs={12}></Grid>

                    {store.allRecipes.map(recipe  => (
                    <Grid item xs={3}>
                        <Card id={recipe.id} sx={{ maxWidth: 500, maxHeight:500 }}>
                        <CardHeader title={recipe.title}
                        >
                        </CardHeader>
                            <CardMedia
                                component="img"
                                height="250"
                                image={recipe.image}
                                alt="brew method image"
                            />
                            <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            Brewed by {recipe.username}. Brew Method {recipe.brew_method}
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

export default AllRecipes;