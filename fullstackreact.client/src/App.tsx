import { Routes, Route, Navigate } from "react-router-dom"
import PlanetsList from './views/PlanetsList';
import PlanetsCreate from './views/PlanetsCreate';
import PlanetsDetail from './views/PlanetsDetail';
import PlanetsEdit from './views/PlanetsEdit';


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/planets" replace />} />

            <Route path="/planets" element={<PlanetsList />} />
            <Route path="/planets/create" element={<PlanetsCreate />} />
            <Route path="/planets/:planetsId" element={<PlanetsDetail />} />
            <Route path="/planets/:planetsId/edit" element={<PlanetsEdit />} />
        </Routes>
    );
}