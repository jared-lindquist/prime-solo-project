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

function AllRecipes() {

    const store = useReduxStore();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: 'FETCH_ALL_RECIPES'});
    }, []);

    return (
        <div>
            <Grid  
            container spacing={2}
            justifyContent="center"
            alignItems="center"
            direction="row"
            >
            
            <h2>All Community Brews</h2>
            <Grid item xs={12}></Grid>

            {store.recipe.map(recipe  => (
                <Grid item xs={3}>
                    <Card  id={recipe.id} sx={{ maxWidth: 225, maxHeight:325 }}>
                        <CardActionArea>
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
                            {recipe.comments}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                ))
            }
            </Grid>
        </div>
    )
}

export default AllRecipes;