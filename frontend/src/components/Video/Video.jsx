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
  const [videos, setVideos] = useState([]);
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
  const videoGrid = document.getElementById('video-grid');
  useEffect(() => {
    const getDeviceMedia = async () => {
      const mediaStream = await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
        //   addVideoStream(video, stream);
            if (video.current) {
                video.current.srcObject = stream;
            }
            video.current.onloadedmetadata = function (e) {
              video.current.play();
            };
          setVideos(videos => [...videos, video]);
          
        peer.on('call', call => {
            call.answer(stream);
        })
        socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
          });
        });
    };
    getDeviceMedia();
  }, []);
  console.log(videos);





  function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
    //   addVideoStream(video, userVideoStream)
    });
    call.on("close", () => {
      video.remove();
    });
  }

  function addVideoStream(video, stream) {
    video.current.srcObject = stream;
    video.current.onloadedmetadata = function (e) {
      video.current.play();
    };
    // videoGrid.append(video)
  }

  return (
    <div id='video-grid'>
      <div>Video</div>
      <video ref={video} autoPlay muted={true} />
    </div>
  );
};

export default Video;
