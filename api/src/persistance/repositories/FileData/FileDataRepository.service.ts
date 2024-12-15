import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FileData from "src/domain/FileData";
import { IFileDataRepository } from "src/interfaces/IFileDataRepository";
import FileDataEntity from "src/persistance/entities/FileData.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export default class FileDataRepository implements IFileDataRepository{

  constructor(@InjectRepository(FileDataEntity) private fileDataRepository: Repository<FileDataEntity>,
              private entityManager: EntityManager){}

  async create(fileData: FileData): Promise<FileData> {
    let newFileData = new FileDataEntity(fileData);

    try{
      await this.entityManager.save(newFileData);
      return fileData;
    }
    catch(e){
      throw new Error('Error while savving file data');
    }
  }
  async getByFileMetadataId(fileMetadataId: string): Promise<FileData> {
    try{
      return await this.fileDataRepository.findOne({
        where: {
          fileMetadataId
        }
      })
    } 
    catch(e){
      throw new Error('Error getting File data using File Metadata ID');
    }
  }

}