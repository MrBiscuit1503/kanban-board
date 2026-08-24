import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";

function App() {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function addTask(newTask) {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const createdTask = await response.json();
    setTasks((currentTasks) => [...currentTasks, createdTask]);
  }

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      if (!response.ok) throw new Error("Could not fetch resource");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchColumns() {
    try {
      const response = await fetch("http://localhost:3001/columns");

      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      const data = await response.json();
      console.log(data);
      setColumns(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(taskId) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  async function addColumn(title) {
    const newColumn = {
      title,
      boardId: "1",
      order: columns.length,
    };

    const response = await fetch("http://localhost:3001/columns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newColumn),
    });

    if (!response.ok) {
      throw new Error("Failed to create column");
    }

    const createdColumn = await response.json();

    setColumns((currentColumns) => [...currentColumns, createdColumn]);
  }

  async function updateColumn(columnId, title) {
    const response = await fetch(`http://localhost:3001/columns/${columnId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Failed to update column");
    }

    const updatedColumn = await response.json();

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId ? updatedColumn : column,
      ),
    );
  }

  async function deleteColumn(columnId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this column?",
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(`http://localhost:3001/columns/${columnId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete column");
    }

    setColumns((currentColumns) =>
      currentColumns.filter((column) => column.id !== columnId),
    );

    // Remove tasks that belonged to the deleted column locally.
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.columnId !== columnId),
    );
  }

  async function moveTask(taskId, columnId, order) {
    const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ columnId, order }),
    });

    if (!response.ok) {
      throw new Error("Failed to move task");
    }

    const updatedTask = await response.json();

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );
  }

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, []);

  return (
    <Board
      columns={columns}
      tasks={tasks}
      addTask={addTask}
      deleteTask={deleteTask}
      addColumn={addColumn}
      updateColumn={updateColumn}
      deleteColumn={deleteColumn}
      moveTask={moveTask}
    />
  );
}

export default App;
