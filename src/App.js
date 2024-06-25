import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rightpage from './Components/Rightpage/Rightpage';
import Conversation from './Components/Conversation/Conversation';
import Leftpage from './Components/LeftPage/Leftpage';
import "./App.css"
function App() {
  return (
    <Router>
      <div className='app'>
        <Leftpage />
        <Routes>
          <Route path="/" element={<Rightpage />} />
          <Route path="/Conversation" element={<Conversation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
