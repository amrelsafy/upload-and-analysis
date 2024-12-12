import { Module } from '@nestjs/common';
import LoginCommand from './Login/LoginCommand.service';
import RegisterCommand from './Register/RegisterCommand.service';
import GetProfileCommand from './GetProfile/GetProfileCommand.service';
import UsersRepositoryModule from 'src/persistance/repositories/UsersRepository.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/strategy/jwt.strategy';
import GetAllProfilesCommand from './GetAllProfiles/GetAllProfilesCommand';

@Module({
  imports: [PassportModule, UsersRepositoryModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.getOrThrow("JWT_SECRET_KEY"),
      signOptions: { expiresIn: '1h' }
    }),
    inject: [ConfigService]
  })],
  exports: [LoginCommand, RegisterCommand, GetProfileCommand, GetAllProfilesCommand],
  providers: [LoginCommand, RegisterCommand, GetProfileCommand, JwtStrategy, GetAllProfilesCommand],
})
export class AuthModule {}
