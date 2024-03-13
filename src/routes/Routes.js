import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '../components/Form';
import GoogleAuth from '../components/Login';
import Main from '../components/Main';
import style from '../App.css';

function Rutas() {

    const [userData, setUserData] = useState(null);

    return (
       <BrowserRouter>
       <Routes>
            <Route path='/' element={<GoogleAuth setUserData={setUserData} />} />
            <Route path='/main' element={<Main userData={userData} />} />
            <Route path='/form' element={
            <>
            <Main userData={userData} />
            <Form userData={userData} />
            </>} />
        </Routes>
       </BrowserRouter>
    );
}

export default Rutas