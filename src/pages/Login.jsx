import React, { useState } from "react"
import './CSS/Login.css'
import chat from '../Assets/chat.png'
import { useNavigate,Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate('/')
    }
    catch(err){
      setErr(true);

    }


  }
  return (
    <>
    <div className="navbarlogin">
    <img className="imglogin" src={chat} alt=""/>
    <p>Chat Ease</p></div>
    <div className="containerlogin">
      <div className="heading">Sign In</div>
      <form onSubmit={handleSubmit} className="form">
        <input required className="input" type="email" name="email" id="email" placeholder="E-mail" />
        <input required className="input" type="password" name="password" id="password" placeholder="Password" />
        <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
        <input className="login-button" type="submit" value="Sign In" />
        {err && <span>Something went wrong</span>}
      </form>
      <div className="social-account-container">
        <span className="title">You don't have an account? <Link to="/register" style={{color:"white"}}>Register</Link></span>
      </div>
    </div>
    <footer className="footer">
        <p>&copy; 2023 Chat Ease. All rights reserved.</p>
      </footer>
      </>
  )
}
export default login