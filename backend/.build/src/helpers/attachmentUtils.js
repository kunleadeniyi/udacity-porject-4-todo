import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
const XAWS = AWSXRay.captureAWS(AWS);
const s3BucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = 300;
// TODO: Implement the fileStogare logic
export class AttachmentUtils {
    constructor(s3 = new XAWS.S3({ signatureVersion: 'v4' }), bucketName = s3BucketName) {
        this.s3 = s3;
        this.bucketName = bucketName;
    }
    getAttachmentUrl(todoId) {
        const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${todoId}`;
        return attachmentUrl;
    }
    getUploadUrl(todoId) {
        const url = this.s3.getSignedUrl('getObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: urlExpiration
        });
        return url;
    }
}
//# sourceMappingURL=attachmentUtils.js.map