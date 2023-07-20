import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
// import {Peer} from 'peerjs'






// const peer = new Peer("pick-an-id");
// PeerContext = createContext<Peer>(peer);
const socket = io('http://localhost:8080'),
SocketContext = createContext<Socket>(socket);

socket.on('connection', () => console.log('connected to socket'));

const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
   
  );
};
export { SocketContext, SocketProvider };