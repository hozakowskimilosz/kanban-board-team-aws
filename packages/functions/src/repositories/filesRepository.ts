import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid"



export default class filesRepository{
    
    private S3Bucket : S3Client;

    constructor(S3Bucket: S3Client){
        this.S3Bucket = new S3Client({})
    }

    public static getFilesRepository() {
        const S3Bucket = new S3Client({});
        return new filesRepository(S3Bucket);
    }

    public async uploadFile(url:string, file: File) : Promise<Response> {
        return await fetch(url, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          });
    }
    
    public async deleteFile(key:string) {
        //to finish someday
    }
    
    public async getBucketSpace() {
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