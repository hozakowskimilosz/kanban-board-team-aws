import { addTask, deleteTask } from "../api/endpoints";
import { TaskInterface } from "../types";

export default async function callEndpoint(
  endpoint: string,
  triggeredBy: string,
  task?: TaskInterface,
  id?: string
) {
  switch (endpoint) {
    case "add":
      if (!task) throw new Error("A task must be provided");
      return await addTask(task);

    case "delete":
      if (!id) throw new Error("An id must be provided");
      return await deleteTask(id);
  }
}
