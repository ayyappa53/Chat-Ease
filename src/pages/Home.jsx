import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './CSS/Home.css'
const Home = () => {
  return (
    <div className='home'>
        <div className="containerHome">
            <Sidebar/>
            <Chat/>
        </div>

    </div>
  )
}
export default Home;