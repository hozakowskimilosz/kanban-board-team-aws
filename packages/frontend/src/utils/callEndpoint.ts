import { addTask, deleteTask } from "../api/endpoints";
import { TaskInterface } from "../types";

function addToStack(
  endpoint: string,
  triggeredBy: string,
  task: TaskInterface | string
) {
  if (triggeredBy == "Ctrl+Z") {
    const undoedStack = JSON.parse(
      sessionStorage.getItem("undoedStack") ?? "[]"
    );
    undoedStack.unshift({ originalState: task, action: endpoint });
    sessionStorage.setItem("undoedStack", JSON.stringify(undoedStack));
  } else {
    if (triggeredBy != "Ctrl+Y") sessionStorage.removeItem("undoedStack");
    const changesStack = JSON.parse(
      sessionStorage.getItem("changesStack") ?? "[]"
    );
    changesStack.unshift({ originalState: task, action: endpoint });
    sessionStorage.setItem("changesStack", JSON.stringify(changesStack));
  }
}

export default async function callEndpoint(
  endpoint: string,
  triggeredBy: string,
  task?: TaskInterface,
  id?: string
) {
  switch (endpoint) {
    case "add":
      if (!task) throw new Error("A task must be provided");
      const response = await addTask(task);
    // addToStack(endpoint, triggeredBy, ); //t.b.c.      return response;

    case "delete":
      if (!id) throw new Error("An id must be provided");
      return await deleteTask(id);
  }
}
