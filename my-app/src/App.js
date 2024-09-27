import React, { useState } from 'react';
import Popup from 'reactjs-popup';


const PromptPopup = () => {
  const [name, setName] = useState('');


  return (
    <Popup trigger={<button>Enter Name</button>} position="right center">
      <div>
        <label>Your Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>You entered: {name}</p>
      </div>
    </Popup>
  );
};


export default PromptPopup;