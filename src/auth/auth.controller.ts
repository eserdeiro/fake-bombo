import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiCreatedResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ type: User })
  @ApiBody({ type: LoginUserDto })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get('check-status')
  @Auth()
  @ApiOkResponse({ type: User })
  checkStatus(
    @GetUser() user: User,
  ) {
    return this.authService.checkStatus(user)
  }

  //TODO: ADD PATCH USER

  // @Get('private')
  // @Auth(ValidRoles.admin)
  // testingPrivateRoute(
  //   @GetUser() user: User,
  // ) {
  //   return {
  //     ok: true,
  //     user,
  //   }
  // }

}
