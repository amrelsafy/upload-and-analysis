import FileData from "src/domain/FileData";
import FileMetadata from "src/domain/FileMetadata";

export default interface IGetFilesCommand{
  execute(queryParams: any): Promise<{metadata: FileMetadata, data: FileData}[]>
}