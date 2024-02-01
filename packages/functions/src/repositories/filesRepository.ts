import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid"
import streamToPromise from 'stream-to-promise';


export default class filesRepository{
    
    private S3Bucket : S3Client;

    constructor(S3Bucket: S3Client){
        this.S3Bucket = new S3Client({})
    }

    public static getFilesRepository() {
        const S3Bucket = new S3Client({});
        return new filesRepository(S3Bucket);
    }

    public async getFile(key: string){
        const params = {
            Bucket: Bucket.Uploads.bucketName,
            Key: key,
        };
        const command = new GetObjectCommand(params);
        const response = await this.S3Bucket.send(command);
    
        // Convert the stream to a Buffer
        const buffer = await streamToPromise(response.Body);
    
        // Convert the Buffer to a base64 string
        const base64File = buffer.toString('base64');
    
        return base64File;
    }

    public async uploadFile(base64File: string) : Promise<{response: Response, key: string}> {
        const bucketSpace = await this.getBucketSpace()
        const headers = { 'Content-Type': 'multipart/form-data' };
        const formData = new FormData();
        formData.append('file', base64File);
        return {
            response: await fetch(bucketSpace.url, {
                method: "PUT",
                headers: headers,
                body: formData,
            }),
            key: bucketSpace.id
        }
    }
    
    public async deleteFile(key:string) {
        //to finish someday
    }
    
    private async getBucketSpace() {
        const id = uuidv4();
        const command = new PutObjectCommand({
            ACL: "public-read",
            Key: id,
            Bucket: Bucket.Uploads.bucketName
        });
        const url = await getSignedUrl(this.S3Bucket, command);
      
        return {url: url, id: id};
    }
}