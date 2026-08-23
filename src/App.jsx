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

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, []);

  return <Board columns={columns} tasks={tasks} addTask={addTask} />;
}

export default App;
