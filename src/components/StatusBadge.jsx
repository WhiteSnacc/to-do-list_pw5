const statusStyles = {
  'to-do': 'bg-slate-100 text-slate-700',
  'in progress': 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800',
};

const statusLabels = {
  'to-do': 'To-do',
  'in progress': 'In progress',
  done: 'Done',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
