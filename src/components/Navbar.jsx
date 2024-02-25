import { signOut } from 'firebase/auth'
import './css/Navbar.css'
import { auth } from '../firebase'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'

const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className="logo">Chat Ease</span>
      <div className="user">
        <img className="img" src={currentUser.photoURL} alt="" />
        <span className='span'>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className='button'>logout</button>
      </div>
    </div>
  )
}
export default Navbar