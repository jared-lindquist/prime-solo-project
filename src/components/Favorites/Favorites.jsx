import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';

function Favorites() {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useReduxStore();

    useEffect(() => {
        dispatch({type: 'GET_FAVORITES'})
    }, []);

    

    const backToCommunity = () => {
        history.push('/allrecipes');
    }

        return(
            <>
            <h1>Here is where the favorites will be
                displayed
            </h1>
            {JSON.stringify(store.details)}
            <br/>
            <Button style={{color: "#FFFFFF", backgroundColor: "#5A5A5A"}}
            variant="contained" 
            className='back'
            onClick={backToCommunity}
        >Back to Community Brews
        </Button>
            </>
            
        )
}

export default Favorites;