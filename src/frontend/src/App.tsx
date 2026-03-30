import './App.css';
import { Pessoas } from './Pages/Pessoas';
import { Totais } from './Pages/Totais';
import { Categorias } from './Pages/Categorias';
import { Transacoes } from './Pages/Transacoes';

function App() {
    return (
        <div>
            <h1>Gestão Financeira</h1>

            <Pessoas />
            <Categorias />
            <Transacoes />
            <Totais />
        </div>
    )
}

export default App;
