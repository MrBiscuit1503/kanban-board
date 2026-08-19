import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";

function App() {
  const [columns, setColumns] = useState([]);

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
  }, []);

  return <Board columns={columns} />;
}

export default App;
