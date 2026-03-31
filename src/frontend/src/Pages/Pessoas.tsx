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
            <h2>Pessoas</h2>

            <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
            <input type="number" placeholder="Idade" onChange={e => setIdade(Number(e.target.value))} />
            <button onClick={criar}>Criar</button>

            {/*lista de pessoas*/}
            <ul>
                {pessoas.map(p => (
                    <li key={p.id}>
                        {p.nome} - {p.idade}
                        <button onClick={() => deletar(p.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}