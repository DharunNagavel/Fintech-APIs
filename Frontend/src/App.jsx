import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { Payment } from './pages/Payment';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>   
        <Route path="/signin" element={<Login/>}/>   
        <Route path="/signup" element={<Signup/>}/>   
        <Route path="/payment" element={<Payment/>}/>   
      </Routes>
    </BrowserRouter>
  );
}

export default App;