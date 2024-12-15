import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import FileProcessor from "./FileProcessor/FileProcessor.job";
import FileMetadataRepositoryModule from "src/persistance/repositories/FileMetadata/FileMetadataRepository.module";
import FileDataRepositoryModule from "src/persistance/repositories/FileData/FileDataRepository.module";

@Module({
  imports: [
    BullModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      redis:{
        host: configService.getOrThrow('REDIS_HOST'),
        port: configService.getOrThrow('REDIS_PORT')
      } 
    }),
    inject: [ConfigService]
  }),
  BullModule.registerQueue({
    name: 'file-processing'
  }),
  FileMetadataRepositoryModule,
  FileDataRepositoryModule
  ],
  providers: [FileProcessor],
  exports: [
    BullModule.registerQueue({
      name: 'file-processing'
    }),]
})

export default class QueueModule {}