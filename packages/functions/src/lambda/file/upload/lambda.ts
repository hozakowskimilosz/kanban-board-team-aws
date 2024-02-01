import { ApiResponse } from "@kanban-board-team-aws/functions/model/responses";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { ApiError } from "@kanban-board-team-aws/functions/model/errors";
import { UploadFileEventSchema } from "./types";
import FilesRepository from "src/repositories/filesRepository";


const filesRepository = FilesRepository.getFilesRepository()

function getBase64(e : APIGatewayProxyEventV2): string {
    try{
        const event = UploadFileEventSchema.parse(e)
        if(event.body.startsWith("data:")){
            return event.body
        }else{
            return `data:${event?.headers?.data};base64,${event.body}`
        }
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            throw new ApiError(400, res.join(";")) 
        }
        throw err;
    }
}

export async function main(e: APIGatewayProxyEventV2) {
    try {
        const base64 = getBase64(e);

        const res1 = await filesRepository.uploadFile(base64)

        const res2 = await filesRepository.getFile(res1.key)

        return ApiResponse.ok(res2)
    }catch(err){
        if (err instanceof z.ZodError) {
            const res = err.issues.map(e=>`${e.message} at field ${e.path}`)
            const apiError = new ApiError(400, res.join(";"))
            return apiError.getApiResponse() 
        }
        const apiError = new ApiError(500, (err as Error)?.message)
        return apiError.getApiResponse()
    }
}