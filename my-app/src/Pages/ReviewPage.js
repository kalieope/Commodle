// ReviewPage.js
import React, { useState } from 'react';
import { Axios } from "axios";

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
  reviewAuthor: {
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  reviewRating: {
    color: '#ff9900'
  },
};

function ReviewPage() {
  const [reviews, setReviews] = useState([
    { id: 1, author: 'John Doe', rating: 5, content: 'Great product!' },
    { id: 2, author: 'Jane Smith', rating: 4, content: 'Good value for money.' },
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Reviews</h2>

      <ul style={styles.reviewList}>
        {reviews.map(review => (
          <li key={review.id} style={styles.reviewItem}>
            <h3 style={styles.reviewAuthor}>{review.author}</h3>
            <p style={styles.reviewRating}>Rating: {review.rating}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewPage;