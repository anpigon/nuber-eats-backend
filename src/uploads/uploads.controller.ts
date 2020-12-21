import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('uploads')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    try {
      const S3 = new AWS.S3({
        apiVersion: '2006-03-01',
        credentials: {
          accessKeyId: this.configService.get('AWS_KEY'),
          secretAccessKey: this.configService.get('AWS_SECRET'),
        },
      });
      const BUCKET_NAME = this.configService.get('BUCKET_NAME');
      const objectName = `dev/images/temp/${Date.now()}_${file.originalname}`;
      await S3.putObject({
        Key: objectName,
        ACL: 'public-read',
        Body: file.buffer,
        Bucket: BUCKET_NAME,
        ContentType: file.mimetype,
        ContentEncoding: file.encoding,
      }).promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      console.error(e);
      console.log('AWS_KEY', this.configService.get('AWS_KEY'));
      return null;
    }
  }
}
