import React, { createContext } from 'react';
import {Peer} from 'peerjs'
import { Socket } from 'socket.io-client';






const peer = new Peer(undefined, {
    host: "/",
    port: "4000"
  });

const PeerContext = createContext<Peer>(peer);

const PeerProvider = ({ children }: any) => {
  return (
    <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>
  );
};
export { PeerContext, PeerProvider };