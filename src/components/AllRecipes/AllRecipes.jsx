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
import { Grid} from '@mui/material'

function AllRecipes() {

    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_ALL_RECIPES'});
    }, []);

    return (
        <div className='recipe-container'>
                <h2>All Community Brews</h2>
            {store.recipe.map((recipe, index) => {
                return (
                    <Grid
                        container spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={3}>
                    <Card id={index}
                            sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="./images/chemex.jpg"
                        alt="something cool"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {recipe.comments}
                        </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small">Share</Button> */}
                        <Button size="small">Click to see Details</Button>
                    </CardActions>
                    </Card>
                    </Grid>
                </Grid> 
                )
            })}
            {/* <p>List with all recipes from all other users goes here. 
            filter recipes by brew method(drop down) </p>  */}
        </div>
    )
}

export default AllRecipes;