import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import axios from "axios";
import potty from "../Components/Assets/potty.png";

const AccountPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const Account_email = auth.currentUser.email;
  const [genderPreference, setGenderPreference] = useState('');
  const [typePreference, setTypePreference] = useState('');
  const [accessPreference, setAccessPreference] = useState('');
  const [floorPreference, setFloorPreference] = useState('');
  const [stallPreference, setStallPreference] = useState('');
  const [tablePreference, setTablePreference] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  const navigate = useNavigate();

  function checkuser() {
    if (!auth.currentUser) {
      console.error("No authenticated user");
      return false;
    } else {
      return true;
    }
  };

  const handlePrefChange = async (e) => {
    e.preventDefault();
    console.log(Account_email)
    console.log(genderPreference)
    console.log(typePreference)
    console.log(accessPreference)
    console.log(floorPreference)
    console.log(stallPreference)
    console.log(tablePreference)
    try {
      if (checkuser()) {
        const Account_email = auth.currentUser.email;
        const response = await axios.post("http://localhost:8000/users/",{
          Account_email: (Account_email),
          Gender_Preference: (genderPreference),
          Type_Preference: (typePreference),
          Accessibility_Preference: (accessPreference),
          Floor_Preference: (floorPreference),
          Stall_Preference: (stallPreference),
          Changing_Table_Preference: (tablePreference)
      });
        console.log(response.data);
      }
    } catch (error) {
      console.error("There was an error submitting preferences.", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try{
        const response = await axios.get("http://localhost:8000/UserFavorites/",{
          params: {
            user_email: Account_email,
          },
        });
        setFavorites(response.data);
        console.log("Favorites data:", response.data);
      } catch(error){
        console.error("Error fetching favs ", error);
      }
    };
    fetchFavorites();
  }, [Account_email]);

  useEffect(() => {
    const fetchReviews = async () => {
      try{
        const response = await axios.get("http://localhost:8000/reviews/user/",{
          params: {
            Account_email: Account_email,
          },
        });
        setReviews(response.data);
        console.log("Reviews data:", response.data);
      } catch(error){
        console.error("Error fetching reviews ", error);
      }
    };
    fetchReviews();
  }, [Account_email]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("Sign out successful");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleChangePassword = () => {
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword).then(() => {
        handleLogout();
      }).catch((error) => {
        console.error("Error updating password: ", error);
      });
    }
  };

  const headerStyle = {
    width: '800px',
    margin: '0 auto',
    top: '300px',
    fontSize: '50px',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    alignItem: 'center',
  };

  const buttonStyleL = {
    position: 'absolute',
    top: "90px",
    right: "20px",
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#84D4FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const buttonStyle = {
    position: 'absolute',
    top: "170px",
    right: "20px",
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#84D4FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const inputp = {
    position: 'absolute',
    flex: 'column',
    top: '220px',
    right: '30px',
    width: '150px',
    height: '50px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#eaeaea',
  };

  const preferencesStyle = {
    position: 'absolute',
    top: '170px',
    left: '20px',
    width: '200px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
  };

  const selectStyle = {
    width: '100%',
    padding: '5px',
    fontSize: '16px',
  };

  const prefStyle = {
    display: 'block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#84D4FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const favsStyle = {
    position: 'absolute',
    top: '170px',
    left: '250px',
    width: '400px',
    height: '400px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  };

  const favItemStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
    listStyleType: 'none',
  };

  const reviewsStyle = {
    position: 'absolute',
    top: '170px',
    right: '250px',
    width: '400px',
    height: '400px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  };

  const reviewItemStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
    listStyleType: 'none',
  };

  const photoStyle ={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }

  return (
    <div>
      <h1 style={headerStyle}>
        Welcome to your profile, {Account_email}
      </h1>
      <button type="button" style={buttonStyleL} onClick={handleLogout}>Logout</button>
      <div style={preferencesStyle}>
        <h2>Preferences</h2>
        <label style={labelStyle}>
          Gender Preference:
          <select value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label style={labelStyle}>
          Type Preference:
          <select value={typePreference} onChange={(e) => setTypePreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
          </select>
        </label>
        <label style={labelStyle}>
          Accessibility Preference:
          <select value={accessPreference} onChange={(e) => setAccessPreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="public">Unlocked/Public</option>
            <option value="private">Locked/Private</option>
          </select>
        </label>
        <label style={labelStyle}>
          Floor Preference:
          <select value={floorPreference} onChange={(e) => setFloorPreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="1">Ground Floor</option>
            <option value="2">Second Floor</option>
            <option value="3">Third Floor or Greater</option>
          </select>
        </label>
        <label style={labelStyle}>
          Stall Preference:
          <select value={stallPreference} onChange={(e) => setStallPreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="single">Single Stall</option>
            <option value="multi">Multiple Stalls</option>
          </select>
        </label>
        <label style={labelStyle}>
          Changing Table Preference:
          <select value={tablePreference} onChange={(e) => setTablePreference(e.target.value)} style={selectStyle}>
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>
        <button type="button" style={prefStyle} onClick={handlePrefChange}>Set Preferences</button>
      </div>
      <div style={favsStyle}>
        <h2>Your Favorites</h2>
        <ul style={{ padding: 0 }}>
          {favorites.map((fav, index) => (
            <li key={index} style={favItemStyle}>
              <p><strong>Name:</strong> {fav.loc_name}</p>
              <p><strong>Rating:</strong> {fav.Bathroom_rating}</p>
              <p><strong>Description:</strong> {fav.Bathroom_desc}</p>
              <p><strong>Latitude:</strong> {fav.lat_val}</p>
              <p><strong>Longitude:</strong> {fav.long_val}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={reviewsStyle}>
        <h2>Your Reviews</h2>
        <ul style={{ padding: 0 }}>
          {reviews.map((review, index) => (
            <li key={index} style={reviewItemStyle}>
              <p><strong>Author:</strong>{review.Account_email}</p>
              <p><strong>Rating:</strong> {review.Rating}</p>
              <p><strong>Review:</strong> {review.Review_content}</p>
              <p><strong>Bathroom ID:</strong> {review.Bathroom_id}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={photoStyle}>
        <img src={potty} alt="Commodle" />
      </div>
      <div>
        <input 
          type="password"
          style={inputp} 
          placeholder="New Password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
      </div>
      <button type="button" style={buttonStyle} onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default AccountPage;