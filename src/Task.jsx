import { MdDeleteOutline } from "react-icons/md";

export function Task({ task, deleteTask }) {
  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className="task">
      <p>{task.title}</p>
      <MdDeleteOutline className="delete" onClick={handleDelete} />
    </div>
  );
}
