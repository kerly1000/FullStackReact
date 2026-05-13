import { useNavigate } from "react-router-dom";
import { useState } from "react";


type FormState = {
    //id: string;
    name: string;
    description: string;
    type: string;
    mass: number;
}

export default function PlanetsCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormState>({
        //id: "",
        name: "",
        description: "",
        type: "",
        mass: 0
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);

            const payload = {
                name: form.name,
                description: form.description || null,
                type: form.type || null,
                mass: form.mass ? Number(form.mass) : null
            }

            const res = await fetch("/api/Planets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Failed to create planet (${res.status})`);
            }

            navigate("/planets");

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Error creating planet");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page-card">
            <h1>Create Planets</h1>

            {error && <p style={{ color: "crimson" }}></p>}

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
                <div>
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={onChange} required style={{ width: "100%", padding: 8 }} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={onChange} style={{ width: "100%", padding: 8 }} />
                </div>
                <div>
                    <label>Type</label>
                    <input name="type" value={form.type} onChange={onChange} style={{ width: "100%", padding: 8 }} />
                </div>
                <div>
                    <label>Mass</label>
                    <input name="mass" type="number" value={form.mass} onChange={onChange} style={{ width: "100%", padding: 8 }} />
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button className="primary" type="submit" disabled={saving}>
                        {saving ? "Creating..." : "Create Planet"}
                    </button>
                    <button className="secondary" type="button" onClick={() => navigate("/planets")}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}