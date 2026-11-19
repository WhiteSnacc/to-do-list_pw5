import { useState } from 'react';

const emptyTodo = {
  title: '',
  description: '',
  status: 'to-do',
  priority: 'low',
  deadline: '',
};

const inputClassName =
  'mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

export default function TodoForm({ initialTodo, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => ({
    ...emptyTodo,
    ...(initialTodo ?? {}),
  }));
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    if (value.trim()) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Judul wajib diisi.';
    if (!form.deadline) nextErrors.deadline = 'Deadline wajib diisi.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      deadline: form.deadline,
    });
  };

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-slate-700" htmlFor="todo-title">
        Judul
        <input
          autoFocus
          className={inputClassName}
          id="todo-title"
          name="title"
          onChange={updateField}
          placeholder="Masukkan judul todo"
          type="text"
          value={form.title}
        />
        {errors.title && <span className="mt-1 block text-xs text-red-600">{errors.title}</span>}
      </label>

      <label
        className="block text-sm font-medium text-slate-700"
        htmlFor="todo-description"
      >
        Deskripsi
        <textarea
          className={`${inputClassName} min-h-24 resize-y`}
          id="todo-description"
          name="description"
          onChange={updateField}
          placeholder="Tambahkan deskripsi (opsional)"
          rows="3"
          value={form.description}
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="todo-status">
          Status
          <select
            className={inputClassName}
            id="todo-status"
            name="status"
            onChange={updateField}
            value={form.status}
          >
            <option value="to-do">To-do</option>
            <option value="in progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="todo-priority"
        >
          Prioritas
          <select
            className={inputClassName}
            id="todo-priority"
            name="priority"
            onChange={updateField}
            value={form.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label
        className="block text-sm font-medium text-slate-700"
        htmlFor="todo-deadline"
      >
        Deadline
        <input
          className={inputClassName}
          id="todo-deadline"
          name="deadline"
          onChange={updateField}
          type="date"
          value={form.deadline}
        />
        {errors.deadline && (
          <span className="mt-1 block text-xs text-red-600">{errors.deadline}</span>
        )}
      </label>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
          onClick={onCancel}
          type="button"
        >
          Batal
        </button>
        <button
          className="rounded-lg bg-[#3b5bdb] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f4dc5] focus:outline-none focus:ring-4 focus:ring-blue-100"
          type="submit"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
