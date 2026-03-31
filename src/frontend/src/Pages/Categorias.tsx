import { useEffect, useState } from "react";
import { api } from "../Services/api";
import { Alerta } from "../Components/Alerta";

type Categoria = {
    id: number;
    descricao: string;
    finalidade: number;
};

export function Categorias() {
    //estado principal de como vem do backend
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [descricao, setDescricao] = useState("");
    const [finalidade, setFinalidade] = useState(1);

    //fiz outro mapeamento por ser um tipo padrão fixo
    const finalidadeMap: Record<number, string> = {
        1: "Receita",
        2: "Despesa",
        3: "Ambas"
    };

    const [alerta, setAlerta] = useState<{
        mensagem: string;
        tipo: "erro" | "sucesso" | "aviso";
    } | null>(null);

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
        setAlerta(null);

        if (!descricao?.trim() || finalidade === 0) {
            setAlerta({
                mensagem: "Preencha a descrição e selecione a finalidade.",
                tipo: "aviso"
            });
            return;
        }

        try {
            await api.post("/categorias", { descricao: descricao.trim(), finalidade });

            setAlerta({ mensagem: "Categoria criada com sucesso!", tipo: "sucesso" });
            carregar();

        } catch (err: any) {
            const mensagemErro = err.response?.data?.detail
                || String(err.response?.data || "Erro ao criar categoria.");

            setAlerta({ mensagem: mensagemErro, tipo: "erro" });
        }
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

            <div className="form-row" style={{marginBottom: "15px"} }>
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

            {alerta && (
                <Alerta
                    mensagem={alerta.mensagem}
                    tipo={alerta.tipo}
                    onFechar={() => setAlerta(null)}
                />
            )}

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