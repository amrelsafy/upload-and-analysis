import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FileDataEntity from "src/persistance/entities/FileData.entity";
import FileDataRepository from "./FileDataRepository.service";
import { IFileDataRepository } from "src/interfaces/IFileDataRepository";

@Module({
  imports: [TypeOrmModule.forFeature([FileDataEntity])],
  providers: [{useClass: FileDataRepository, provide: IFileDataRepository}],
  exports: [TypeOrmModule.forFeature([FileDataEntity]), IFileDataRepository]
})

export default class FileDataRepositoryModule {}