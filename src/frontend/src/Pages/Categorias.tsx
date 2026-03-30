import { useEffect, useState } from "react";
import { api } from "../Services/api";

type Categoria = {
    id: number;
    descricao: string;
    finalidade: number;
};

export function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [descricao, setDescricao] = useState("");
    const [finalidade, setFinalidade] = useState(0);

    async function carregar() {
        const res = await api.get("/categorias");
        setCategorias(res.data);
    }

    async function criar() {
        await api.post("/categorias", { descricao, finalidade });
        setDescricao("");
        setFinalidade(0);
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
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />
            <select value={finalidade} onChange={e => setFinalidade(Number(e.target.value))}>
                <option value={1}>Receita</option>
                <option value={2}>Despesa</option>
            </select>
            <button onClick={criar}>Criar</button>

            <ul>
                {categorias.map(c => (
                    <li key={c.id}>
                        {c.descricao} - {c.finalidade === 1 ? "Receita" : "Despesa"}
                        <button onClick={() => deletar(c.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}