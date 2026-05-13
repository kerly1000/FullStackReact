import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Planets } from '../types/planets'

const PlanetsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [planet, setPlanet] = useState<Planets | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No planet ID provided");
            setLoading(false);
            return;
        }

        const fetchPlanet = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/planets/${(encodeURIComponent(id))}`);
                if (!response.ok) {
                    throw new Error(`Failed fetch planet (${response.status})`);
                }
                const data: Planets = await response.json();
                setPlanet(data);
            } catch (err) {
                setError(err?.message ?? "An unknown error occured");
            } finally {
                setLoading(false);
            }
        };

        fetchPlanet();
    }, [id]);

    if (loading) return <div style={{ padding: 20, color: 'red' }}>Loading</div>

    if (error) {
        return (
            <div style={{ padding: 20 }}>
                <h1>Planets Detail</h1>
                <p style={{ color: 'crimson' }}>Error: {error}</p>

                <div style={{ display: "flex", gap: 12 }}>
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <Link to="/planets">Back to list</Link>
                </div>

            </div>
        );
    }

    if (!planet) {
        return (
            <div style={{ padding: 20 }}>
                <h1>Planets Detail</h1>
                <p>Planet not found</p>
                <Link to="/planets">Back to list</Link>

            </div>
        )
    }



    return (
        <div style={{ padding: 20, maxWidth: 720, margin: "0 auto" }}>
            <h1>Planet Detail</h1>

            <table border={1} cellPadding={8} cellSpacing={0} style={{ width: "100%", marginTop: 10} }>
                <tbody>
                    <tr>
                        <th style={{ textAlign: "left", width: 200 }}>ID</th>
                        <td>{planet.planetsId }</td>
                    </tr>
                    <tr>
                        <th style={{ textAlign: "left", width: 200 }}>Name</th>
                        <td>{planet.name}</td>
                    </tr>
                    <tr>
                        <th style={{ textAlign: "left", width: 200 }}>Description</th>
                        <td>{planet.description}</td>
                    </tr>
                    <tr>
                        <th style={{ textAlign: "left", width: 200 }}>Type</th>
                        <td>{planet.type}</td>
                    </tr>
                    <tr>
                        <th style={{ textAlign: "left", width: 200 }}>Mass</th>
                        <td>{planet.mass}</td>
                    </tr>


                </tbody>
            </table>
            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
                <button type="button" className="success" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        </div> >
  );
}


export default PlanetsDetail;
