import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this is where our fetchRecipes* saga will live
function* fetchAllRecipes(action) {
    console.log('in fetchRecipes');
    try {
        const recipes = yield axios.get('/api/recipes');
        console.log('[recipeSaga] recipes are: ', recipes);
        yield put({type: 'SET_RECIPES', payload: recipes.data});
    }
    catch(error) {
        console.log('Error in fetchRecipes, recipe.saga', error)
    }
}

function* fetchUserRecipes(action) {
    // console.log('in fetchUserRecipes', action.payload);
    try {
        const userRecipes = yield axios.get('/api/userRecipes');
        console.log('user recipes are: ', userRecipes);
        yield put({type: 'SET_USER_RECIPES', payload: userRecipes.data})
    }
    catch(error) {
        console.log('error getting user recipes', error);
    }
}

//addRecipe* post
function* addRecipe(action) {
    console.log('in recipe.saga addRecipe', action.payload)
    try {
        yield axios.post('/api/recipes', action.payload);
        console.log('new recipe is: ', action.payload);
        yield put({type: 'FETCH_ALL_RECIPES'})
    }
    catch (error) {
        console.log('error adding recipe', error)
    }
}
//editRecipe* put

//deleteRecipe* delete

function* recipeSaga(action) {
    yield takeLatest('FETCH_ALL_RECIPES', fetchAllRecipes);
    //add takeLatest for add, delete, and edit recipe sagas
    yield takeLatest('ADD_RECIPE', addRecipe);
    yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
}

export default recipeSaga;