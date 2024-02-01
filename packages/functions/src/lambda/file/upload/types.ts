import { z } from "zod";
const {Base64} = require('js-base64');

export const UploadFileEventSchema = z.object({
    queryStringParameters: z.object({
        filename: z.string()
    }),
    headers: z.object({
        data: z.string(), 
    }).optional(),
    body: z.string().refine(Base64.isValid)
});

export type UploadFileEvent = z.infer<typeof UploadFileEventSchema>