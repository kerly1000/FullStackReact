
import { useEffect, useState } from "react";
import type { Planets } from "../types/planets";
import { useNavigate } from "react-router-dom";

function PlanetsList() {
    const [planets, setPlanets] = useState<Planets[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    //loob ühenduse controlleriga, mille nimi on PlanetsController
    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("/api/Planets");
                if (response.ok) {
                    const data = await response.json();
                    setPlanets(data);
                }
            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to load planets";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanets();
    }, []);

    const openCreate = () => {
        navigate("/planets/create");
    }


    return (
        <div className="page-card">
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 style={{ margin: 0 }}>Planets List</h1>
                <button type="button" className="success" onClick={openCreate}>
                    + Create
                </button>
            </div>

            {!loading && !error && (
                <table border={1} cellPadding={8} style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 16
                }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Types</th>
                            <th>Mass</th>
                            <th style={{ width: 220 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planets.length > 0 ? (
                            planets.map((planet) => (
                                <tr key={planet.planetsId}>
                                    <td>{planet.planetsId}</td>
                                    <td>{planet.name}</td>
                                    <td>{planet.description}</td>
                                    <td>{planet.type}</td>
                                    <td>{planet.mass}</td>
                                    <td>
                                        siia teha nupud edit, details ja delete
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Loading planets or data not found...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PlanetsList;