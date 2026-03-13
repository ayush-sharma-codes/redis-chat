import './App.css'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Socket } from 'socket.io-client'

interface Message {
  senderId: string; 
  roomId: string;
  content: string;
  timestamp: string;
}

function App() {
  
  const [socket, setSocket] = useState<Socket | null>(null)
  const [user, setUser] = useState('test_user')
  const [roomId, setRoomId] = useState('test_room')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  
  
  const joinRoomHandler = () => {
    const newSocket = io(`http://localhost:5000`)
    
    newSocket.on('connect', () => {
      console.log(`Connected backend`)
      newSocket.emit(`joinRoom`, roomId, user)
    })
    
    newSocket.on('newMessage', (message) => {
      setMessages((prev) => [message, ...prev])
    })
    
    setSocket(newSocket)
  }
  
  useEffect(() => {
    return () => {
    if (socket) {
      socket?.disconnect()
    }
  }}, [socket])
  
  const sendMessageHandler = () => {
    if (!socket || !socket.connected) {
      return alert("no connection established cannot send messages")
    }
    if (!currentMessage.trim()) {
      return alert("No message typed to send")
    }
    socket.emit('sendMessage', {
      senderId: user,
      roomId: roomId,
      content: currentMessage
    })
    
    // setCurrentMessage('')
  }
  
  const massSendHandler = () => {
    if (!socket || !socket.connected) {
      return alert("no connection established cannot send messages")
    }
    console.log("Starting mass sending of messages....")
    for (let i = 0; i < 500; i++) {
      socket.emit("sendMessage", {
        senderId: `${user} mass_test`,
        roomId: roomId,
        content: `test message ${i}`
      })
    }
  }
   
  return (
    <div className='container'>
      <div className='user-container'>
        <label htmlFor="user">User Name</label>
        <input type="text" id='user' className='user-input' value={user} onChange={(e) => setUser(e.target.value)}/>
      </div>
      <div className='room-container'>
        <label htmlFor="room">Room Name</label>
        <input type="text" id='room' className='room-input' value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
      </div>
      <button className='join-btn' onClick={joinRoomHandler}>Join Room</button>
      <div className='message-container'>
        <label htmlFor="message">Message</label>
        <input type="text" id='message' className='message-input' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
      </div>
      <button className='send-btn' onClick={sendMessageHandler}>Send Message</button>
      <button className='mass-send-btn' onClick={massSendHandler}>Mass Message Sender</button>
      <div className='message-history-container'>
        <p className='message-header'>All the messages will be rendered below</p>
        {messages.map((msg) => (
          <div className='msg-wrapper'>
            <span className='sender-name'>{msg.senderId}</span>
            <span className='content-block'>{msg.content}</span>
            <span className='time-block'>[{new Date(msg.timestamp).toLocaleTimeString()}]</span>
          </div>
        )) }
      </div>
    </div>
  )
}

export default App
