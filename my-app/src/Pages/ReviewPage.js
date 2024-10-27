// ReviewPage.js
import React, { useState, useEffect } from 'react';
import axios from "axios";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/reviews/")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) =>{
        console.error("Error fetching review data:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Reviews</h1>
      <div style={styles.reviewList}>
        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewItem}>
            <p><strong>Author:</strong> {review.Account_email}</p>
            <p><strong>Rating:</strong> <span style={styles.reviewRating}>{review.Rating}<span></span>{'★'.repeat(review.Rating)}</span></p>
            <p><strong>Review:</strong> {review.Review_content}</p>
            <p><strong>Bathroom ID:</strong> {review.Bathroom_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    height: '100vh',
    overflowY: 'auto'
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
  }
};

export default ReviewPage;