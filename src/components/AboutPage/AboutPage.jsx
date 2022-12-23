import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>I spent the last 8 years being a coffee enthusiast and coffee professional, and if there is one thing I hated about my time in coffee 
          it was how hard it was to keep track of recipes. I can not tell you how many notebooks full of recipes I wanted to reuse I have lost over the years. 
          Enter How Do You Brew?, an application that lets you save all of your favorite brew recipes in one place to go back to anytime. Your favorite 
          recipes are at your fingertips forever.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
