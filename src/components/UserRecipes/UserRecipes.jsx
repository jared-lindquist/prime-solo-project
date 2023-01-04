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
import { useHistory } from 'react-router-dom';



function UserRecipes() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_USER_RECIPES'});
    }, []);

    // console.log(store.allRecipes);

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
            <Grid item xs={12}></Grid>
            {store.allRecipes.map(recipe  => (
                <Grid 
                key={recipe.id}
                    item xs={4}>
                    <Card key={recipe.id} sx={{ maxWidth: 500, maxHeight:500 }}>
                        <CardHeader title={recipe.title}
                                    subheader={recipe.brew_method}
                        >

                        </CardHeader>
                            <CardMedia
                                component="img"
                                height="250"
                                //this pulls the image url from DB
                                image={recipe.image}
                                alt="brew method image"
                            />
                            <CardContent>

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