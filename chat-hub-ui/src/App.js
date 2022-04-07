import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby'
import Chat from './components/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState('');

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://chathubservice.burakyuz.com/chat')
        .configureLogging(LogLevel.Information) //In order to get console infos
        .build();

      connection.on("usersInRoom", (users) => {
        setUsers(users);
        setRoom(room);
      })

      connection.on("recieveMessage", (user, message, fromMe) => {
        setMessages(messages => [...messages, { user, message, fromMe }]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();

      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }

  const closeConnection = async () => {
    try {
      connection.stop();
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  }

  return <div className='container h-100'>
    <div className="row align-items-center h-100">
      <div className=" col-md-10 offset-md-1 offset-0 col-12">
        {!connection
          ? <Lobby joinRoom={joinRoom} />
          : <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
            room={room}
          />
        }
      </div>
    </div>
  </div>
}

export default App;
