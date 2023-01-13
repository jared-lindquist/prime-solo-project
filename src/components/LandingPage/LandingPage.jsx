import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import './LandingPage.css';
import { Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to How Do You Brew!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
<div>
  <Grid 
      container spacing={2}
      justifyContent="space-evenly"
      alignItems="center">
        <Grid container item spacing={3}
            justifyContent="center"
            item xs={12}>
          <h2 className='heading'>{heading}</h2>
        </Grid>
        
        <Grid item xs={3} >
          <img src="./images/coffee-animated.webp" />
        </Grid>

        <Grid item xs={3}>
          <RegisterForm />
        </Grid>

        <Grid item xs={3}
              align="center">
          <h3 align="center">Already a Brewer?</h3>
          <Button style={{color: "#FFFFFF", backgroundColor: "#6B6BB2"}}
                  className="btn_btn_sizeSm" 
                  align="center"
                  onClick={onLogin}
          >
            Login
          </Button>
          </Grid>

          <Grid item xs={12}></Grid>

          <Grid 
            item xs={3}>
            <Card  className='card' sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="./images/chemex.jpg"
                alt="something cool"
              />
              <CardContent>
                <h2>Awesome Ethiopian</h2>
                <Typography variant="body2" color="text.secondary">
                  Light Roasted Chemex
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{color: "#6B6BB2"}}size="small">Login or Register to Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className='card' sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="./images/french-press.jpg"
                alt="Latte"
              />
              <CardContent>
                <h2>My First French Press</h2>
                <Typography variant="body2" color="text.secondary">
                  Medium Roasted French Press
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{color: "#6B6BB2"}}size="small">Login or Register to Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card className='card' sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image="./images/14981.jpg"
                alt="coffee"
              />
              <CardContent>
                <h2>More Espresso Please</h2>
                <Typography variant="body2" color="text.secondary">
                  Medium Roasted Espresso
                </Typography>
              </CardContent>
              <CardActions>
                <Button style={{color: "#6B6BB2"}}size="small">Login or Register to Learn More</Button>
              </CardActions>
            </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
