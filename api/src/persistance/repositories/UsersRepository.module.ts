import { Module } from "@nestjs/common";
import UsersRepository from "./UsersRepository.service";
import { IUserRepository } from "src/interfaces/IUserRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/User.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{ useClass: UsersRepository, provide: IUserRepository}],
  exports: [TypeOrmModule.forFeature([UserEntity]), IUserRepository]
})

export default class UsersRepositoryModule {}