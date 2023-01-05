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
            <Grid   container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                    
            > 
            {/* <Grid item xs={12}></Grid> */}
            {/* map over all recipes to display cards */}
            {store.allRecipes.map(recipe  => (
                <Grid item xs={3}>
                    <Card key={recipe.id} sx={{ height: 400, width:350 }}>
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
    )
}

export default UserRecipes;