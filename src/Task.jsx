import { MdDeleteOutline } from "react-icons/md";

export function Task({ task, deleteTask }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="task">
      <p>{task.title}</p>
      <MdDeleteOutline className="delete" onClick={handleDelete} />
    </div>
  );
}
