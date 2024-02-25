import './CSS/Register.css'
import add from '../Assets/addAvatar.png'
import chat from '../Assets/chat.png'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth ,storage,db} from '../firebase';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const [fileimg,setfileImgurl] = useState('');
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on(
  (error) => {
    setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
      });
      await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });
      await setDoc(doc(db,"userChats",res.user.uid),{})
      navigate('/')
    });
    
  }
);
    }
    catch(err){
      setErr(true);

    }


  }
  return (
    <>
    <div className="navbarRegister">
    <img className="imgRegister" src={chat} alt=""/>
    <p>Chat Ease</p></div>
    <div className="form-container">
        <div className="formwrapper">
            <span className="title">Register</span>
            <form className='forms' onSubmit={handleSubmit} >
                <input type="text" className="input" placeholder="User name" />
                <input type="email" className="input" placeholder="email"/>
                <input type="password" className="input" placeholder="password"/>
                <input style={{display: "none"}} className="file" id='file' type="file" onChange={(e)=>setfileImgurl(e.target.files[0].name)} />
                <label className="label" htmlFor="file"><img className='img' src={add} alt="" />
                <span style={{color:"white"}}>{fileimg?fileimg:"Add an avatar"}</span></label>
                <button className="signup-button" >Sign Up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p className='account' style={{color:"white"}}>You do have an account? <Link to="/login" style={{color:"white"}}>Login</Link></p>
        </div>
    </div>
    <footer className="footers">
        <p>&copy; 2023 Chat Ease. All rights reserved.</p>
      </footer>
      </>
  )
}
export default Register;