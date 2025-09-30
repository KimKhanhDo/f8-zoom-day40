import { HashRouter } from 'react-router-dom';
import TodoApp from '@/pages/TodoApp';

function App() {
    return (
        <HashRouter>
            <TodoApp />
        </HashRouter>
    );
}

export default App;
