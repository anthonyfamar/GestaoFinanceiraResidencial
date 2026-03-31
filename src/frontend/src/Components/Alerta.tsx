import { useEffect } from "react";

type AlertaTipo = "erro" | "sucesso" | "aviso";

type AlertaProps = {
    mensagem: string;
    tipo?: AlertaTipo;
    onFechar: () => void;
    autoFecharEm?: number; // tempo em ms para auto fechar
};

const estilos: Record<AlertaTipo, React.CSSProperties> = {
    erro: { background: "#fee2e2", border: "1px solid #f87171", color: "#b91c1c" },
    sucesso: { background: "#d1fae5", border: "1px solid #4ade80", color: "#166534" },
    aviso: { background: "#fef3c7", border: "1px solid #fbbf24", color: "#92400e" },
};

const icones: Record<AlertaTipo, string> = {
    erro: "❌",
    sucesso: "✅",
    aviso: "⚠️",
};

export function Alerta({
    mensagem,
    tipo = "erro",
    onFechar,
    autoFecharEm = 6000
}: AlertaProps) {

    useEffect(() => {
        if (autoFecharEm && tipo !== "erro") {  // só auto-fecha sucesso/aviso
            const timer = setTimeout(onFechar, autoFecharEm);
            return () => clearTimeout(timer);
        }
    }, [onFechar, autoFecharEm, tipo]);

    return (
        <div style={{
            ...estilos[tipo],
            borderRadius: "8px",
            padding: "14px 16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
            <span style={{ fontSize: "18px" }}>{icones[tipo]}</span>
            <span style={{ flex: 1 }}>{mensagem}</span>

            <button
                onClick={onFechar}
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "inherit",
                    opacity: 0.7,
                    padding: "0 4px",
                }}
            >
                ×
            </button>
        </div>
    );
}