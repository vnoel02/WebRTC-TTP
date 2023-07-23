// import React, { useContext, useEffect, useRef, useState } from "react";
// import { SocketContext } from "../../Context.tsx";
// import { PeerContext } from "../../PeerContext.tsx";
// import Peer from "peerjs";
// import { SingleVid } from "./SingleVid.jsx";
// // import { Stream } from "stream";

// /*
// For now just focus on having a second vid display, worry about the rest later
// Have a second vid tag for the user in call
// */
// const Video = () => {
//   const video = useRef();
//   const userVideo = useRef();
// //   const userVideo2 = useRef();
// //   const [videos, setVideos] = useState([]);
//   const [userStream, setUserStream] = useState();
//   const [streams, setStreams] = useState([]);
//   const [peers, setPeers] = useState({});
//   const socket = useContext(SocketContext);
//   const peer = useContext(PeerContext);

//   useEffect(() => {
//     const getDeviceMedia = async () => {
//     //   const videoGrid = document.getElementById("video-grid");
//       const mediaStream = await navigator.mediaDevices
//         .getUserMedia({ audio: true, video: true })
//         .then((stream) => {
//           // Gets stream from user's camera
//             // console.log(stream);
//         //   video.current.srcObject = stream;
//           console.log("Setting stream from camera")
//           video.current.srcObject = stream
//         // setStreams((media) => [...media, stream]);
         

//           // Allows other users to see current video stream
        
//             peer.on("call", call => {
//                 // console.log("hello")
//                 // console.log(call);
//                 call.answer(stream);
//                 // console.log("stream", stream)
//                 //Basically asking other peers to give me their stream
//                 console.log("hello", call.peer)
//                 // setStreams((media) => [...media, stream]);
//                 setPeers((peers)=> ({...peers, [call.peer]:stream}))
//                 // setPeers((peers) => ({...peers, hello: "world"}))
//                 // setPeers((peers)=> ({...peers, [socket.id]:stream}))
    
//                 call.on("stream", (userVideoStream) => {
//                 //   userVideo.current.srcObject = userVideoStream;
//                   console.log("Setting stream from user")
//                 //   setStreams((media) => [...media, userVideoStream]);
//                 setPeers({...peers, [call.peer]:userVideoStream})
//                 // setPeers((peers) => ({...peers, hello: "world"}))
//                 // setPeers((peers)=> ({...peers, [socket.id]:stream}))
//                 });
//               });
         
         
//           // When a user joins the room
//           socket.on('user-connected', (userId) => {
//            setTimeout(() => {
//             console.log("User-connected socket is listening with id ", userId)
//             // Send the user with our stream
//             const call = peer.call(userId, stream);
//             console.log("Stream being made", stream)
//             // Recieves the user's stream 
//             call.on("stream", (userVideoStream) => {
//                 console.log("UserVideoStream: ", userVideoStream)
//                 // setStreams((media) => [...media, userVideoStream]);
//                 setPeers((peers) => ({...peers, [call.peer]:userVideoStream}))
//                 // setPeers((peers) => ({...peers, hello: "world"}))
//                 // setPeers((peers)=> ({...peers, [socket.id]:stream}))
//                 console.log("Call listenter")
                
//             //   userVideo.current.srcObject = userVideoStream;
              
//             });
//             // call.on("close", () => {
//             //     console.log("Closing")
//             // });
//             // call.close()
//           }, 1000);
//            })
//            return ()=> socket.off('user-connected')

           
            
//         });
//     };
//     getDeviceMedia();
//   }, [peers]);
  
 

//     useEffect(() => {
//         socket.on('user-disconnected', (userId)=> {
//             console.log("Peers: ", peers)
//             console.log("A user disconnected ", userId);
//             // Loop through objects, if the id matches the disconnected id, delete it
           
//             // Object.keys(peers).map((peer, i)=> {
//             //     // console.log(peers[peer]);
//             //     if (peers[peer] === userId) {
//             //         delete peers[peer]
//             //     }
//             //     // return(
//             //     //     <SingleVid key={i} videoStream={peers[peer]}/>
                    
//             //     // ) 
//             // })

//             // streams.forEach((stream)=>{
//             //     console.log(stream.id)
//             //     if (!stream.active) {
//             //         stream = null;
//             //     }

//             // })
    
//             // const arr = streams;
//             // arr.splice(0,-1)
//             // setStreams((arr) => [...arr, arr.splice(0,-1)]);

//            })
//         return ()=> socket.off('user-disconnected');

           
        
//     }, [peers]);


//     const set = new Set(streams);
//     const arrStream = Array.from(set)
//     console.log("Array of peers: ", peers);
    
//   return (
//     <div >
//       <div>Video</div>
//       <video ref={video} autoPlay muted={true}></video>
//       {

//         Object.keys(peers).map((peer, i)=> {
//             // console.log(peers[peer]);
//             return(
//                 <SingleVid key={i} videoStream={peers[peer]}/>
                
