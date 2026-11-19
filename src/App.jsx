import { Navigate, Route, Routes } from 'react-router-dom';
import TodoDetailPage from './pages/TodoDetailPage.jsx';
import TodoListPage from './pages/TodoListPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoListPage />} />
      <Route path="/todo/:id" element={<TodoDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
