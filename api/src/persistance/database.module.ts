import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/User.entity";
import { RoleEntity } from "./entities/Role.entity";
import { RolesMigrations } from "./migrations/roles.migrations";
import FileMetadataEntity from "./entities/FileMetadata.entity";
import FileDataEntity from "./entities/FileData.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: [UserEntity, RoleEntity, FileMetadataEntity, FileDataEntity],
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([RoleEntity, UserEntity, FileMetadataEntity, FileDataEntity])
  ],
  providers: [RolesMigrations],
  exports: []
})

export class DatabaseModule {}