import { useEffect, useState } from "react";
import { api } from "../Services/api";

type Categoria = {
    id: number;
    nome: string;
};

export function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nome, setNome] = useState("");

    async function carregar() {
        const res = await api.get("/categorias");
        setCategorias(res.data);
    }

    async function criar() {
        await api.post("/categorias", { nome });
        setNome("");
        carregar();
    }

    async function deletar(id: number) {
        await api.delete(`/categorias/${id}`);
        carregar();
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Categorias</h2>

            <input
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <button onClick={criar}>Criar</button>

            <ul>
                {categorias.map(c => (
                    <li key={c.id}>
                        {c.nome}
                        <button onClick={() => deletar(c.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}