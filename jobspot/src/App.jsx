import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './styles/App.css'

import { Home } from './components/Home'
import { Add } from './components/Add'
import { Details } from './components/Details'
import { Edit } from './components/Edit'
import { Login } from './components/Login'
import { Register } from './components/Register'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/add" element={<Add />} />

        <Route path="/:id/edit" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>

  );
}

export default App

