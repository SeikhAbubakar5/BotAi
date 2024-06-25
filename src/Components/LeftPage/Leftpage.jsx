import React from 'react';
import './Leftpage.css';
import Logo from "../../Assets/HomeIcon.png";
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

const Leftpage = () => {
  return (
      <div className='leftBar'>
          <Link to='/' style={{textDecoration:'none'}}>
          <button className='logo'>
              <div className='text'>
                <img src={Logo} alt='Logo'/>
                <p>New Chat</p>
              </div>
              <div>
                  <ChatIcon/>
              </div>
          </button>
          </Link>
          <Link to='/Conversation'>
          <div className="btn">
              <button>Past Conversations</button>
          </div>
          </Link>
      </div>
  );
}

export default Leftpage;