//             ) 
//         })
//       }
//       {/* {
//       arrStream.map((stream, i) => {
//         console.log("Stream in map: " , stream)
//         return (
//            <SingleVid key={i} videoStream={stream} userId={socket.id}/>
//         )
//       })} */}


//       {/* Video tag from camera */}
//       {/* <video ref={video} autoPlay muted={true} /> */}
//       {/*Video from users */}
//       {/* <video ref={userVideo} autoPlay muted={true} /> */}
//       {/* <video ref={userVideo2} autoPlay muted={true} /> */}
//       {/* <video ref ={userVideo2} autoPlay muted={true} /> */}
//     </div>
//   );
// };

// export default Video;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { SocketContext } from "../../Context.tsx";
// import { PeerContext } from "../../PeerContext.tsx";
// import Peer from "peerjs";
// import { SingleVid } from "./SingleVid.jsx";

// const Video = () => {
//   const video = useRef();
//   const userVideo = useRef();
//   const [userStream, setUserStream] = useState();
//   const [peers, setPeers] = useState({});
//   const socket = useContext(SocketContext);
//   const peer = useContext(PeerContext);

//   useEffect(() => {
//     const getDeviceMedia = async () => {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//       video.current.srcObject = mediaStream;
//       setUserStream(mediaStream);

//       peer.on("call", (call) => {
//         call.answer(mediaStream);
//         call.on("stream", (userVideoStream) => {
//           setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
//         });
//       });

//       socket.on("user-connected", (userId) => {
//         setTimeout(() => {
//           const call = peer.call(userId, mediaStream);
//           call.on("stream", (userVideoStream) => {
//             setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
//           });
//         }, 1000);
//       });

//       return () => {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       };
//     };

//     getDeviceMedia();
//   }, []);

//   useEffect(() => {
//     const handleUserDisconnected = (userId) => {
//       setPeers((prevPeers) => {
//         const newPeers = { ...prevPeers };
//         delete newPeers[userId];
//         return newPeers;
//       });
//     };

//     socket.on("user-disconnected", handleUserDisconnected);

//     return () => {
//       socket.off("user-disconnected", handleUserDisconnected);
//     };
//   }, []);

//   useEffect(() => {
//     peer.on("open", (peerId) => {
//       console.log("My Peer ID:", peerId);
//     });

//     return () => {
//       peer.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <div>Video</div>
//       <video ref={video} autoPlay muted={true}></video>
//       {Object.keys(peers).map((peerId, i) => (
//         <SingleVid key={i} videoStream={peers[peerId]} />
//       ))}
//     </div>
//   );
// };

// export default Video;

import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../Context.tsx";
import { PeerContext } from "../../PeerContext.tsx";
import Peer from "peerjs";
import { SingleVid } from "./SingleVid.jsx";

const Video = () => {
  const video = useRef();
  const userVideo = useRef();
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState({});
  const [isMounted, setIsMounted] = useState(true);
  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);

  useEffect(() => {
    const getDeviceMedia = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (isMounted && video.current && mediaStream) {
      video.current.srcObject = mediaStream;
    }
      setUserStream(mediaStream);

      peer.on("call", (call) => {
        // console.log("User id", userId)
        call.answer(mediaStream);
        call.on("stream", (userVideoStream) => {
          setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
        // setPeers((prevPeers) => ({ ...prevPeers, [userId]: userVideoStream }));
        });
      });

      socket.on("user-connected", (userId) => {
        setTimeout(() => {
            console.log("userid in user-connected", userId);
          const call = peer.call(userId, mediaStream);
          call.on("stream", (userVideoStream) => {
            setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userVideoStream }));
            // setPeers((prevPeers) => ({ ...prevPeers, [userId]: userVideoStream }));
          });
        }, 1000);
      });

      return () => {
        setIsMounted(false);
        mediaStream.getTracks().forEach((track) => track.stop());
      };
    };

    getDeviceMedia();
  }, []);

  useEffect(() => {
    const handleUserDisconnected = (userId) => {
    console.log("handling user disconnect", userId);
    if (isMounted) {
        // Clean up resources for the disconnected peer
        setPeers((prevPeers) => {
          const newPeers = { ...prevPeers };
          delete newPeers[userId];
          return newPeers;
        });
      }
    };

    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, []);

  useEffect(() => {
    peer.on("open", (peerId) => {
      console.log("My Peer ID:", peerId);
    });

    peer.on("call", (call) => {
      call.on("close", () => {
        console.log("Cleaning up resorces")
        // Clean up resources for the disconnected peer
        if (isMounted) {
            // Clean up resources for the disconnected peer
            setPeers((prevPeers) => {
              const newPeers = { ...prevPeers };
              delete newPeers[call.peer];
              return newPeers;
            });
          }
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);
  console.log(peers)
  return (
    <div>
      <div>Video</div>
      <video ref={video} autoPlay muted={true}></video>
      {Object.keys(peers).map((peerId, i) => (
        <SingleVid key={i} videoStream={peers[peerId]} />
      ))}
    </div>
  );
};

export default Video;