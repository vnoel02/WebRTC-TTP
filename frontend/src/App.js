import logo from './logo.svg';
import './App.css';
import { SocketProvider } from './Context.tsx';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Room from './components/Room';
import { PeerProvider } from './PeerContext.tsx';

function App() {
  return (
    <PeerProvider>
      <SocketProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/room/:id" element={<Room/>}/>
      </Routes>

      </Router>

      
    </SocketProvider>
    </PeerProvider>
    
    
  );
}

export default App;
