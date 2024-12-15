import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

@Injectable()
export default class FilesMiddleware implements NestMiddleware{

  private allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  private maxSize = 5 * 1024 * 1024;

  private multerMiddleware = multer({
    fileFilter: (req, file, cb) => {
      if(!this.allowedFileTypes.includes(file.mimetype))
        return cb(new BadRequestException(`Invalid file type in ${file.originalname}`))
      
        cb(null, true)
    },
    limits: {fileSize: this.maxSize}
  }).array('files');

  use(req: Request, res: Response, next: NextFunction) {
    this.multerMiddleware(req, res, (err:any) => {
      if(err){
        if(err.code === 'LIMIT_FILE_SIZE')
          return next(new BadRequestException('File size exceeded the 5MB limit'))

        next(err)
      }

      req.body.files = req.files;
      next(); 
    })
  }
}