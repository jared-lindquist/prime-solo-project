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
import { CardActionArea, CardHeader, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom';
import { InputLabel, Select, MenuItem, FormControl, Paper, FormGroup } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import './AllRecipes.css';


function AllRecipes() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    const [method, setMethod] = useState('');
    const [recipes, setRecipes] = useState(store.allRecipes);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch({ type: 'FETCH_ALL_RECIPES' });
    }, []);

    console.log(store.allRecipes);

    const recipeDetails = (recipe) => {
        //console.log to confirm onClick
        console.log('clicked on a recipe', recipe);
        //navigates to the item details page
        history.push(`/recipeitem/` + recipe.id)
    }

    const seeFavorites = () => {
        history.push('/favorites')
    }

    const focusedColor = "#6B6BB2";
    //creating style to handle focus color of input fields
    const useStyles = makeStyles({
        root: {
            // input label when focused
            "& label.Mui-focused": {
                color: focusedColor
            },
            "& select.Mui-focused": {
                color: focusedColor
            },
            // focused color for input with variant='standard'
            "& .MuiInput-underline:after": {
                borderBottomColor: focusedColor
            },
            // focused color for input with variant='filled'
            "& .MuiFilledInput-underline:after": {
                borderBottomColor: focusedColor
            },
            // focused color for input with variant='outlined'
            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                    borderColor: focusedColor
                }
            }
        }
    });

    const classes = useStyles();

    return (
        <div key={method}>
            <Grid
                container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="space-evenly"
                alignItems="center"
            >
                <h2 className='header'>All Community Brews</h2>
                <Grid item xs={12}></Grid>
                <Grid
                    item xs={12}
                    display="flex"
                    justifyContent="center"
                    justify="center"
                    alignItems="center"
                >
                    <TextField className={classes.root}
                        select
                        style={{ backgroundColor: '#fffff', width: 400 }}

                        labelId="brew-method"
                        id="brew-method"
                        value={method}
                        label="Filter By Brew Method"
                        onChange={(e) => {
                            console.log("Brew Method", e.target.value)
                            setMethod(e.target.value)
                            dispatch({ type: 'GET_METHOD', payload: e.target.value })

                        }}
                    >
                        <InputLabel id="Brew Method">Brew Method</InputLabel>
                        <MenuItem value="drip-brewer">Drip Brewer</MenuItem>
                        <MenuItem value="espresso">Espresso Machine</MenuItem>
                        <MenuItem value="chemex">Chemex</MenuItem>
                        <MenuItem value="french-press">French Press</MenuItem>
                    </TextField>
                </Grid>
                <br />
                <Grid item xs={12}
                    display="flex"
                    justifyContent="center"
                    justify="center"
                    alignItems="center">
                    <Button style={{ backgroundColor: "#6bb26b" }}
                        variant="contained"
                        onClick={seeFavorites}
                    >
                        See My Favorites
                    </Button>
                </Grid>
                <Grid item xs={12}></Grid>
                <br />
                <br />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}
                    display="flex"
                    justifyContent="center"
                    justify="center"
                    alignItems="center"
                    marginTop={20}>
                    {store.allRecipes.map(recipe => (
                        <Grid item xs={2} sm={3} md={3}
                            display="flex"
                            justifyContent="space-evenly"
                            justify="center"
                            alignItems="center"
                            key={recipe.id}
                        >
                            <Card className="card" key={recipe.id} sx={{ height: 375, width: 350 }}>
                                <CardActionArea onClick={() => recipeDetails(recipe)}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={recipe.image}
                                        alt="brew method image"
                                    />
                                    <CardContent>
                                        <h2>
                                            {recipe.title}
                                        </h2>
                                        <Typography variant="body2" color="text.secondary">
                                            Brewed by {recipe.username}. {recipe.roast_level} roast {recipe.brew_method}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default AllRecipes;