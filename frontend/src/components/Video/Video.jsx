import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../Context.tsx";
import { PeerContext } from "../../PeerContext.tsx";
import Peer from "peerjs";
import { SingleVid } from "./SingleVid.jsx";
// import { Stream } from "stream";

/*
For now just focus on having a second vid display, worry about the rest later
Have a second vid tag for the user in call
*/
const Video = () => {
//   const video = useRef();
  const userVideo = useRef();
//   const userVideo2 = useRef();
//   const [videos, setVideos] = useState([]);
  const [streams, setStreams] = useState([]);
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);

  useEffect(() => {
    const getDeviceMedia = async () => {
    //   const videoGrid = document.getElementById("video-grid");
      const mediaStream = await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          // Gets stream from user's camera
            // console.log(stream);
        //   video.current.srcObject = stream;
          setStreams((media) => [...media, stream]);

          // Allows other users to see current video stream
        
            peer.on("call", call => {
                console.log("hello")
                console.log(call);
                call.answer(stream);
                console.log("stream", stream)
                //Basically asking other peers to give me their stream
                setStreams((media) => [...media, stream]);
    
                call.on("stream", (userVideoStream) => {
                //   userVideo.current.srcObject = userVideoStream;
                  setStreams((media) => [...media, userVideoStream]);
                });
              });
         
         
          // When a user joins the room
          socket.on('user-connected', (userId) => {
           setTimeout(() => {
            console.log("User-connected socket is listening with id ", userId)
            // Send the user with our stream
            const call = peer.call(userId, stream);
            console.log("Stream being made", stream)
            // Recieves the user's stream 
            call.on("stream", (userVideoStream) => {
                console.log("UserVideoStream: ", userVideoStream)
                setStreams((media) => [...media, userVideoStream]);
                console.log("Call listenter")
                
            //   userVideo.current.srcObject = userVideoStream;
              
            });
            call.on("close", () => {
            //   userVideo.remove();
            });
          }, 1000);
           })

           
            
        });
    };
    getDeviceMedia();
  }, []);
  
  const set = new Set(streams);
  const arrStream = Array.from(set)
  console.log("Array of streams: ", arrStream);

    useEffect(() => {
        socket.on('user-disconnected', ()=> {
            console.log("A user disconnected ", peer.id);
            console.log("Array of streams in useEffect ", streams);
            streams.forEach((stream)=>{
                console.log(stream.id)
                if (!stream.active) {
                    stream = null;
                }

            })

           })
        return ()=> socket.off('user-disconnected');
    }, [streams]);

  return (
    <div >
      <div>Video</div>
      
      {
      arrStream.map((stream, i) => {
        console.log("Stream in map: " , stream)
        return (
           <SingleVid key={i} videoStream={stream} userId={socket.id}/>
        )
      })}


      {/* Video tag from camera */}
      {/* <video ref={video} autoPlay muted={true} /> */}
      {/*Video from users */}
      {/* <video ref={userVideo} autoPlay muted={true} /> */}
      {/* <video ref={userVideo2} autoPlay muted={true} /> */}
      {/* <video ref ={userVideo2} autoPlay muted={true} /> */}
    </div>
  );
};

export default Video;
