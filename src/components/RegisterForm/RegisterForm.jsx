import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Grid} from '@mui/material'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RegisterForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
    setOpen(false);
    history.push('/user')
  };
  const registerUser = (event) => {
  event.preventDefault();
    if (username === '' || password === '') {
      return Swal.fire({
            text: 'Please fill in a username and password to continue',
            // color: '#6B6BB2',
            confirmButtonColor: '#6B6BB2',
            confirmButtonText: 'Got It'
        })
    }
    
    handleClickOpen();

  }; // end registerUser



  return (
    <form className="formPanel">
      {/* <h2>Register User</h2> */}
      <h3 align="center">New To Brew? <br/> Register here:</h3>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div align="center">
        <label htmlFor="username">
          Username:
          <input
            size="15"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div align="center">
        <label htmlFor="password">
          Password:
          <input
            size="15"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        <Grid align="center">
          <Button style={{color: "#FFFFFF",
                        backgroundColor: "#6bb26b"}}
                className="btn" 
                type="submit" 
                name="submit" 
                value="Register"
                onClick={registerUser}
                align="center"
                justifyContent="center"
                >
          Register
        </Button>
        </Grid>
        

        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Can I get a walk through?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Welcome to "How Do You Brew"! 
            <br/>
            <br/>
            Here's what to expect:
            <br/>
            
            When you are done reading this form, you will be directed to your 
            home page, where you can start a new recipe! You will also be able 
            to view recipes created by our other members by clicking on the 
            'Community' tab.
            <br/>
            Here's what you need to get started:
            <br/>
            <br/>
            1. Coffee (duh)
            <br/>
            <br/>
            <img src="./images/coffee.jpg" alt="coffee" />
            <br/>
            <br/>
            2. A scale the measures in grams. If you don't have a coffee scale,
            a simple food scale will do the trick.
            <br/>
            <br/>
            <img src="./images/coffeescale.jpg" alt="coffee scale" /> 
            <br/>
            <br/>
            3. A brew method: The app currently supports Espresso, Drip Brew, 
              Chemex, and French Press. 
            <br/>
            <br/>
            <img src="./images/chemex.jpg" alt="chemex" />
            <br/>
            <br/>
            4. All the details for creating your delicious brew like: brew time, 
              a general idea of grind size (like medium coarse), pouring instructions.
              Be as detailed as you like!
              See this recipe from one of our users as an example:
            <br/>
            <br/>
            <img src="./images/samplerecipe.jpg"/>
            <br/>
            <br/>
            Ready to get brewing?? Click the button below
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
              variant='contained'
              style={{color: "#FFFFFF",
              backgroundColor: "#6bb26b"}} 
              onClick={handleClose}
            >Let's get started!
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </form>
  );
}

export default RegisterForm;
