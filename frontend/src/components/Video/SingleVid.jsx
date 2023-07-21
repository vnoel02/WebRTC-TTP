import React, { useEffect, useRef } from 'react'

export const SingleVid = ({videoStream}) => 
{
    const video = useRef();
    console.log(videoStream)
    useEffect(()=> {
        video.current.srcObject = videoStream
    }, [])
  return (
    <div>
        <div>SingleVid</div>
        <video ref={video} autoPlay muted={true} />
    </div>

  )
}
