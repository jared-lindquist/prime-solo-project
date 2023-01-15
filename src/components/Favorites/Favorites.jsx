import Button from '@mui/material/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader, Grid } from '@mui/material';


function Favorites() {

    const { ID } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    useEffect(() => {
        dispatch({type: 'GET_FAVORITES'})
    }, []);

    const favoriteDetails = (recipe) => {
        console.log('getting favorite details', recipe.fav_recipe_id);

        history.push('/favoriteitem/' + recipe.fav_recipe_id)
    }

    const backToCommunity = () => {
        history.push('/allrecipes');
    }

        return(
            <>
            <h1>Here is where the favorites will be
                displayed
            </h1>
            <br/>
            <Button style={{color: "#FFFFFF", backgroundColor: "#5A5A5A"}}
            variant="contained" 
            className='back'
            onClick={backToCommunity}
        >Back to Community Brews
        </Button>
        <br/>
        <br/>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}
            display="flex"
            justifyContent="center"
            justify="center"
            alignItems="center">
            {/* map over all recipes to display cards */}
            {store.allRecipes.map(recipe => (
                <Grid item xs={2} sm={3} md={3}
                    display="flex"
                    justifyContent="center"
                    justify="center"
                    alignItems="center"
                    key={recipe.fav_recipe_id}
                >
                    <Card sx={{ boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)', }}
                        className='card'
                        key={recipe.fav_recipe_id}
                        sx={{ height: 375, width: 350 }}
                    >
                        <CardActionArea onClick={() => favoriteDetails(recipe)}>
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
            </>
            
        )
}

export default Favorites;