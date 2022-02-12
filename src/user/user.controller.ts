import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Title } from '@prisma/client';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserPublic } from './dto/user-public.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() data: UserCreateDTO): Promise<UserPublic> {
    return this.service.create(data);
  }

  @Get()
  users(): Promise<UserPublic[]> {
    return this.service.users({});
  }

  @Get('/:id')
  user(@Param('id') id: string): Promise<UserPublic> {
    return this.service.user({
      id: +id,
    });
  }

  @Get('/:id/title')
  title(@Param('id') id: string): Promise<Title> {
    return this.service.title(id);
  }

  @Get('/:id/titles')
  titles(@Param('id') id: string): Promise<Title[]> {
    return this.service.titles(id);
  }
}
