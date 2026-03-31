import './App.css';
import { Pessoas } from './Pages/Pessoas';
import { Totais } from './Pages/Totais';
import { Categorias } from './Pages/Categorias';
import { Transacoes } from './Pages/Transacoes';

function App() {
    return (
        <div className="container">

            <h1>Gestão Financeira</h1>

            <div className="card">
                <Pessoas />
            </div>

            <div className="card">
                <Categorias />
            </div>

            <div className="card">
                <Transacoes />
            </div>

            <div className="card">
                <Totais />
            </div>
        </div>
    )
}

export default App;
