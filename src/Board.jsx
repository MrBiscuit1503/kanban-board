import { Column } from "./Column";

export function Board({ columns }) {
  return (
    <main>
      {columns.map((column) => (
        <Column key={column.id} title={column.title} />
      ))}
    </main>
  );
}
