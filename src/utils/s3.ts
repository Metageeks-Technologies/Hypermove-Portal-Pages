
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

let s3Client;

if (region && accessKeyId && secretAccessKey) {
    s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });
} else {
    console.error('Missing required S3 configuration variables');
}
