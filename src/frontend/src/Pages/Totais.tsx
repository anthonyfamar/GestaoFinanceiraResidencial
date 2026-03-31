import { useEffect, useState } from "react";
import { api } from "../Services/api";

export function Totais() {
    const [dados, setDados] = useState<any>(null);

    async function carregar() {
        //pega os dados do backend e salva
        const res = await api.get("/pessoas/totais");
        setDados(res.data);
    }

    //executa ao carregar a página
    useEffect(() => {
        carregar();
    }, []);

    if (!dados) return <div>Carregando...</div>;

    return (
        <div>
        {/*2 tipos de listagem/consultas*/}
            <h2>Totais por Pessoa</h2>

            <ul>
                {dados.pessoas.map((p: any) => (
                    <li key={p.pessoaId}>
                        {p.nome} | Receita: {p.receitas} | Despesa: {p.despesas} | Saldo: {p.saldo}
                    </li>
                ))}
            </ul>

            <h3>Total Geral</h3>
            <p>Receitas: {dados.totalGeral.totalReceitas}</p>
            <p>Despesas: {dados.totalGeral.totalDespesas}</p>
            <p>Saldo: {dados.totalGeral.saldoGeral}</p>
        </div>
    );
}