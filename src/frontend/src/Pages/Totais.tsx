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
            <h2>Totais por Pessoa</h2>

            {/* Cards de resumo geral — 3 cards lado a lado */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Total Receitas
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1d8a36" }}>
                        R$ {dados.totalGeral.totalReceitas.toFixed(2)}
                    </div>
                </div>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Total Despesas
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ad1826" }}>
                        R$ {dados.totalGeral.totalDespesas.toFixed(2)}
                    </div>
                </div>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Saldo
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0f6b7a" }}>
                        R$ {dados.totalGeral.saldoGeral.toFixed(2)}
                    </div>
                </div>

            </div>

            {/* Tabela por pessoa */}
            <h3 className="lista">Por Pessoa</h3>

            <table>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.pessoas.map((p: any) => (
                        <tr key={p.pessoaId}>
                            <td>{p.nome}</td>
                            <td style={{ color: "#1d8a36" }}>
                                {p.receitas > 0 ? `R$ ${p.receitas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{ color: "#ad1826" }}>
                                {p.despesas > 0 ? `R$ ${p.despesas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{ color: p.saldo >= 0 ? "#0f6b7a" : "#ad1826", fontWeight: "500" }}>
                                R$ {p.saldo.toFixed(2)}
                            </td>
                        </tr>
                    ))}

                    {/* Linha de total geral no final da tabela */}
                    <tr style={{ fontWeight: "bold", borderTop: "2px solid #ddd", background: "#f9f9f9" }}>
                        <td>Total geral</td>
                        <td style={{ color: "#1d8a36" }}>
                            R$ {dados.totalGeral.totalReceitas.toFixed(2)}
                        </td>
                        <td style={{ color: "#ad1826" }}>
                            R$ {dados.totalGeral.totalDespesas.toFixed(2)}
                        </td>
                        <td style={{ color: "#0f6b7a" }}>
                            R$ {dados.totalGeral.saldoGeral.toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}