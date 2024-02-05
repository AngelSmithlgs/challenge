import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import User from './components/user/User';
import Home from './components/home/home';
import R from './components/R/R';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/r" element={<R />} />
      </Routes>
    </Router>
  );
}

export default App;
