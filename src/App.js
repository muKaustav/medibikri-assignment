import React from 'react';
import Home from './pages/Home/Home.jsx';
import Detail from './pages/Detail/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/detail/:id' exact element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
