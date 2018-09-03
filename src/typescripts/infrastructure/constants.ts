import * as AWS from 'aws-sdk';

export class Constants {
    public static s3Client = new AWS.S3({
        apiVersion: process.env.s3ClientApiVersion,
        accessKeyId: process.env.s3ClientAccessKeyId,
        secretAccessKey: process.env.s3ClientSecretAccessKey,
        region: 'ap-northeast-1',
    });
}
