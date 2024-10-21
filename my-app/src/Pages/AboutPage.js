import React from 'react';
import './AboutPage.css';
import colby from '../Components/Assets/colby.jpg';
import jacob from '../Components/Assets/jacob.jpg';
import zach from '../Components/Assets/zach.jpg';
import kaleigh from '../Components/Assets/kaleigh.jpg';

const AboutPage = () => {
  return (
    <div className="AboutUs">
      <h1>About Us!</h1>
      <p>We're a group of Senior computer science students at
        Louisiana Tech University. This website is a project for
        our CSC 403 - Software Engineering and Design class!
        We hope Commodle can one day become something truly useful!
      </p>
      <div className="title">
        <h2>Developers:</h2>
        <p>Here we are!</p>
      </div>
      <div className="Devs">
        <div>
          <img src={kaleigh} alt="Kaleigh Powell" />
          <h3>Kaleigh Powell</h3>
          <h6>Computer Science -- Cybersecurity</h6>
        </div>
        <div>
          <img src={colby} alt="Colby Willman" />
          <h3>Colby Willman</h3>
          <h6>Computer Science -- Cybersecurity</h6>
        </div>
        <div>
          <img src={zach} alt="Zachary Dulaney" />
          <h3>Zachary Dulaney</h3>
          <h6>Computer Science -- Game Design</h6>
        </div>
        <div className="centered-profile">
          <img src={jacob} alt="Jacob Yee" />
          <h3>Jacob Yee</h3>
          <h6>Computer Science -- Computer Engineering</h6>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;