import React, { useState } from 'react';
import './LabDoor.css'; // I will create this

const LabDoor = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for the animation to finish before unmounting
    setTimeout(() => {
      onOpen();
    }, 2000); // 2 second animation
  };

  return (
    <div className={`door-container ${isOpen ? 'opening' : ''}`}>
      <div className="door-half left-half"></div>
      <div className="door-half right-half"></div>
      
      {!isOpen && (
        <button className="enter-button" onClick={handleOpen}>
          ACCESS LAB
        </button>
      )}
    </div>
  );
};

export default LabDoor;
