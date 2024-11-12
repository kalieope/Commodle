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
    top: "200px",
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
    top: '250px',
    right: '30px',
    width: '150px',
    height: '50px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#eaeaea',
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1>Hi, {Account_email}</h1>
      </header>
      <button type="button" style={buttonStyleL} onClick={handleLogout}>Logout</button>
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