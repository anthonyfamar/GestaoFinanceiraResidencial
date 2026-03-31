import { useEffect, useState } from "react";
import { api } from "../Services/api";

export function Totais() {
    const [totaisPessoas, setTotaisPessoas] = useState<any>(null);
    const [totaisCategorias, setTotaisCategorias] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    async function carregarTotaisPessoas() {
        try {
            const res = await api.get("/pessoas/totais");
            setTotaisPessoas(res.data);
        } catch (err: any) {
            console.error("Erro ao carregar totais por pessoa:", err);
            setErro("Erro ao carregar totais por pessoa.");
        }
    }

    async function carregarTotaisCategorias() {
        try {
            const res = await api.get("/categorias/totais");
            setTotaisCategorias(res.data);
        } catch (err: any) {
            console.error("Erro ao carregar totais por categoria:", err);
            setErro("Erro ao carregar totais por categoria.");
        }
    }

    useEffect(() => {
        const carregarTudo = async () => {
            setLoading(true);
            setErro(null);

            // Carrega os dois ao mesmo tempo
            await Promise.all([
                carregarTotaisPessoas(),
                carregarTotaisCategorias()
            ]);

            setLoading(false);
        };

        carregarTudo();
    }, []);

    // Loading
    if (loading) {
        return <div>Carregando totais...</div>;
    }

    // Erro
    if (erro) {
        return <div style={{ color: "red", padding: "20px" }}>{erro}</div>;
    }

    return (
        <div>
            <h2>Totais Financeiros</h2>

            {/* Cards de Resumo Geral */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Total Receitas
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#1d8a36" }}>
                        R$ {totaisPessoas.totalGeral.totalReceitas.toFixed(2)}
                    </div>
                </div>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Total Despesas
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#ad1826" }}>
                        R$ {totaisPessoas.totalGeral.totalDespesas.toFixed(2)}
                    </div>
                </div>

                <div className="card-transacoes" style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                        Saldo
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#0f6b7a" }}>
                        R$ {totaisPessoas.totalGeral.saldoGeral.toFixed(2)}
                    </div>
                </div>

            </div>
            {/* Tabela Por Pessoa */}
            <h3>Por Pessoa</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Pessoa</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {totaisPessoas?.pessoas?.map((p: any) => (
                        <tr key={p.pessoaId}>
                            <td>{p.nome}</td>
                            <td style={{ color: "#1d8a36" }}>
                                {p.receitas > 0 ? `R$ ${p.receitas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{ color: "#ad1826" }}>
                                {p.despesas > 0 ? `R$ ${p.despesas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{
                                color: p.saldo >= 0 ? "#0f6b7a" : "#ad1826",
                                fontWeight: "500"
                            }}>
                                R$ {p.saldo.toFixed(2)}
                            </td>
                        </tr>
                    ))}

                    <tr style={{ fontWeight: "bold", background: "#f9f9f9", borderTop: "2px solid #ddd" }}>
                        <td>Total Geral</td>
                        <td style={{ color: "#1d8a36" }}>
                            R$ {totaisPessoas?.totalGeral?.totalReceitas?.toFixed(2) || "0,00"}
                        </td>
                        <td style={{ color: "#ad1826" }}>
                            R$ {totaisPessoas?.totalGeral?.totalDespesas?.toFixed(2) || "0,00"}
                        </td>
                        <td style={{ color: "#0f6b7a" }}>
                            R$ {totaisPessoas?.totalGeral?.saldoGeral?.toFixed(2) || "0,00"}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Tabela Por Categoria */}
            <h3 style={{ marginTop: "40px" }}>Por Categoria</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {totaisCategorias?.categorias?.map((c: any) => (   // ← Correção principal aqui
                        <tr key={c.categoriaId}>
                            <td>{c.descricao}</td>
                            <td style={{ color: "#1d8a36" }}>
                                {c.receitas > 0 ? `R$ ${c.receitas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{ color: "#ad1826" }}>
                                {c.despesas > 0 ? `R$ ${c.despesas.toFixed(2)}` : "—"}
                            </td>
                            <td style={{
                                color: c.saldo >= 0 ? "#0f6b7a" : "#ad1826",
                                fontWeight: "500"
                            }}>
                                R$ {c.saldo.toFixed(2)}
                            </td>
                        </tr>
                    ))}

                    <tr style={{ fontWeight: "bold", background: "#f9f9f9", borderTop: "2px solid #ddd" }}>
                        <td>Total Geral</td>
                        <td style={{ color: "#1d8a36" }}>
                            R$ {totaisCategorias?.totalGeral?.totalReceitas?.toFixed(2) || "0,00"}
                        </td>
                        <td style={{ color: "#ad1826" }}>
                            R$ {totaisCategorias?.totalGeral?.totalDespesas?.toFixed(2) || "0,00"}
                        </td>
                        <td style={{ color: "#0f6b7a" }}>
                            R$ {totaisCategorias?.totalGeral?.saldoGeral?.toFixed(2) || "0,00"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}