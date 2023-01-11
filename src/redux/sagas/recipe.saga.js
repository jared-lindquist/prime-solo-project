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

//create new generator function for getDetails to get details page view UserItem
function* getDetails(action) {
    try {
        const details = yield axios.get('/api/userRecipes/' + action.payload);
        console.log('getDetails: ', action.payload);
        console.log(details.data);
        yield put({type: 'SET_DETAILS', payload: details.data})
    }
    catch (error) {
        console.log('error getting details', error);
    }
}
//this function adds an image URL to each new recipe in addRecipe below 
//based on brew_method value
const handleImage = (method) => {
    console.log(method);
    if (method === 'chemex') {
    return "./images/chemex.jpg"
} else if (method === 'espresso') {
    return "./images/espresso.jpg"
} else if (method === 'french-press') {
    return "./images/french-press.jpg"
} else if (method === 'drip-brewer') {
    return "./images/drip-brewer.jpg"
} else {
    return
}
}
//addRecipe* post
function* addRecipe(action) {

    const imageUrl = handleImage(action.payload.method);
    const newPayload = {...action.payload, image: imageUrl}
    
    console.log('in recipe.saga addRecipe', newPayload);
    try {
        yield axios.post('/api/userRecipes', newPayload);
        console.log('new recipe is: ', newPayload);
        yield put({type: 'FETCH_USER_RECIPES'})
    }
    catch (error) {
        console.log('error adding recipe', error)
    }
}
//editRecipe* put
function* editRecipe(action) {

    const imageUrl = handleImage(action.payload.brew_method);

    const newPayload = {...action.payload, image: imageUrl}
    console.log('in recipe.saga editRecipe', action.payload, imageUrl);
    try {
        yield axios.put('/api/userRecipes/' + action.payload.id, newPayload);
        yield put({type: 'SET_DETAILS', payload: action.payload})
    }
    catch(error) {
        console.log('error in editRecipe saga', error);
    }
}
//deleteRecipe* delete
function* deleteRecipe(action) {
    console.log('in deleteRecipe:', action.payload.id);
    try {
        yield axios.delete('/api/userRecipes/' + action.payload.id);
        yield put ({type: 'FETCH_USER_RECIPES'})
    }
    catch(error) {
        console.log('error deleting recipe', error);
    }
}

function* getMethod(action) {
    console.log('in getMethod', action.payload);
    try {
        const method = yield axios.post('/api/userRecipes/method', {brew_method: action.payload})
        console.log('method:', method);
        yield put ({type: 'SET_RECIPES', payload: method.data})

    }
    catch(error) {
        console.log('error getting method', error);
    }
}

function* recipeSaga(action) {
    yield takeLatest('FETCH_ALL_RECIPES', fetchAllRecipes);
    //add takeLatest for add, delete, and edit recipe sagas
    yield takeLatest('ADD_RECIPE', addRecipe);
    yield takeLatest('FETCH_USER_RECIPES', fetchUserRecipes);
    yield takeLatest('DELETE_RECIPE', deleteRecipe);
    yield takeLatest('EDIT_RECIPE', editRecipe);
    yield takeLatest('GET_DETAILS', getDetails);
    yield takeLatest('GET_METHOD', getMethod);
}

export default recipeSaga;