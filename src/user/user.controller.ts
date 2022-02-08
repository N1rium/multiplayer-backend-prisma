import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Title } from '@prisma/client';
import { CreateUserDTO } from './dto/user-create.dto';
import { UserPublic } from './dto/user-public.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() data: CreateUserDTO): Promise<UserPublic> {
    return this.service.create(data);
  }

  @Get('/:id/title')
  title(@Param('id') id: number): Promise<Title> {
    return this.service.title(id);
  }

  @Get('/:id/titles')
  titles(@Param('id') id: number): Promise<Title[]> {
    return this.service.titles(id);
  }
}
