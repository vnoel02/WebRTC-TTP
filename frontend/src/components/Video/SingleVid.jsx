// import React, { useEffect, useRef } from 'react'

// export const SingleVid = ({videoStream, userId}) => 
// {
//     const video = useRef();
//     // console.log(videoStream)
//     useEffect(()=> {
//         console.log("VideoStream: ",videoStream)
//         // if (videoStream.length===0) {
//             video.current.srcObject = videoStream
//         // }
        
//         // video.current.onloadedmetadata = () => {
//         //     video.play();
//         // }
//     }, [])
//     console.log(video)
//     console.log(videoStream);
//   return (
//     <div>
//         {/* <div>SingleVid</div> */}
//      <video ref={video} autoPlay muted={true} />
       
//     </div>

//   )
// }

import React, { useEffect, useRef } from 'react';

export const SingleVid = ({ videoStream }) => {
  const video = useRef();
  

  useEffect(() => {
    const setVideoStream = () => {
        
      if (videoStream) {
        video.current.srcObject = videoStream;
      }
    };
    console.log("video", video)
    // Call the function immediately to set the video stream (if available)
    setVideoStream();
  
    return () => {
      // Clean up resources when the component unmounts
    //   if (video.current.srcObject) {
    //     video.current.srcObject.getTracks().forEach(track => track.stop());
    //   }
    };
  }, [videoStream]);
  

  return (
    <div>
      {/* <div>SingleVid</div> */}
      {video?( <video ref={video} autoPlay muted={true} />) :(<></>)}
     
    </div>
  );
};