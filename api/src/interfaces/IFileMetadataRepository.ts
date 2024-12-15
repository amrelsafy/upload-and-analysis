import FileMetadata from "src/domain/FileMetadata";

export abstract class IFileMetadataRepository{
  abstract getByUserIdAndMetadataId(userId: string, fileMetadataId: string): Promise<FileMetadata>
  abstract getByUserId(userId: string): Promise<FileMetadata[]>;
  abstract create(fileMetadata: FileMetadata): Promise<FileMetadata>;
}