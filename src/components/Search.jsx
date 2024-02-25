import { useContext, useState } from 'react'
import './css/Search.css'
import { collection,query,where,getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Search = () => {
  const [username,setUsername]=useState("");
  const [user,setUser] = useState("");
  const [err,setErr]=useState(false);
  const {currentUser} = useContext(AuthContext);
  
  const handleSearch = async()=>{
    const q = query(collection(db,"users"),
    where("displayName","==",username)
    );
  try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setUser(doc.data())
    });
  }catch(err){
    setErr(true);
  }
};
  const handleKey = (e)=>{
    e.code == "Enter" && handleSearch();
  }

  const handleSelect = async()=>{
    //checking whether group(chats in firestore) exist, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db,"chats",combinedId));
      if(!res.exists()){
        //create a chat in chats collections
        await setDoc(doc(db,"chats",combinedId),{messages: []});
        //creating the user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId+".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedId+".data"]:serverTimestamp()
      });
      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [combinedId+".data"]:serverTimestamp()
      });
    } 
  }catch (error) {
      console.log(error);
    }
    setUser(null);
    setUsername("");
  }



  return (
    <div className='search'>
      <div className="searchForm">
        
        <input className='input' type="text" onKeyDown={handleKey} placeholder='Find a User' value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img className='imgsearch' src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span className='span'>{user.displayName}</span>
        </div>
      </div>
      }

    </div>
  )
}
export default Search