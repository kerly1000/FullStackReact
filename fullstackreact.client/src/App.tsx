import {  } from 'react';
import './App.css';
import PlanetsList from './views/PlanetsList';
import { Routes, Route, Navigate } from "react-router-dom";


function App() {
    return (
        <Routes>
                <Route path="/" element={<Navigate to="/planets" replace />} />
                <Route path="/planets" element={<PlanetsList />} />
        </Routes>   
        
    );
};


export default App;