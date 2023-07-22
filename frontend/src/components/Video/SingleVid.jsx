import React, { useEffect, useRef } from 'react'

export const SingleVid = ({videoStream, userId}) => 
{
    const video = useRef();
    // console.log(videoStream)
    useEffect(()=> {
        console.log(videoStream)
        video.current.srcObject = videoStream
        // video.current.onloadedmetadata = () => {
        //     video.play();
        // }
    }, [])
    console.log(video)
    console.log(userId);
  return (
    <div>
        {/* <div>SingleVid</div> */}
        {userId? ( <video ref={video} autoPlay muted={true} />) : (<></>)}
       
    </div>

  )
}
