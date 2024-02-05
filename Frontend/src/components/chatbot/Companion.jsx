import React, { useState } from 'react';
import Anita from '../../assets/img/drake.gif';
import './companion.css';

const Companion = ({ onClick }) => {
  const [isJumping, setIsJumping] = useState(false);

  const handleCompanionClick = () => {
    const jumpHeight = getRandomNumber(20, 50);
    setIsJumping(true);

 
    document.documentElement.style.setProperty('--jump-height', `${jumpHeight}px`);


    setTimeout(() => {
      setIsJumping(false);
    }, 300); 


    onClick();
  };


  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className={`companion ${isJumping ? 'jump' : ''}`} onClick={handleCompanionClick}>
      <img src={Anita} alt="Chat avatar" id="drake" />
    </div>
  );
};

export default Companion;
