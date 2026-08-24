import { useState } from "react";
import { Column } from "./Column";

export function Board({
  columns,
  tasks,
  addTask,
  deleteTask,
  addColumn,
  updateColumn,
  deleteColumn,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  async function handleAddColumn(event) {
    event.preventDefault();

    const title = columnTitle.trim();

    if (!title) {
      return;
    }

    await addColumn(title);
    setColumnTitle("");
    setIsModalOpen(false);
  }

  return (
    <>
      <main>
        {columns.map((column) => {
          const columnTasks = tasks
            .filter((task) => task.columnId === column.id)
            .sort((a, b) => a.order - b.order);

          return (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.title}
              tasks={columnTasks}
              addTask={addTask}
              deleteTask={deleteTask}
              updateColumn={updateColumn}
              deleteColumn={deleteColumn}
            />
          );
        })}

        <button
          type="button"
          className="addColumnButton"
          onClick={() => setIsModalOpen(true)}
        >
          + Add column
        </button>
      </main>

      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="taskModal"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Add column</h3>

            <form onSubmit={handleAddColumn}>
              <input
                autoFocus
                type="text"
                value={columnTitle}
                onChange={(event) => setColumnTitle(event.target.value)}
                placeholder="Enter column name"
              />

              <div className="modalActions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Add column</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
