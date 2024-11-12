import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword, signOut } from 'firebase/auth';

const AccountPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [typePreference, setTypePreference] = useState('');
  const [accessPreference, setAccessPreference] = useState('');
  const [floorPreference, setFloorPreference] = useState('');
  const [stallPreference, setStallPreference] = useState('');
  const [tablePreference, setTablePreference] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load preferences from local storage when the component mounts
    const storedGenderPreference = localStorage.getItem('genderPreference');
    const storedTypePreference = localStorage.getItem('typePreference');
    const storedAccessPreference = localStorage.getItem('accessPreference');
    const storedFloorPreference = localStorage.getItem('floorPreference');
    const storedStallPreference = localStorage.getItem('stallPreference');
    const storedTablePreference = localStorage.getItem('tablePreference');

    if (storedGenderPreference) setGenderPreference(storedGenderPreference);
    if (storedTypePreference) setTypePreference(storedTypePreference);
    if (storedAccessPreference) setAccessPreference(storedAccessPreference);
    if (storedFloorPreference) setFloorPreference(storedFloorPreference);
    if (storedStallPreference) setStallPreference(storedStallPreference);
    if (storedTablePreference) setTablePreference(storedTablePreference);
  }, []);

  const handleGenderPreferenceChange = (e) => {
    const value = e.target.value;
    setGenderPreference(value);
    localStorage.setItem('genderPreference', value);
  };

  const handleTypePreferenceChange = (e) => {
    const value = e.target.value;
    setTypePreference(value);
    localStorage.setItem('typePreference', value);
  };

  const handleAccessPreferenceChange = (e) => {
    const value = e.target.value;
    setAccessPreference(value);
    localStorage.setItem('accessPreference', value);
  };

  const handleFloorPreferenceChange = (e) => {
    const value = e.target.value;
    setFloorPreference(value);
    localStorage.setItem('floorPreference', value);
  };

  const handleStallPreferenceChange = (e) => {
    const value = e.target.value;
    setStallPreference(value);
    localStorage.setItem('stallPreference', value);
  };

  const handleTablePreferenceChange = (e) => {
    const value = e.target.value;
    setTablePreference(value);
    localStorage.setItem('tablePreference', value);
  };

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

  const Account_email = auth.currentUser.email;

  const headerStyle = {
    position: 'absolute',
    top: "70px",
    left: "0",
    width: '100%',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
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
 

  return (
    <div>
      <header style={headerStyle}>
        <h1>Welcome to your profile, {Account_email}</h1>
      </header>
      <button type="button" style={buttonStyleL} onClick={handleLogout}>Logout</button>
      <div style={preferencesStyle}>
        <h2>Preferences</h2>
        <label style={labelStyle}>
          Gender Preference:
          <select value={genderPreference} onChange={handleGenderPreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label style={labelStyle}>
          Type Preference:
          <select value={typePreference} onChange={handleTypePreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
          </select>
        </label>
        <label style={labelStyle}>
          Accessibility Preference:
          <select value={accessPreference} onChange={handleAccessPreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="public">Unlocked/Public</option>
            <option value="private">Locked/Private</option>
          </select>
        </label>
        <label style={labelStyle}>
          Floor Preference:
          <select value={floorPreference} onChange={handleFloorPreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="1">Ground Floor</option>
            <option value="2">Second Floor</option>
            <option value="3">Third Floor or Greater</option>
          </select>
        </label>
        <label style={labelStyle}>
          Stall Preference:
          <select value={stallPreference} onChange={handleStallPreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="single">Single Stall</option>
            <option value="multi">Multiple Stalls</option>
          </select>
        </label>
        <label style={labelStyle}>
          Changing Table Preference:
          <select value={tablePreference} onChange={handleTablePreferenceChange} style={selectStyle}>
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>
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