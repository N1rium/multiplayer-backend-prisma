import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
