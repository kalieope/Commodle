import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../firebaseConfig";
import axios from "axios";
import "../main.py";

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  header: {
    textAlign: 'center',
    color: '#333'
  },
  reviewList: {
    listStyleType: 'none',
    padding: '0'
  },
  reviewItem: {
    borderBottom: '1px solid #ddd',
    padding: '10px 0'
  },
  reviewRating: {
    color: '#ff9900'
  },
  form: {
    marginTop: '20px'
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  formInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  formTextarea: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  formButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};



function checkuser() {
  if (!auth.currentUser) {
    console.error("No authenticated user");
    return false;
  } else {
    return true;
  }
}

  
const Review = () => {
  const location = useLocation();
  const [reviews] = useState([]);
  const [Rating, setRating] = useState('');
  const [Review_content, setText] = useState('');
  const { bathroomID } = location.state || {} ;
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/reviews");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Rating:", Rating);
    console.log("content:", Review_content);
    console.log("bath id:", bathroomID);
    try {
      if (checkuser()) {
        const Account_email = auth.currentUser.email;
        const response = await axios.post("http://localhost:8000/reviews/",{
          Account_email,
          Rating: parseInt(Rating),
          Review_content,
          Bathroom_id: parseInt(bathroomID)
      });
        handleClick();
        console.log(response.data);
      }
    } catch (error) {
      console.error("There was an error submitting review.", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Reviews</h2>
      <ul style={styles.reviewList}>
        {reviews.map((review, index) => (
          <li key={index} style={styles.reviewItem}>
            <div style={styles.reviewRating}>{'★'.repeat(review.rating)}</div>
            <div>{review.Review_content}</div>
          </li>
        ))}
      </ul>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.formLabel}>Author - {auth.currentUser.email}</label>
        <label style={styles.formLabel}>Rating</label>
        <input
          style={styles.formInput}
          type="integer"
          value={Rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="1"
          max="5"
        />
        <label style={styles.formLabel}>Review</label>
        <textarea
          style={styles.formTextarea}
          value={Review_content}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button style={styles.formButton} type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Review;