import React, { useEffect, useState } from "react";

function Chat({socket, username, room }){
    const [currentMessage, setMessage] = useState()
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== ''){
            const messageData = {
                room : room,
                user : username,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds() 
            }
            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData]) 

        }
    }
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket])

    return(
        <div className="chat-window">
            <div className="chat-header">
                <p>chat</p>
            </div>

            <div className="chat-body">
                    <div className="message-container">
                        {messageList.map((messageData, index) => {
                            if(index%2 === 0){
                                return (
                                    <div
                                    className="message"
                                    id={username === messageData.user ? "you" : "other"}
                                    >
                                    <div>
                                        <div className="message-content">
                                        <p>{messageData.message}</p>
                                        </div>
                                        <div className="message-meta">
                                        <p id="time">{messageData.time}</p>
                                        <p id="author">{messageData.user}</p>
                                        </div>
                                    </div>
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
             
            <div className="chat-footer">
            <input
            type="text"
            placeholder="Message..."
            onChange={(event) => {
                setMessage(event.target.value);
            }}
          />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>

    )

}

export default Chat