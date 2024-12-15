import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FileMetadataEntity from "../../entities/FileMetadata.entity";
import FileMetadataRepository from "./FileMetadataRepository.service";
import { IFileMetadataRepository } from "src/interfaces/IFileMetadataRepository";

@Module({
  imports: [TypeOrmModule.forFeature([FileMetadataEntity])],
  providers: [{useClass: FileMetadataRepository, provide: IFileMetadataRepository}],
  exports: [TypeOrmModule.forFeature([FileMetadataEntity]), IFileMetadataRepository]
})

export default class FileMetadataRepositoryModule {}