import { ApiResponse } from "../../../model/responses";

import { TaskRepository } from "../../../repositories/taskRepository";

const getTaskRepository = () => new TaskRepository();

export async function main() {

    const result = await getTaskRepository().getAll()
    return ApiResponse.ok(result);
}