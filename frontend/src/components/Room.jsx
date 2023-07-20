import React, {useContext, useEffect} from 'react'
import { SocketContext } from '../Context.tsx'
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
    <div>Room</div>
  )
}

export default Room