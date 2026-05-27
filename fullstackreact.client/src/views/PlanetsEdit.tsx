import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Planets } from '../types/planets';

type FormState = {
    name: string;
    description: string;
    type: string;
    mass: number;
}

export default function PlanetsEdit() {
    const { planetsId } = useParams<{ planetsId: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: "",
        description: "",
        type: "",
        mass: 0
    });

    useEffect(() => {
        const load = async () => {
            //vaatabe, kas planetsId on olemas, kui ei ole, siis näitab errorit ja lõpetab laadimise
            if (!planetsId) {
                setError("No planet ID provided");
                setLoading(false);
                return;
            }

            //laeb planeedi andmed serverist, et neid vormi täita
            try {
                setLoading(true);
                setError(null);

                //kood, mis saadab päringu serverile, et saada planeedi andmed
                const response = await fetch(`/api/planets/${(encodeURIComponent(planetsId))}`);
                //kui server vastab veaga, siis viskab errori
                if (!response.ok) throw new Error(`Failed to fetch planet (${response.status})`);
                //kui server vastab edukalt, siis võtab vastuse JSON-ina ja täidab vormi andmetega
                const data: Planets = await response.json();
                //täidab vormi andmetega
                setForm({
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    mass: data.mass
                });
            } catch (err) {
                //kui tekib viga, siis näitab errorit
                setError(err instanceof Error ? err.message : "Failed to load planet");
            } finally {
                //lõpetab laadimise
                setLoading(false);
            }
        };
        load();
    }, [planetsId]);

    //kood, mis käivitub siis, kui kasutaja muudab vormi välju
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    //kood, mis käivitub siis, kui kasutaja klõpsab "Save" nuppu
    const onSubmit = async (e: React.FormEvent) => {
        //peab takistama vormi vaikimisi käitumist, mis on lehe uuesti laadimine
        e.preventDefault();
        if (!planetsId) {
            setError("No planet ID provided");
            return;
        }

        try {
            setSaving(true);
            setError(null);

            //valmistab andmed, mis saadetakse serverile
            const payload = {
                name: form.name,
                description: form.description || null,
                type: form.type || null,
                mass: form.mass ? Number(form.mass) : null
            };

            //saadab päringu serverile, et uuendada planeedi andmeid
            //put tähendab, et me tahame muuta olemasolevat ressurssi, mille ID on planetsId
            const res = await fetch(`/api/Planets/${encodeURIComponent(planetsId)}`, {
                method: "PUT",
                //määrab, et saadame andmed JSON-formaadis
                headers: { "Content-Type": "application/json" },
                //saadab andmed serverile JSON-stringina
                body: JSON.stringify(payload),
            });
            //kui server vastab veaga, siis viskab errori
            if (!res.ok) {
                throw new Error(`Failed to update planet (${res.status})`);
            }
            //kui server vastab edukalt, siis suunab kasutaja planeedi detailvaatesse
            navigate(`/planets/${encodeURIComponent(planetsId)}`);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update planet");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>

    return (
        <div className="page-card">
            <h1>Edit School</h1>

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
                <div>
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={onChange} required style={{ width: "100%", padding: 8 }} />
                </div>

                <div>
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={onChange} rows={3} style={{ width: "100%", padding: 8 }} />
                </div>

                <div>
                    <label>Type</label>
                    <textarea name="type" value={form.type} onChange={onChange} rows={3} style={{ width: "100%", padding: 8 }} />
                </div>

                <div>
                    <label>Mass</label>
                    <input
                        name="mass"
                        value={form.mass}
                        onChange={onChange}
                        inputMode="numeric"
                        style={{ width: "100%", padding: 8 }}
                    />
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button className="primary" type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button className="success" type="button" onClick={() => navigate(-1)} disabled={saving}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}