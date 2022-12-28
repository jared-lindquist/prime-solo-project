//this component needs to be updated as action types are added

const recipeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return action.payload;
        case 'SET_USER_RECIPES':
            return action.payload;
        default:
            return state;
    }
};

export default recipeReducer;