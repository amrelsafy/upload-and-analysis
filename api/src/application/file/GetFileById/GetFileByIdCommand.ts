import { Injectable } from "@nestjs/common";
import IGetFileByIdCommand from "./IGetFileByIdCommand";
import FileData from "src/domain/FileData";
import FileMetadata from "src/domain/FileMetadata";
import { IFileMetadataRepository } from "src/interfaces/IFileMetadataRepository";
import { IFileDataRepository } from "src/interfaces/IFileDataRepository";

@Injectable()
export default class GetFileByIdCommand implements IGetFileByIdCommand{

  constructor(private fileMetadataRepository: IFileMetadataRepository,
              private fileDataRepository: IFileDataRepository){}

  async execute(fileMetadataId: string, userId: string): Promise<{ metadata: FileMetadata; data: FileData; }> {
    let metadata = await this.fileMetadataRepository.getByUserIdAndMetadataId(userId, fileMetadataId);
    let data = await this.fileDataRepository.getByFileMetadataId(metadata.id);
    
    return {
      metadata,
      data
    }
  }
  
}