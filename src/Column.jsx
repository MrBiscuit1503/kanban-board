import { Task } from "./Task";

export function Column({ title }) {
  return (
    <div className="column">
      <h4>{title}</h4>
      <Task />
    </div>
  );
}
