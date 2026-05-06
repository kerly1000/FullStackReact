import { useCallback, useEffect, useState } from "react";
import type { Planets } from "../types/planets";
//import { useNavigate } from "react-router-dom";

function PlanetsList() {
    const [planets, setPlanets] = useState<Planets[]>([]);
    //const navigate = useNavigate();

    //loob ühenduse controlleriga, mille nimi on PlanetsController 
    const fetchPlanets = useCallback(async () => {
        try {
            const response = await fetch("api/planets");
            if (response.ok) {
                const data = await response.json();
                setPlanets(data);
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }

    }, []);

    useEffect(() => {
        (async () => {
            await fetchPlanets();
        })();
    }, [fetchPlanets]);

    return (
        <div className="container">
            <h1>Planet List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <body>
                    {planets.length > 0 ? (
                        planets.map((planet) => (
                            <tr> key={planet.planetsId}
                                <td>{planet.planetsId}</td>
                                <td>{planet.name}</td>
                                <td>{planet.type}</td>
                                <td>
                                    siia teha nupp detaili vaatesse
                                </td>

                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td>Loading planets or data not found....</td>
                            </tr>
                    ) }
                </body>
            </table>
        </div>

  );
}

export default PlanetsList;