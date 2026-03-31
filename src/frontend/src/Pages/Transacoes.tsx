import { useEffect, useState } from "react";
import { api } from "../Services/api";

//aqui é onde define os tipos de dados que vem do backend
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
    //estado principal de como vem do backend
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    //estado do form q é como usuario digita ou seleciona
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState(1); // coloquei pra iniciar como receita
    const [pessoaId, setPessoaId] = useState(0);
    const [categoriaId, setCategoriaId] = useState(0);

    //fiz um mapeamento por ser um tipo padrão fixo
    const tipoMap: Record<number, string> = {
        1: "Receita",
        2: "Despesa"
    };

    //Faz requisição para o backend pegando os dados
    async function carregar() {
        const [t, p, c] = await Promise.all([
            api.get("/transacoes"),
            api.get("/pessoas"),
            api.get("/categorias")
        ]);

        //salva os dados
        setTransacoes(t.data);
        setPessoas(p.data);
        setCategorias(c.data);
    }

    async function criar() {
        if (!pessoaId || !categoriaId) {
            alert("Selecione pessoa e categoria");
            return;
        }

        //envia os dados para o backend
        await api.post("/transacoes", {
            valor,
            tipo,
            pessoaId,
            categoriaId
        });

        //aqui recarregaa a lista atualizada
        carregar();
    }

    async function deletar(id: number) {
        await api.delete(`/transacoes/${id}`);
        carregar();
    }

    //executa ao carregar a página
    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Transações</h2>

            {/*form para preencher*/}
            <input type="number" placeholder="Valor" onChange={e => setValor(Number(e.target.value))} />

            <select value={tipo} onChange={e => setTipo(Number(e.target.value))}>
                {Object.entries(tipoMap).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))}
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

            {/*lista com o botão de excluir*/}
            <ul>
                {transacoes.map(t => (
                    <li key={t.id}>
                        {t.valor} - {tipoMap[t.tipo] ?? "Desconhecido"}
                        <button onClick={() => deletar(t.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}