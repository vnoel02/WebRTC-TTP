import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../Context.tsx";
import { PeerContext } from "../../PeerContext.tsx";
import Peer from "peerjs";

/*
For now just focus on having a second vid display, worry about the rest later
Have a second vid tag for the user in call
*/
const Video = () => {
  const video = useRef();
  const userVideo = useRef();
  const [videos, setVideos] = useState([]);
  const [stream, setStream] = useState([]);
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);

  useEffect(() => {
    const getDeviceMedia = async () => {
      const videoGrid = document.getElementById("video-grid");
      const mediaStream = await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          // Gets stream from user's camera

          video.current.srcObject = stream;
          setStream((stream) => [...stream, stream]);

          // Allows other users to see current video stream
          peer.on("call", (call) => {
            call.answer(stream);

            call.on("stream", (userVideoStream) => {
              userVideo.current.srcObject = userVideoStream;
              setStream((stream) => [...stream, stream]);
            });
          });
          // When a user joins the room
          socket.on("user-connected", (userId) => {
            // connectToNewUser(userId, stream);
            const call = peer.call(userId, stream);
            call.on("stream", (userVideoStream) => {
              userVideo.current.srcObject = userVideoStream;
              setStream((stream) => [...stream, stream]);
            });
            call.on("close", () => {
              userVideo.remove();
            });
          });
        });
    };
    getDeviceMedia();
  }, []);
  console.log(stream);

  //   useEffect(() => {});

  return (
    <div id="video-grid">
      <div>Video</div>
      
      {/* {stream.map(function (stream, i) {
        return (
            <video ref={video => video.srcObject = stream} autoPlay muted={true} />
        )
      })} */}
      <video ref={video} autoPlay muted={true} />
      <video ref={userVideo} autoPlay muted={true} />
      {/* <video ref={userVideo2} autoPlay muted={true} /> */}
    </div>
  );
};

export default Video;
