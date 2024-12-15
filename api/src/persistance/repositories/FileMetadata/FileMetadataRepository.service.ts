import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FileMetadata from "src/domain/FileMetadata";
import { IFileMetadataRepository } from "src/interfaces/IFileMetadataRepository";
import FileMetadataEntity from "../../entities/FileMetadata.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export default class FileMetadataRepository implements IFileMetadataRepository{

  constructor(@InjectRepository(FileMetadataEntity) private fileMetadataRepository: Repository<FileMetadataEntity>,
              private entityManager: EntityManager){}
  
  async getByUserIdAndMetadataId(userId: string, fileMetadataId: string): Promise<FileMetadata> {
    try{
      return await this.fileMetadataRepository.findOne({
        where: {
          userId,
          id: fileMetadataId
        }
      })
    }
    catch(e){
      throw new Error('Error getting file metadata for user');
    }
  }
              
  async getByUserId(queryParams: any): Promise<FileMetadata[]> {
    try{
      return await this.fileMetadataRepository.find({
        where: queryParams
      })
    }
    catch(e){
      throw new Error('Error getting file metadata for user');
    }
  }
  async create(fileMetadata: FileMetadata): Promise<FileMetadata> {
    let newFileMetadata = new FileMetadataEntity(fileMetadata);

    try{
      await this.entityManager.save(newFileMetadata);
      return fileMetadata;
    } 
    catch(e){
      throw new Error('Error saving file metadata');
    }   
  }

}