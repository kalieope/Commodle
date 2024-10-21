// ReviewPage.js
import React, { useState } from 'react';

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

function ReviewPage() {
  const [reviews, setReviews] = useState([
    { id: 1, author: 'John Doe', rating: 5, content: 'Great product!' },
    { id: 2, author: 'Jane Smith', rating: 4, content: 'Good value for money.' },
  ]);

  const [newReview, setNewReview] = useState({
    author: '',
    rating: 0,
    content: ''
  });

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
    setNewReview({ author: '', rating: 0, content: '' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Customer Reviews</h2>

      <ul style={styles.reviewList}>
        {reviews.map(review => (
          <li key={review.id} style={styles.reviewItem}>
            <h3 style={styles.reviewAuthor}>{review.author}</h3>
            <p style={styles.reviewRating}>Rating: {review.rating}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>

      <h3 style={styles.header}>Add Your Review</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.formLabel}>
          Author:
          <input type="text" name="author" value={newReview.author} onChange={handleInputChange} style={styles.formInput} />
        </label>
        <label style={styles.formLabel}>
          Rating:
          <select name="rating" value={newReview.rating} onChange={handleInputChange} style={styles.formInput}>
            {[...Array(5).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label style={styles.formLabel}>
          Content:
          <textarea name="content" value={newReview.content} onChange={handleInputChange} style={styles.formTextarea} />
        </label>
        <button type="submit" style={styles.formButton}>Submit</button>
      </form>
    </div>
  );
}

export default ReviewPage;