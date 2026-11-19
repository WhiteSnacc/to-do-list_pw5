const priorityStyles = {
  low: 'bg-sky-100 text-sky-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
    >
      {priorityLabels[priority]}
    </span>
  );
}
