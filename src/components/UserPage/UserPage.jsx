import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

//I need to use this component as my user dashboard page 
//(user home page view in Figma)



function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    dispatch({type: 'FETCH_USER_RECIPES'})
  }, []);

  const handleNewBrew = () => {
    history.push('/recipeform');
  }

  const handleUserBrews = () => {
    history.push('/recipes');
  }

  const handleAllRecipes = () => {
    history.push('/allrecipes');
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* <LogOutButton className="btn" /> */}
      User Dashboard goes here
            display a card view of most recent brew
            <button onClick={handleNewBrew}>Start a new brew</button>
            <button onClick={handleUserBrews}>View All my brews</button>
            <button onClick={handleAllRecipes}>view community brews</button>
            
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
