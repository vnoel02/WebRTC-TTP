import React, { createContext, useContext } from 'react';
import {Peer} from 'peerjs'
import { Socket } from 'socket.io-client';
import { SocketContext } from './Context';



// const socket = useContext(SocketContext);
// socket.on

const peer = new Peer(undefined, {
  });

const PeerContext = createContext<Peer>(peer);

const PeerProvider = ({ children }: any) => {
  return (
    <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>
  );
};
export { PeerContext, PeerProvider };