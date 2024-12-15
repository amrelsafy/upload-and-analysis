import { Module } from "@nestjs/common";
import FileDataRepositoryModule from "src/persistance/repositories/FileData/FileDataRepository.module";
import FileMetadataRepositoryModule from "src/persistance/repositories/FileMetadata/FileMetadataRepository.module";
import GetFilesCommand from "./GetFiles/GetFilesCommand";
import GetFileByIdCommand from "./GetFileById/GetFileByIdCommand";

@Module({
  imports: [FileDataRepositoryModule, FileMetadataRepositoryModule],
  providers: [GetFilesCommand, GetFileByIdCommand],
  exports: [GetFilesCommand, GetFileByIdCommand]
})

export default class FileModule {}