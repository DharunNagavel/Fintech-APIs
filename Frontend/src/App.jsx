import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>   
        <Route path="/signin" element={<Login/>}/>   
        <Route path="/signup" element={<Signup/>}/>   
      </Routes>
    </BrowserRouter>
  );
}

export default App;