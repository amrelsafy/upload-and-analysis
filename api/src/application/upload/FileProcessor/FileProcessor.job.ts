import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as pdfParse from 'pdf-parse';
import FileMetadata from "src/domain/FileMetadata";
import { IFileMetadataRepository } from "src/interfaces/IFileMetadataRepository";
import Tesseract from "tesseract.js";
import {v4 as uuidv4} from 'uuid';
import * as Papa from 'papaparse';
import FileData from "src/domain/FileData";
import { IFileDataRepository } from "src/interfaces/IFileDataRepository";

interface IFileJob{
  mimetype: string,
  buffer: Buffer, 
  size: number, 
  name: string, 
  userId: string
}

@Processor('file-processing')
export default class FileProcessor{

  constructor(private fileMetadataRepository: IFileMetadataRepository, private fileDataRepository: IFileDataRepository){}

  @Process('process-file')
  async handleFileProcessing(job: Job){
    const {mimetype, buffer, size, name, userId}: IFileJob = job.data;

    let fileMetadata: FileMetadata = {
      id: uuidv4(),
      fileName: name,
      fileSize: `${(size/1024).toFixed(2)} KB`,
      fileType: mimetype,
      uploadDate: new Date(),
      userId
    }

    await this.fileMetadataRepository.create(fileMetadata);

    let fileData: FileData;

    if(mimetype === 'application/pdf'){
      fileData = await this.processPdf(buffer, fileMetadata.id);
      await this.fileDataRepository.create(fileData);
    }
    if(mimetype.startsWith('image/')){
      fileData = await this.processImage(buffer, fileMetadata.id);
      await this.fileDataRepository.create(fileData);
    }
    if(mimetype === 'text/csv')
      fileData = await this.processCSV(buffer, fileMetadata.id);
      await this.fileDataRepository.create(fileData);
  }

  async processPdf(buffer: Buffer, fileMetadataId: string){
    const data = await pdfParse(buffer);
    return {
      id: uuidv4(),
      data: data.text,
      fileMetadataId
    }
  }

  async processImage(buffer: Buffer, fileMetadataId: string){
    const imageData = buffer.toString('base64');
    const result = await Tesseract.recognize(`data:image/png;base64,${imageData}`, 'eng');

    return{
      id: uuidv4(),
      data: result.data.text,
      fileMetadataId
    }
  }

  async processCSV(buffer: Buffer, fileMetadataId: string){
    const csvContent = buffer.toString('utf8');
    const parsed = await Papa.parse(csvContent, { header: true });
    
    return {
      id: uuidv4(),
      data: parsed.data,
      fileMetadataId
    }
  }
}