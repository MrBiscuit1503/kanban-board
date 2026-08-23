import { useState } from "react";
import { Task } from "./Task";

export function Column({ title, addTask, tasks, columnId, deleteTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    await addTask({
      title: trimmedTitle,
      columnId,
      order: tasks.length,
    });

    setTaskTitle("");
    setIsModalOpen(false);
  }

  function closeModal() {
    setTaskTitle("");
    setIsModalOpen(false);
  }

  return (
    <div className="column">
      <header>
        <h4>{title}</h4>

        <button
          type="button"
          className="addButton"
          onClick={() => setIsModalOpen(true)}
          aria-label={`Add task to ${title}`}
        >
          +
        </button>
      </header>

      {tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} />
      ))}

      {isModalOpen && (
        <div className="modalOverlay" onClick={closeModal}>
          <div
            className="taskModal"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Add task</h3>

            <form onSubmit={handleAddTask}>
              <input
                autoFocus
                type="text"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Enter task title"
              />

              <div className="modalActions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">Add task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
