import React, {useContext, useEffect} from 'react'
import { SocketContext } from '../Context.tsx'
import Video from './Video/Video.jsx';
const Room = () => {
  const socket = useContext(SocketContext);

  useEffect(()=> {
    socket.on('user-connected', userId => {
        console.log('User-connected: ' + userId)
    })
    return ()=> socket.off('user-connected')
  }, [])

//   useEffect(() => {
//     socket.
//   })
  return (
    <div>
        <div>Room</div>
      
        <Video/>
    </div>
    

  )
}

export default Room