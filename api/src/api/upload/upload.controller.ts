import { InjectQueue } from "@nestjs/bull";
import { BadRequestException, Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Queue } from "bull";
import { Request } from "express";
import { JwtAuthGuard } from "src/application/auth/jwt/guard/jwt.guard";

const fileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
  let allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

  if(!allowedFileTypes.includes(file.mimetype))
    return callback(new BadRequestException(`${file.originalname} has invalid file type to parse`));

  callback(null, true)
} 

@Controller('upload')
export default class UploadController{
  constructor(@InjectQueue('file-processing') private fileQueue: Queue){}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body('userId') userId: string){
    const jobs = files.map(async file => {

      const {buffer, originalname, mimetype, size} = file;
      let allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      let maxSize = 5 * 1024 * 1024;

      if(allowedFileTypes.includes(mimetype))
        throw new Error(`${originalname} has invalid file type`);
      if(size > maxSize)
        throw new Error(`${originalname} has exceeded the file size limit of 5MB`)

      return this.fileQueue.add('process-file', {
        buffer,
        name: originalname,
        mimetype,
        size,
        userId
      })
    });

    let results = await Promise.allSettled(jobs);

    return results;
  }
}