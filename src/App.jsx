import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Forms from './components/Forms';
import Resultado from './components/Resultado';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/resultado" element={<Resultado />} />
      </Routes>
  );
}
