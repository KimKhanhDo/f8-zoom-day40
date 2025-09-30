import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import TaskList from '@/pages/TaskList';
import NewTask from '@/pages/NewTask';
import EditTask from '@/pages/EditTask';
import NotFound from '@/pages/NotFound';

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/todo"
                element={<TaskList />}
            />
            <Route
                path="/new"
                element={<NewTask />}
            />
            <Route
                path="/:id/edit"
                element={<EditTask />}
            />
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
    );
}
