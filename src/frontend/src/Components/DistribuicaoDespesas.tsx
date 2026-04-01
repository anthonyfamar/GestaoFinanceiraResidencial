import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const cores = [
    "#0f6b7a",
    "#1a7f8f",
    "#2593a5",
    "#31a7ba",
    "#4bbac9",
    "#66cbd6"
];

export function GraficoPizza({ dados }: any) {

    const dadosFormatados = dados
        .filter((c: any) => c.despesas > 0)
        .map((c: any) => ({
            nome: c.descricao,
            valor: c.despesas
        }));

    const total = dadosFormatados.reduce((acc: number, item: any) => acc + item.valor, 0);

    const renderLabel = ({ percent }: any) =>
        `${(percent * 100).toFixed(0)}%`;

    return (
        <div style={{ width: "100%", height: 280 }}>

            <h3>
                Distribuição de Despesas por Categoria
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={dadosFormatados}
                        dataKey="valor"
                        nameKey="nome"
                        cx="50%"
                        cy="40%"
                        outerRadius={100}
                        label={renderLabel}
                    >
                        {dadosFormatados.map((_: any, index: number) => (
                            <Cell
                                key={index}
                                fill={cores[index % cores.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`} />

                    <Legend
                        layout="vertical"
                        verticalAlign="top"
                        align="right"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}