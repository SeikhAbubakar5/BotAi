import React, { useEffect, useState } from 'react';
import "./Conversation.css";
import User from "../../Assets/user.png";
import headerLogo from "../../Assets/Logo.png";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import StarIcon from '@mui/icons-material/Star';

const Conversation = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    // Load all data from local storage 
    
    const savedConversations = JSON.parse(localStorage.getItem('conversation')) || [];

    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};

    const savedDislikes = JSON.parse(localStorage.getItem('dislikes')) || {};

    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};

    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || {};


    const combinedHistory = savedConversations.map((chat, index) => ({
      ...chat,
      likes: savedLikes[index] || false,
      dislikes: savedDislikes[index] || false,
      rating: savedRatings[index] || null,
      review: savedReviews[index] || null
    }));

    setConversationHistory(combinedHistory);
  }, []);

  const filterByRating = (chat) => {
    if (selectedFilter === "All") {
      return true;
    } else {
      return chat.rating === parseInt(selectedFilter); 
    }
  };

  return (
    <div className='container'>
      <div className='conversationHistory'>
        <h3>Conversation History</h3>
        <div className='filter'>
          <p>Filter by Rating:</p>
          <select onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="All">All ratings</option>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>{star} Star</option>
            ))}
          </select>
        </div>
        {conversationHistory.length > 0 ? (
          conversationHistory.filter(filterByRating).map((chat, index) => (
            <div key={index} className='Chats'>
              <div className='user'>
                <img src={User} alt='logo' style={{ width: '70px', height: '70px' }} />
                <div>
                  <p><strong>You:</strong></p>
                  <p>{chat.user}</p>
                </div>
              </div>
              <div className='bot'>
                <img src={headerLogo} alt='logo' style={{ width: '70px', height: '70px' }} />
                <div>
                  <p><strong>AI:</strong></p>
                  <p>{chat.ai}</p>
                  <div className='Likes'>
                    <div>
                      <ThumbUpAltIcon color={chat.likes ? 'primary' : 'inherit'} />
                    </div>
                    <div>
                      <ThumbDownAltIcon color={chat.dislikes ? 'error' : 'inherit'} />
                    </div>
                  </div>
                  <div className='Rating'>
                    {chat.likes && chat.rating && (
                      <>
                        {[1, 2, 3, 4, 5].map(star => (
                          <StarIcon
                            key={star}
                            color={chat.rating >= star ? 'primary' : 'inherit'}
                          />
                        ))}
                      </>
                    )}
                    {chat.dislikes && chat.review && (
                      <div className='Review'>
                        <p>Feedback: {chat.review}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No conversation history found.</p>
        )}
      </div>
    </div>
  );
}

export default Conversation;
