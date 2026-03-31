import { useState } from 'react';
import './App.css';
import { Pessoas } from './Pages/Pessoas';
import { Totais } from './Pages/Totais';
import { Categorias } from './Pages/Categorias';
import { Transacoes } from './Pages/Transacoes';
import logoGFR from './img/logo_gfr_semfundo.png';

// Define as abas disponíveis na navegação
const abas = [
    { id: "pessoas", label: "👤 Pessoas" },
    { id: "categorias", label: "🏷️ Categorias" },
    { id: "transacoes", label: "💸 Transações" },
    { id: "totais", label: "📊 Totais" },
];

function App() {
    // controla qual aba está ativa
    const [abaAtiva, setAbaAtiva] = useState("pessoas");

    return (
        <div className="app-layout">

            {/* Cabeçalho com título e navegação */}
            <header className="app-header">
                <div style={{ width: "150px", height: "56px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={logoGFR} alt="GFR - Gestão Financeira Residencial" style={{ height: "150px", objectFit: "contain" }} />
                </div>

                <nav className="app-nav">
                    {abas.map(aba => (
                        <button
                            key={aba.id}
                            className={`nav-btn ${abaAtiva === aba.id ? "nav-btn-ativo" : ""}`}
                            onClick={() => setAbaAtiva(aba.id)}
                        >
                            {aba.label}
                        </button>
                    ))}
                </nav>
            </header>

            {/* Conteúdo da aba ativa */}
            <main className="app-main">
                <div className="card">
                    {abaAtiva === "pessoas" && <Pessoas />}
                    {abaAtiva === "categorias" && <Categorias />}
                    {abaAtiva === "transacoes" && <Transacoes />}
                    {abaAtiva === "totais" && <Totais />}
                </div>
            </main>

        </div>
    );
}

export default App;