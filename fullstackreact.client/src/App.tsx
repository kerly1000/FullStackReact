import {  } from 'react';
import './App.css';
import PlanetsList from './views/PlanetsList';
import { Routes, Route, Navigate } from "react-router-dom";
import PlanetsCreate from './views/PlanetsCreate';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/planets" replace />} />
            <Route path="/planets" element={<PlanetsList />} />
            <Route path="/planets/create" element={<PlanetsCreate />} />
        </Routes>   
        
    );
};


export default App;