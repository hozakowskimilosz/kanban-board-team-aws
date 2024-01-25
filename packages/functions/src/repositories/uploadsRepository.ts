import { Bucket } from "sst/node/bucket";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid"

export async function getFileUploadURL() {
    const command = new PutObjectCommand({
      ACL: "public-read",
      Key: uuidv4(),
      Bucket: Bucket.Uploads.bucketName
    });
    const url = await getSignedUrl(new S3Client({}), command);
  
    return url;
  }