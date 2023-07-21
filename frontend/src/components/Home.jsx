import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate, redirect, useNavigate, Link } from "react-router-dom";
import { SocketContext } from "../Context.tsx";
import { PeerContext } from "../PeerContext.tsx";
import {Peer} from 'peerjs'

const Home = () => {
  const [id, setId] = useState();
//   const myPeer = new Peer(undefined, {
//     host: "/",
//     port: "4000"
//   });
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
 
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");

  
  useEffect(() => {
    peer.on('open', id => {
        // console.log("HELLO")
        console.log("My Peer connection: ", id);
        setId(id);
    })
  }, [])

  // Remember to replace id with user
  const navigate = useNavigate();
  const handleJoinRoom = () => {
    // myPeer.on('open', id => {
        console.log("My Peer connection ", id);
        socket.emit('join_room', room , id );
    // })
    
    // navigate(`/karaoke/${room}`);
  };

  const handleCreateRoom = () => {
    socket.emit("createRoom", socket.id);
    // setRoomId(socket.id);
    console.log("CREATE ROOM: ", socket.id);
    console.log("CR SOCKET: ", socket);
    navigate(`/room/${socket.id}`);
  };

  return (
    <div>
      <h1>Home</h1>
      
      {/* <Link to={`/karaoke/${roomId}`}> */}
      {console.log("SOCKET ID: ", socket.id)}

      <button onClick={handleCreateRoom}>Create Room</button>
      {/* </Link> */}
      <div>
        <input
          type="text"
          placeholder="Enter room ID"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <Link to={`/room/${room}`} state={room}>
          <button onClick={handleJoinRoom}>Join Room</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
