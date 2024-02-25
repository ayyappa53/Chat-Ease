import { useContext, useState, useEffect } from 'react'
import './css/Chats.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext'

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  if (chats === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chats">
      {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img className='imgsearch' src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span className='spans'>{chat[1].userInfo.displayName}</span>
            <p className='p'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
