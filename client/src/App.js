import { useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from "./Chat";
const socket = io.connect('http://localhost:5000')


function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState('')
  const [showChat, setChat] = useState()
  const joinRoom = () => {
    if(username !== '' && room !== ''){
      socket.emit('join_room', {user : username, room : room})
      setChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ?(  
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>

          <p></p>
        </div>)
        :(
        <Chat socket={socket} username={username} room={room} ></Chat>
          )
        }
        </div>
  );
}

export default App;
