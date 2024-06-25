import React, { useState} from 'react';
import Modal from 'react-modal';
import Navbar from "../Navbar/Navbar";
import "./Rightpage.css";
import headerLogo from "../../Assets/Logo.png";
import User from "../../Assets/user.png";
import AiData from "../../API/Data.json";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import StarIcon from '@mui/icons-material/Star';

Modal.setAppElement('#root');

const Rightpage = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  const [ratings, setRatings] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentDislikeIndex, setCurrentDislikeIndex] = useState(null);
  const [reviews, setReviews] = useState({});

  



  const handleAsk = () => {
    const foundData = AiData.find(item => item.question.toLowerCase() === userInput.toLowerCase());
    if (foundData) {
      const newConversation = {
        user: userInput,
        ai: foundData.response
      };
      setConversation([...conversation, newConversation]);
    } else {
      const newConversation = {
        user: userInput,
        ai: "Sorry, I couldn't find an answer."
      };
      setConversation([...conversation, newConversation]);
    }
  };

  const handleSave = () => {
    const savedConversations = JSON.parse(localStorage.getItem('conversation')) || [];

    const updatedConversations = [...savedConversations, ...conversation];

    localStorage.setItem('conversation', JSON.stringify(updatedConversations));

    localStorage.setItem('likes', JSON.stringify(likes));

    localStorage.setItem('dislikes', JSON.stringify(dislikes));

    localStorage.setItem('ratings', JSON.stringify(ratings));

    localStorage.setItem('reviews', JSON.stringify(reviews));
    setConversation([]); 
  };

  const handleLike = (index) => {
    setLikes({ ...likes, [index]: true });
    setDislikes({ ...dislikes, [index]: false });
  };

  const handleDislike = (index) => {
    setDislikes({ ...dislikes, [index]: true });
    setLikes({ ...likes, [index]: true });
    setCurrentDislikeIndex(index);
    setShowModal(true);
  };

  const handleRating = (index, rating) => {
    setRatings({ ...ratings, [index]: rating });
  };

  const handleReviewChange = (e) => {
    setReviews({ ...reviews,[currentDislikeIndex]: e.target.value });
  };

  const handleSubmitReview = () => {
    setShowModal(false);
    setCurrentDislikeIndex(null);
  };

  return (
    <div className='rightSide'>
      <Navbar/>
      <div className='header'>
          <p>How Can I Help You Today?</p>
          <img src={headerLogo} alt='Logo'/>
      </div>
      <div className='conversationContainer'>
        {conversation.map((chat, index) => (
          <div key={index} className='chat'>
            <div className='you'>
                <img src={User} alt='logo' style={{width:'70px',height:'70px'}}/>
                <div>
                <p><strong>You:</strong></p>
                <p>{chat.user}</p>
                </div>
            </div>
            <div className='Ai'>
                <img src={headerLogo} alt='logo' style={{width:'70px',height:'70px'}}/>
                <div>
                <p><strong>AI:</strong></p>
                <p>{chat.ai}</p>
                <div className='Likes'>
                  <div onClick={() => handleLike(index)}>
                    <ThumbUpAltIcon color={likes[index] ? 'primary' : 'inherit'} />
                  </div>
                  <div onClick={() => handleDislike(index)}>
                    <ThumbDownAltIcon color={dislikes[index] ? 'error' : 'inherit'} />
                  </div>
                </div>
                <div className='Rating'>
                  {likes[index] && (
                    <>
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon
                          key={star}
                          onClick={() => handleRating(index, star)}
                          color={ratings[index] >= star ? 'primary' : 'inherit'}
                        />
                      ))}
                    </>
                  )}
                  {dislikes[index] && reviews[index] && (
                    <div className='Review'>
                      <p>Feedback: {reviews[index]}</p>
                    </div>
                  )}
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className='inputContainer'>
        <input 
          type='text' 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder='Ask a question...' 
        />
        <button onClick={handleAsk}>Ask</button>
        <button onClick={handleSave}>Save</button>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Write a Review"
        className="modal"
        overlayClassName="modalOverlay"
      >
      <p>Provide Additional Feedback</p>
        <div className='modalText'>
        
        <textarea 
          value={reviews[currentDislikeIndex] || ''}
          onChange={handleReviewChange}
          placeholder='Write your review here...'
        />
          <div className='modalBtn'>
            <button onClick={handleSubmitReview}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
        
      </Modal>
    </div>
  );
}

export default Rightpage;
