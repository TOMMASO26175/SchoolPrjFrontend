import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/Auth';
import Home from './components/Home';
import SignUp from './user/Signup';
import Login from './user/Login';
import { ReqAuth } from './components/ReqAuth'
const App = () => {
  window.onbeforeunload = null;
  return (
    <Router>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<ReqAuth> <Home/> </ReqAuth>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
