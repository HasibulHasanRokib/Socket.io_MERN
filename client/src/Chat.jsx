import { useEffect, useState } from "react"

const Chat = ({socket,userName,room}) => {

const [currentMessage,setCurrentMessage]=useState('')
const [messageList,setMessageList]=useState([])

 const sendMessage=async()=>{
  if(currentMessage !== ''){
  const messageData={
    room:room,
    auth:userName,
    time: new Date(Date.now()).getHours()+":"+ new Date(Date.now()).getMinutes()+":"+new Date(Date.now()).getSeconds(),
    message:currentMessage
  }
  await socket.emit('send_message',messageData)
  setMessageList((prev)=>[...prev,messageData])  
  }
  setCurrentMessage('')
 }

 useEffect(()=>{
 socket.on("received_message",(data)=>{
  console.log(data)
  setMessageList((prev)=>[...prev,data])
 })
 },[])

  return (
    <>
     <div className="chart-header">
        <p>Live Chat</p>
     </div>

     <div className="chat-body">
     {messageList && messageList.map((item,index)=>{
      return <p key={index}>{item.message}</p>
     })}
     </div>
     
     <div className="chat-footer">  
      <input 
      type="text"
      placeholder="message..."
      onChange={(e)=>setCurrentMessage(e.target.value)}
       />
      <button onClick={sendMessage}>&#9658;</button>
     </div>
    </>
  )
}

export default Chat
