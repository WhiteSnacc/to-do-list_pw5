import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from '../components/Modal.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import TodoForm from '../components/TodoForm.jsx';
import { useTodos } from '../context/TodoContext.jsx';

function DetailField({ label, children }) {
  return (
    <div>
      <dt className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="text-sm font-medium text-slate-800">{children}</dd>
    </div>
  );
}

export default function TodoDetailPage() {
  const { id } = useParams();
  const { getTodoById, updateTodo } = useTodos();
  const todo = getTodoById(id);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleUpdateTodo = (updates) => {
    updateTodo(id, updates);
    setIsUpdateModalOpen(false);
    toast.success('Todo berhasil diperbarui.');
  };

  if (!todo) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Todo tidak ditemukan</h1>
          <Link
            className="mt-6 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            to="/"
          >
            Kembali
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6">
      <section className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-blue-700">Detail tugas</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {todo.title}
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <dl className="space-y-6">
            <DetailField label="Judul">{todo.title}</DetailField>
            <DetailField label="Deskripsi">
              <div className="min-h-32 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-normal leading-relaxed text-slate-700">
                {todo.description || 'Tidak ada deskripsi.'}
              </div>
            </DetailField>
          </dl>

          <dl className="space-y-6">
            <DetailField label="Status">
              <StatusBadge status={todo.status} />
            </DetailField>
            <DetailField label="Prioritas">
              <PriorityBadge priority={todo.priority} />
            </DetailField>
            <DetailField label="Deadline">{todo.deadline}</DetailField>
          </dl>
        </div>

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <Link
            className="inline-flex justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
            to="/"
          >
            Kembali
          </Link>
          <button
            className="rounded-lg bg-[#3b5bdb] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f4dc5] focus:outline-none focus:ring-4 focus:ring-blue-100"
            onClick={() => setIsUpdateModalOpen(true)}
            type="button"
          >
            Update
          </button>
        </div>
      </section>

      {isUpdateModalOpen && (
        <Modal onClose={() => setIsUpdateModalOpen(false)} title="Update Todo">
          <TodoForm
            initialTodo={todo}
            onCancel={() => setIsUpdateModalOpen(false)}
            onSubmit={handleUpdateTodo}
            submitLabel="Update"
          />
        </Modal>
      )}
    </main>
  );
}
