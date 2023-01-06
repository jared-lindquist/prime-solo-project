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
import { useHistory } from 'react-router-dom';

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

    
    handleClickOpen();

  }; // end registerUser



  return (
    <form className="formPanel">
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
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
        <Button style={{color: "#FFFFFF",
                        backgroundColor: "#6bb26b"}}
                className="btn" 
                type="submit" 
                name="submit" 
                value="Register"
                onClick={registerUser}
                >
          Register
        </Button>

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
            Here's what to expect:
            <br/>
            When you are done reading this form, you will be directed to your 
            home page, where you can start a new recipe! You will also be able 
            to view recipes created by our other members.
            <br/>
            Here's what you need:
            <br/>
            1. Coffee (duh)<br/>
            2. A scale the measures in grams. If you don't have a coffee scale<br/>
               a simple food scale will do the trick.<br/>
            3. A brew method: The app currently supports Espresso, Drip Brew, 
               Chemex, and French Press. <br/>
            4. All the details for creating your delicious brew like: brew time, 
               a general idea of grind size (like medium coarse), pouring instructions.
               Be as detailed as you like!<br/>
            ** Add more here as needed: image? styling?

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color: "#b2b26b"}} onClick={handleClose}
            >Let's get started!
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </form>
  );
}

export default RegisterForm;
