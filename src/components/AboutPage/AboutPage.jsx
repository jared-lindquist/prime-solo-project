import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p> How Do You Brew? is an application that lets you save all of your <br/>favorite brew recipes in one place to go back to anytime. 
          <br/>
          Your favorite recipes are at your fingertips forever.
        </p>
        <h3>Technologies used:</h3>
        <ul>
          <li>HTML/CSS</li>
          <li>Javascript</li>
          <li>React.js</li>
          <li>Redux/Saga</li>
          <li>Material UI</li>
          <li>PostgreSQL</li>
          <li>Postico 2</li>
          <li>Postman</li>
          <li>Node.js</li>
        </ul>
        <h4>Special Thanks to:</h4>
        <ul>
          <li>Liz Kerber, Dane Smith, and Key Clark</li>
          <li>Shawl cohort mates</li>
          <li>Friends and family</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
