import FileData from "src/domain/FileData";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import FileMetadataEntity from "./FileMetadata.entity";

@Entity()
export default class FileDataEntity implements FileData{
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'text'
  })
  data: string;

  @Column()
  fileMetadataId: string;

  @OneToOne(() => FileMetadataEntity, (fileMetaData) => fileMetaData.fileData)
  @JoinColumn({ name: 'fileMetadataId' })
  fileMetadata: FileMetadataEntity

  constructor(fileData: Partial<FileData>){
    Object.assign(this, fileData);
  }
}