import { FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PriorityBadge from './PriorityBadge.jsx';
import StatusBadge from './StatusBadge.jsx';

export default function TodoTable({ todos, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-500">
        Belum ada tugas
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] table-fixed text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-[34%] px-5 py-4">Judul</th>
              <th className="w-[18%] px-5 py-4">Status</th>
              <th className="w-[16%] px-5 py-4">Prioritas</th>
              <th className="w-[18%] px-5 py-4">Deadline</th>
              <th className="w-[14%] px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {todos.map((todo) => (
              <tr className="transition hover:bg-slate-50/70" key={todo.id}>
                <td className="px-5 py-4">
                  <p className="truncate text-sm font-semibold text-slate-800" title={todo.title}>
                    {todo.title}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={todo.status} />
                </td>
                <td className="px-5 py-4">
                  <PriorityBadge priority={todo.priority} />
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">{todo.deadline}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      aria-label={`Lihat ${todo.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#3b5bdb] text-white transition hover:bg-[#2f4dc5] focus:outline-none focus:ring-4 focus:ring-blue-100"
                      to={`/todo/${todo.id}`}
                    >
                      <FiEye aria-hidden="true" size={17} />
                    </Link>
                    <button
                      aria-label={`Hapus ${todo.title}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
                      onClick={() => onDelete(todo)}
                      type="button"
                    >
                      <FiTrash2 aria-hidden="true" size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
