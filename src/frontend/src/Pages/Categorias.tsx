import { useEffect, useState } from "react";
import { api } from "../Services/api";

type Categoria = {
    id: number;
    descricao: string;
    finalidade: number;
};

export function Categorias() {
    //estado principal de como vem do backend
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [descricao, setDescricao] = useState("");
    const [finalidade, setFinalidade] = useState(0);

    //fiz outro mapeamento por ser um tipo padrão fixo
    const finalidadeMap: Record<number, string> = {
        1: "Receita",
        2: "Despesa",
        3: "Ambas"
    };

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
            <h2>Cadastro de categorias</h2>

            <input
                placeholder="Nome"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
            />
            <select value={finalidade} onChange={e => setFinalidade(Number(e.target.value))}>
                {Object.entries(finalidadeMap).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
            </select>
            <button className="button-criar" onClick={criar}>Criar</button>

            <ul>
                {categorias.map(c => (
                    <li key={c.id}>
                        {c.descricao} - {finalidadeMap[c.finalidade]}
                        <button onClick={() => deletar(c.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}