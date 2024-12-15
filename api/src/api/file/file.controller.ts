import { Body, Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/application/auth/jwt/guard/jwt.guard";
import GetFileByIdCommand from "src/application/file/GetFileById/GetFileByIdCommand";
import GetFilesCommand from "src/application/file/GetFiles/GetFilesCommand";

@Controller('files')
export class FileController{
  constructor(private getFilesCommand: GetFilesCommand, private getFileByIdCommand: GetFileByIdCommand){}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFiles(@Query() query){
    let res = await this.getFilesCommand.execute(query);
    return res;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getFileById(@Param() id: string, @Body('userId') userId: string){
    let res = await this.getFileByIdCommand.execute(id, userId);
    return res;
  }
}