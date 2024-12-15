import { Injectable } from "@nestjs/common";
import IGetFilesCommand from "./IGetFilesCommand";
import FileData from "src/domain/FileData";
import FileMetadata from "src/domain/FileMetadata";
import { IFileMetadataRepository } from "src/interfaces/IFileMetadataRepository";
import { IFileDataRepository } from "src/interfaces/IFileDataRepository";

@Injectable()
export default class GetFilesCommand implements IGetFilesCommand{

  constructor(private fileMetadataRepository: IFileMetadataRepository,
              private fileDataRepository: IFileDataRepository){}

  async execute(queryParams: any): Promise<{ metadata: FileMetadata; data: FileData; }[]> {
    let fileMetaDatas = await this.fileMetadataRepository.getByUserId(queryParams);
    
    let results = await Promise.all(fileMetaDatas.map(async fileMetaData => {
      let fileData = await this.fileDataRepository.getByFileMetadataId(fileMetaData.id);
      return {
        metadata: fileMetaData,
        data: fileData
      }
    }));

    return results;
  }
  
}