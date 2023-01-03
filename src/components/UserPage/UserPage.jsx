import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CardActionArea, Grid} from '@mui/material';
import Button from '@mui/material/Button';
import UserRecipes from '../UserRecipes/UserRecipes';

//I need to use this component as my user dashboard page 
//(user home page view in Figma)

function UserPage() {

  const dispatch = useDispatch();
  //getting the user data from the redux store
  const user = useSelector((store) => store.user);
  const history = useHistory();

  //getting all the recipes for the logged in user
  useEffect(() => {
    dispatch({type: 'FETCH_USER_RECIPES'})
  }, []);

  const handleNewBrew = () => {
    history.push('/recipeform');
  }
//button navigates user to all users recipes list component UserRecipes
  const handleUserBrews = () => {
    history.push('/recipes');
  }
//navigates user to AllRecipes list component, showing all recipes from all users
  const handleAllRecipes = () => {
    history.push('/allrecipes');
  }

  return (
    <div className="container">
      <Grid
        container spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        
          <Grid 
                container item spacing={4}
                item xs={12}
                justifyContent="center">
            <h2>Welcome {user.username}!</h2>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid 
                container item spacing={3}
                item xs={3}>
            <Button 
                  variant="contained"
                  onClick={handleNewBrew}>Start a new brew</Button>
          </Grid>
            
            <br/>
            <br/>
          <Grid 
                container item spacing={3}
                item xs={3}>
            <Button 
                  variant="contained"
                  onClick={handleAllRecipes}>view community brews</Button>
          </Grid>
            <Grid
                container item spacing={4}
                item xs={12}
                justifyContent="center"
                >
                <h3>
                  Here are all your brew recipes:
                </h3>
            </Grid>
            <UserRecipes />
      </Grid>


    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
