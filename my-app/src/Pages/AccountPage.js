import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword, signOut } from 'firebase/auth';

const AccountPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

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
        // Password updated.
        handleLogout();
      }).catch((error) => {
        // An error happened.
        console.error("Error updating password: ", error);
      });
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    backgroundColor: 'none',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    position: 'absolute',
    top: "40px",
    left: "0",
    width: '100%',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const buttonStyleL = {
    position: 'absolute',
    top: "90px",
    right: "20px",
    padding: '10px 20px',
    fontSize: '16px',
    fontweight: '700',
    color: '#fff',
    backgroundColor: '#84D4FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  const buttonStyle = {
    position: 'absolute',
    top: "200px",
    right: "20px",
    padding: '10px 20px',
    fontSize: '16px',
    fontweight: '700',
    color: '#fff',
    backgroundColor: '#84D4FF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  const bodyStyle = {
    height: '50px',
    width: '400px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#797979',
    fontSize: '19px',
  };

  const input = {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    width: '480px',
    height: '80px',
    background: '#eaeaea',
    borderRadius: '6px',
};

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerStyle}>Your Account</h1>
      </header>
      <button type="button" style={buttonStyleL} onClick={handleLogout}>Logout</button>
      <div className='input' style={input}>
      <input 
        type="password" 
        style = {bodyStyle}
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