import React, { useState } from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebaseConfig";
import email_icon from "../Components/Assets/email.png"
import password_icon from "../Components/Assets/password.png"

const Login = () => {

    const [action, setAction] = useState("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err){
            console.error(err);
        }
    };

   
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
            {action === "Sign Up" ? <div></div> : 
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
            
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleClick}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
            
            <div className="take-input">
                <div className={action === "Submit" ? "turn gray" : "turn"} onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    )
}

export default Login