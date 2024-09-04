import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register'; // Ensure this path is correct
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
        <Route path="/" element={<Home />} /> {/* Home component as the main page */}
      </Routes>
    </Router>
  );
}

export default App;



