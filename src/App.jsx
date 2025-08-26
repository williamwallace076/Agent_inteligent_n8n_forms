import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Resultado from './pages/Resultado';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
  );
}