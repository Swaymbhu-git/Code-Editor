import React, { useState } from 'react'
import {v4 as uuidV4} from 'uuid'
// importing version 4 as uuidV4
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate= useNavigate();
  const [roomId, setRoomId]=useState('');
  const [userName, setUserName]=useState('');
  const createNewRoom= (e) => {
    e.preventDefault();
    // the above stops refreshing the page when we click on new room link which is default behavior of anchor tag
    const id=uuidV4();
    setRoomId(id);
    toast.success('Created a new room'); 
  }
  const joinRoom = () => {
    if(!roomId || !userName)
    {
      toast.error("Room ID and Username are required");
      return;
    }
    // redirect to the editor page
    navigate(`/editor/${roomId}`,
      {
        /// state is used to pass data through pages on the router
        state: {
          userName,
        },
      }
    )
  }
  const handleInputEnter = (e) => {
    if(e.code === 'Enter')
    {
      joinRoom();
    }
  }
  return <div className="homePageWrapper">
        <div className="formWrapper">
            <img  
              className="homePageLogo"
              src="/logo.png" alt="logoOfCodeEditor" 
            />
            <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
            <div className="inputGroup">
              <input 
                type="text" 
                className="inputBox" 
                placeholder="Room ID"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}
              />
              <input 
                type="text" 
                className="inputBox" 
                placeholder="USERNAME"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                onKeyUp={handleInputEnter}
                // onKeyUp helps in listening all key pressed
              />
              <button onClick={joinRoom} className="btn joinBtn">Join</button>
              <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a onClick={createNewRoom} href=" " className="createNewBtn">
                  new room
                </a>
              </span>
            </div>
        </div>
        <footer>
          <h4>Built for Perfection by <a href="https://github.com/Swaymbhu-git">Himanshu Patel</a></h4>
        </footer>
  </div>;
} 

export default Home