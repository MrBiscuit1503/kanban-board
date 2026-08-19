import { Column } from "./Column";

export function Board() {
  return (
    <>
      <Column title={"To do"} />
      <Column title={"In Progress"} />
      <Column title={"Stalled"} />
      <Column title={"Complete"} />
    </>
  );
}
