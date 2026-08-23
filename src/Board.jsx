import { Column } from "./Column";

export function Board({ columns, tasks, addTask }) {
  return (
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
          />
        );
      })}
    </main>
  );
}
