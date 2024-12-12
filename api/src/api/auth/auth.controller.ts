import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/application/auth/admin/guard/admin.guard';
import GetAllProfilesCommand from 'src/application/auth/GetAllProfiles/GetAllProfilesCommand';
import GetProfileCommand from 'src/application/auth/GetProfile/GetProfileCommand.service';
import { JwtAuthGuard } from 'src/application/auth/jwt/guard/jwt.guard';
import LoginCommand from 'src/application/auth/Login/LoginCommand.service';
import RegisterCommand from 'src/application/auth/Register/RegisterCommand.service';
import UserDTO from 'src/domain/dto/UserDTO';
import { User } from 'src/domain/User';

@Controller('auth')
export class AuthController {
  constructor(private registerCommand: RegisterCommand,
    private loginCommand: LoginCommand, 
    private getProfileCommand: GetProfileCommand, 
    private getAllProfilesCommand: GetAllProfilesCommand) {}

  @Post('login')
  async login(@Body() userDTO: UserDTO){
    const res = await this.loginCommand.execute(userDTO);
    return res;
  }

  @Post('register')
  async register(@Body() user: UserDTO){
    const res = await this.registerCommand.execute(user);
    return res;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAllProfiles(){
    const res = await this.getAllProfilesCommand.execute();
    return res;
  }

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: string){
    const res = await this.getProfileCommand.execute(id);
    return res;
  }
}
