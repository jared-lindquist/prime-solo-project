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
      justifyContent="center"
      alignItems="center">
        <Grid container item spacing={3}
            justifyContent="center"
            item xs={12}>
          <h2>{heading}</h2>
        </Grid>
        
        <Grid item xs={3}>
          <h2> How it works:</h2>
          <br/>
          <p>
          1.view sample 
          recipes below
          </p>
          <p>
          2.register to   
          create recipes
          and view all recipes
          </p>
          <p>
            3. More details will be added here
          </p>

        </Grid>

        <Grid 
            item xs={3}>
          <RegisterForm />
        </Grid>
          <Grid item xs={3}
                justify-content="right">
            <h4 >Already a Brewer?</h4>
            <Grid 
                justify-content="center"
                item xs={2}>
                  <center>
                    <Button style={{color: "#FFFFFF",
                                    backgroundColor: "#6B6BB2"}}
                            className="btn btn_sizeSm" onClick={onLogin}>
                      Login
                    </Button>
                  </center>
            </Grid>
          </Grid>
        <Grid item xs={12}></Grid>
        <Grid 
            item xs={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="./images/chemex.jpg"
            alt="something cool"
          />
          <CardContent>
          <Typography>
              <h2>Awesome Ethiopian</h2>
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Light Roasted Chemex
              </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button> */}
            <Button style={{color: "#9999FF"}}size="small">Login or Register to Learn More</Button>
          </CardActions>
        </Card>

        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="./images/french-press.jpg"
              alt="Latte"
            />
            <CardContent>
              <Typography>
              <h2>My First French Press</h2>
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Medium Roasted French Press
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
              <Button style={{color: "#9999FF"}}size="small">Login or Register to Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="./images/14981.jpg"
              alt="coffee"
            />
            <CardContent>
            <Typography>
              <h2>More Espresso Please</h2>
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Medium Roasted Espresso
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button> */}
              <Button style={{color: "#9999FF"}}size="small">Login or Register to Learn More</Button>
            </CardActions>
          </Card>

        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
