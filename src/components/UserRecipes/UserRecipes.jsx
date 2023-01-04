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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { Collapse } from '@mui/material';
import{ IconButton } from '@mui/material';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

//this function handles the styling of the details expand/collapse in each recipe card
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));


function UserRecipes() {

    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);

    //toggles the boolean value of expanded on click of the IconButton
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //Grabs all recipes for logged in user, renders on page load only once
    useEffect(()=> {
        dispatch({type: 'FETCH_USER_RECIPES'});
    }, []);

    // console.log(store.allRecipes);

    //this function takes the details for the recipe clicked on and sends a dispatch
    //to the details.reducer and navigates user to UserItem component
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
            {/* map over all recipes to display cards */}
            {store.allRecipes.map(recipe  => (
                <Grid 
                key={recipe.id}
                    item xs={4}>
                    <Card key={recipe.id} sx={{ maxWidth: 500, maxHeight:1000 }}>
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
                            <CardContent></CardContent>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>


                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Details:</Typography>
                            <Typography paragraph>
                            {recipe.comments}
                        </Typography>
                        {/* <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and
                            peppers, and cook without stirring, until most of the liquid is absorbed,
                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                            mussels, tucking them down into the rice, and cook again without
                            stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography> */}
                        </CardContent>
                        </Collapse>
                            
                        <CardActions>
                            <Button style={{color: "#6B6BB2"}}
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