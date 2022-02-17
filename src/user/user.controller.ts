import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Match, Title, User } from '@prisma/client';
import { TokenDTO } from 'src/auth/dto/token.dto';
import { Token } from 'src/common/decorator/token.decorator';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() data: UserCreateDTO): Promise<Partial<User>> {
    return this.service.create(data);
  }

  @Get()
  users(): Promise<Partial<User>[]> {
    return this.service.users({});
  }

  @ApiBearerAuth()
  @Get('/self')
  self(@Token() token: any): Promise<Partial<User>> {
    return this.service.user({
      id: token.id,
    });
  }

  @Get('/:id')
  user(@Param('id') id: string): Promise<Partial<User>> {
    return this.service.user({
      id: +id,
    });
  }

  @Get('/:id/matches')
  userMatches(@Param('id') id: string): Promise<Match[]> {
    return this.service.userMatches(id);
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
