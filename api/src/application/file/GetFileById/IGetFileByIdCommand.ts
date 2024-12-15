import FileData from "src/domain/FileData";
import FileMetadata from "src/domain/FileMetadata";

export default interface IGetFileByIdCommand{
  execute(filemetadataId: string, userId: string):Promise<{metadata: FileMetadata, data: FileData}>
}