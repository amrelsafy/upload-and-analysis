import FileData from "src/domain/FileData";

export abstract class IFileDataRepository{
  abstract create(fileData: FileData): Promise<FileData>;
  abstract getByFileMetadataId(fileMetadataId: string): Promise<FileData>;
}