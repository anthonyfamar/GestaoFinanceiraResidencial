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

    function getFinalidadeTexto(finalidade: number) {
        const map: Record<number, string> = {
            1: "Receita",
            2: "Despesa",
            3: "Ambas"
        };
        return map[finalidade] ?? "Desconhecido";
    }

    function getBadgeClass(finalidade: number) {
        const map: Record<number, string> = {
            1: "badge-green",
            2: "badge-red",
            3: "badge-blue"
        };
        return map[finalidade];
    }

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

            <div className="form-row">
                <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />

                <select value={finalidade} onChange={e => setFinalidade(Number(e.target.value))}>
                    {Object.entries(finalidadeMap).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>

                <button className="btn-criar" onClick={criar}>Criar</button>
            </div>

            <hr />

            <h3 className="lista">Lista</h3>
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Finalidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {categorias.map(c => (
                        <tr key={c.id}>
                            <td>{c.descricao}</td>
                            <td>
                                <span className={`badge ${getBadgeClass(c.finalidade)}`}>
                                    {getFinalidadeTexto(c.finalidade)}
                                </span>
                            </td>
                            <td>
                                <button className="btn-editar">✎</button>
                                <button className="btn-deletar" onClick={() => deletar(c.id)}>✖</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}