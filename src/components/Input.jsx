import React, { useContext, useState } from "react"
import './css/Input.css'
import Img from '../Assets/img.png'
import Attach from '../Assets/attach.png'
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

const Input = () => {

  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
  if (img) {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setErr(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            data: Timestamp.now(),
            img: downloadURL,
          }),
        });
      }
    );
  } else {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        data: Timestamp.now(),
      }),
    });
  }

  await updateDoc(doc(db, "userChats", currentUser.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".data"]: serverTimestamp(),
  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text,
    },
    [data.chatId + ".data"]: serverTimestamp(),
  });

  setText("");
  setImg(null);
};


  return (
    <div className="inputs">
      <input type="text" placeholder="Type a message" onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={Img} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
export default Input