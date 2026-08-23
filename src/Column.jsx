import { Task } from "./Task";

export function Column({ title, addTask, tasks, columnId }) {
  const handleAddTask = () => {
    const newTask = {
      title: "New Task", // later: pull this from an input instead
      columnId,
      order: tasks.length,
    };
    addTask(newTask);
  };
  return (
    <div className="column">
      <header>
        <h4>{title}</h4>
        <div className="addButton" onClick={handleAddTask}>
          +
        </div>
      </header>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
