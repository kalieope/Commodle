import React, { useState } from 'react'
import axios from 'axios'
import './LoginSignup.css'

import user_icon from "../Components/Assets/person.png"
import email_icon from "../Components/Assets/email.png"
import password_icon from "../Components/Assets/password.png"

const LoginSignup = () => {

    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        console.log("Username:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post('http://localhost:8000/users/', {
                name,
                email,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : 
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />           
                </div>}
                
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
            {action === "Sign Up" ? <div></div> : 
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
            
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
            
            <div className="take-input">
                <div className={action === "Submit" ? "turn gray" : "turn"} onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    )
}

export default LoginSignup