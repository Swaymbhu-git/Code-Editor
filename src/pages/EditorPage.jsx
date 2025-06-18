import React, { useState } from 'react'
import Client from '../components/Client.jsx';
import Editor from '../components/Editor.jsx'

const EditorPage = () => {
  const [clients, setClients]= useState([
    {socketId: 1, userName: 'Jitesh S'}, 
    {socketId: 2, userName: 'Virat K'},
    {socketId: 3, userName: 'Rajat P'}
  ]); 
  return <div className="mainWrap">
      <div className="aside">
          <div className="innerAside"> 
            <div className="logo">
              <img className="logoImage" src="/logo.png" alt="logoOfCodeEditor" />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
              {
                clients.map((client) => (
                  <Client 
                    key={client.socketId} 
                    userName={client.userName} 
                  />
                ))
              }
            </div>
          </div>
          <button className="btn copyBtn">Copy ROOM ID</button>
          <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor /> 
      </div>
  </div>
}

export default EditorPage