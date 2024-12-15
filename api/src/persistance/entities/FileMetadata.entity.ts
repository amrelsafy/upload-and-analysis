import FileMetadata from "src/domain/FileMetadata";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryColumnCannotBeNullableError } from "typeorm";
import { UserEntity } from "./User.entity";
import FileDataEntity from "./FileData.entity";

@Entity()
export default class FileMetadataEntity implements FileMetadata{
  @PrimaryColumn()
  id: string
  
  @Column()
  fileName: string;

  @Column()
  fileSize: string;

  @Column()
  fileType: string;

  @Column()
  uploadDate: Date;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.fileMetadata, {nullable: false})
  @JoinColumn({name: 'userId'})
  user: UserEntity

  @OneToOne(() => FileDataEntity, (fileData) => fileData.fileMetadata)
  fileData: FileDataEntity

  constructor(fileMetadata: Partial<FileMetadata>){
    Object.assign(this, fileMetadata);
  }
}