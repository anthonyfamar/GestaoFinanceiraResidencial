import { useEffect, useState } from "react";
import { api } from "../Services/api";

type Pessoa = {
    id: number;
    nome: string;
};

type Categoria = {
    id: number;
    descricao: string;
};

type Transacao = {
    id: number;
    valor: number;
    tipo: number;
    pessoaId: number;
    categoriaId: number;
};

export function Transacoes() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState(0);
    const [pessoaId, setPessoaId] = useState(0);
    const [categoriaId, setCategoriaId] = useState(0);

    async function carregar() {
        const [t, p, c] = await Promise.all([
            api.get("/transacoes"),
            api.get("/pessoas"),
            api.get("/categorias")
        ]);

        setTransacoes(t.data);
        setPessoas(p.data);
        setCategorias(c.data);
    }

    async function criar() {
        if (!pessoaId || !categoriaId) {
            alert("Selecione pessoa e categoria");
            return;
        }

        await api.post("/transacoes", {
            valor,
            tipo,
            pessoaId,
            categoriaId
        });

        carregar();
    }

    async function deletar(id: number) {
        await api.delete(`/transacoes/${id}`);
        carregar();
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Transações</h2>

            <input type="number" placeholder="Valor" onChange={e => setValor(Number(e.target.value))} />

            <select onChange={e => setTipo(Number(e.target.value))}>
                <option value={1}>Receita</option>
                <option value={2}>Despesa</option>
            </select>

            <select onChange={e => setPessoaId(Number(e.target.value))}>
                <option value={0}>Selecione Pessoa</option>
                {pessoas.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
            </select>

            <select onChange={e => setCategoriaId(Number(e.target.value))}>
                <option value={0}>Selecione Categoria</option>
                {categorias.map(c => (
                    <option key={c.id} value={c.id}>{c.descricao}</option>
                ))}
            </select>

            <button onClick={criar}>Criar</button>

            <ul>
                {transacoes.map(t => (
                    <li key={t.id}>
                        {t.valor} - {t.tipo === 1 ? "Receita" : "Despesa"}
                        <button onClick={() => deletar(t.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}