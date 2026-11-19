import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Modal from '../components/Modal.jsx';
import TodoForm from '../components/TodoForm.jsx';
import TodoTable from '../components/TodoTable.jsx';
import { useTodos } from '../context/TodoContext.jsx';

export default function TodoListPage() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleAddTodo = (todo) => {
    addTodo(todo);
    setIsAddModalOpen(false);
    toast.success('Todo berhasil ditambahkan.');
  };

  const handleDeleteTodo = () => {
    deleteTodo(todoToDelete.id);
    setTodoToDelete(null);
    toast.success('Todo berhasil dihapus.');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-700">Dibuat oleh mahasiswa dengan NIM 251401045.</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">To-do List</h1>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-[#3b5bdb] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2f4dc5] focus:outline-none focus:ring-4 focus:ring-blue-100"
            onClick={() => setIsAddModalOpen(true)}
            type="button"
          >
            Tambah To-do
          </button>
        </header>

        <TodoTable todos={todos} onDelete={setTodoToDelete} />
      </div>

      {isAddModalOpen && (
        <Modal onClose={() => setIsAddModalOpen(false)} title="Tambah Todo">
          <TodoForm
            onCancel={() => setIsAddModalOpen(false)}
            onSubmit={handleAddTodo}
            submitLabel="Tambah"
          />
        </Modal>
      )}

      {todoToDelete && (
        <ConfirmDialog
          onCancel={() => setTodoToDelete(null)}
          onConfirm={handleDeleteTodo}
        />
      )}
    </main>
  );
}
