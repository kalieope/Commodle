import React, { useState } from 'react'
import axios from 'axios'
import './LoginSignup.css'
import { app } from "../firebaseConfig"
import { useNavigate } from 'react-router-dom';
import "./Login"
import { createUserWithEmailAndPassword } from "firebase/auth";

import user_icon from "../Components/Assets/person.png"
import email_icon from "../Components/Assets/email.png"
import password_icon from "../Components/Assets/password.png"

    

const Signup = () => {

    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            app.createUserWithEmailAndPassword(email,password)
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">      
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input 
                        type="email" 
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />           
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />           
                </div>
            </div>
            
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleClick}>Login</div>
            </div>
            
            <div className="take-input">
                <div className={action === "Submit" ? "turn gray" : "turn"} onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    )
}

export default Signup