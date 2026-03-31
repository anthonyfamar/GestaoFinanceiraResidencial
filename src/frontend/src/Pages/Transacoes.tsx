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
    const [tipo, setTipo] = useState(0); // coloquei pra iniciar como receita
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
            <div className="card-transacoes">
                <h2>Nova transação</h2>
                {/*form para preencher*/}
                <div className="form-row" style={{ marginBottom: "15px" }}>
                    <select onChange={e => setPessoaId(Number(e.target.value))}>
                        <option value={0}>Selecione a pessoa:</option>
                        {pessoas.map(p => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row" style={{ marginBottom: "15px" }}>
                    <select value={tipo} onChange={e => setTipo(Number(e.target.value))}>
                        <option value={0}>Selecione o tipo:</option>
                        {Object.entries(tipoMap).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row" style={{ marginBottom: "15px" }}>
                    <select onChange={e => setCategoriaId(Number(e.target.value))}>
                        <option value={0}>Selecione a descrição:</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.id}>{c.descricao}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row" style={{ marginBottom: "15px" }}>
                    <input type="number" placeholder="Valor (R$)" onChange={e => setValor(Number(e.target.value))} />
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                    <button className="btn-criar" onClick={criar}>Criar</button>
                </div>

            </div>

            {/*lista com o botão de excluir*/}
            <h3>Histórico de transações</h3>
            <table>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map(t => {
                        const pessoa = pessoas.find(p => p.id === t.pessoaId);
                        const categoria = categorias.find(c => c.id === t.categoriaId);

                        return (
                            <tr key={t.id}>
                                <td>{pessoa?.nome}</td>
                                <td>{categoria?.descricao}</td>
                                <td>
                                    <span className={`badge ${t.tipo === 1 ? "badge-green" : "badge-red"}`}>
                                        {tipoMap[t.tipo]}
                                    </span>
                                </td>
                                <td>R$ {t.valor.toFixed(2)}</td>
                                <td>
                                    <button className="btn-deletar" onClick={() => deletar(t.id)}>✖</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}