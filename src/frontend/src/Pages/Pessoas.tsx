import { useEffect, useState } from "react";
import { api } from "../Services/api";

export function Pessoas() {
    const [pessoas, setPessoas] = useState<any[]>([]);
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);

    //pega os dados do backend e salva
    async function carregar() {
        const res = await api.get("/pessoas");
        setPessoas(res.data);
    }

    //envia os dados para o backend e depois recarrega a lista
    async function criar() {
        await api.post("/pessoas", { nome, idade });
        carregar();
    }

    //envia o id para o backend deletar e depois recarrega a lista
    async function deletar(id: number) {
        await api.delete(`/pessoas/${id}`);
        carregar();
    }

    //executa ao carregar a página
    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Cadastro de pessoas</h2>

            <div className="form-row">
                <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
                <input type="number" placeholder="Idade" onChange={e => setIdade(Number(e.target.value))} />
                <button className="btn-criar" onClick={criar}>Criar</button>
            </div>

            <hr />

            {/*lista de pessoas*/}
            <h3 className="lista">Lista</h3>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {pessoas.map(p => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.idade}</td>
                            <td>
                                <button className="btn-editar">✎</button>
                                <button className="btn-deletar" onClick={() => deletar(p.id)}>✖</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "15px" }}>
                ⚠ Deletar uma pessoa remove todas as suas transações.
            </div>
        </div>
    );
}