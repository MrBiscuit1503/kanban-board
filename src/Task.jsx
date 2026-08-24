import { MdDeleteOutline } from "react-icons/md";

export function Task({ task, deleteTask }) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("taskId", String(task.id));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <p>{task.title}</p>
      <MdDeleteOutline type="button" className="delete" onClick={handleDelete}>
        Delete
      </MdDeleteOutline>
    </div>
  );
}
