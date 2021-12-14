import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import ER from './pages/ER';
import AF from './pages/AF';
import GR from './pages/GR';

import './global.scss';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='page-container'>
        <Routes>
          <Route exact path='/' element={<ER />} />
          <Route path='automato-finito' element={<AF />} />
          <Route path='gramatica-regular' element={<GR />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
