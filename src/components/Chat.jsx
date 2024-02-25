import './css/Chat.css'
import Cam from '../Assets/cam.png'
import Add from '../Assets/add.png'
import More from '../Assets/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {

  const { data } = useContext(ChatContext);
  const dummytext = "No User Selected";
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName || dummytext}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
export default Chat