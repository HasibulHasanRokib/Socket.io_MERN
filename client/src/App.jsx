import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './chat'

const socket = io.connect("http://localhost:3001")

const App = () => {

  const[userName,setUserName]=useState('')
  const[room,setRoom]=useState('')
  const[show,setShow]=useState(false)
  
  const handleJoinRoom=()=>{
  if(userName !== "" && room !== ""){
    socket.emit("join_room",room)
    setShow(true)
  }
  }

  return (
    <>
    {!show ? (
      <>
      <h1>Join a chart</h1>
        <input 
        type="text"
        name="user" id="user"
        placeholder='Enter user name'
        onChange={(e)=>setUserName(e.target.value)}      
         />

        <input 
        type="text"
        name="room" id="room" 
        placeholder='Enter room'
        onChange={(e)=>setRoom(e.target.value)}      
         />
         <button onClick={handleJoinRoom}>Join</button>
         </>
    ):(
      <Chat
          socket={socket}
          userName={userName}
          room={room}
         />
    )}
    </>
  )
}

export default App