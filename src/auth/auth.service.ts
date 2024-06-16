import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcr from "bcrypt";
import { ErrorHandlingService } from 'src/common/error-handling/error-handling.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly errorHandlingService: ErrorHandlingService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcr.hashSync(password, 10)
      })

      await this.userRepository.save(user)
      delete user.password
      return user
    } catch (error) {
      this.errorHandlingService.handleDatabaseErrors(error)
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne(
      {
        where: {
          email
        },
        select: {
          email: true,
          password: true,
        }
      }
    )
    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`)
    }

    if (!bcr.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Invalid credentials`)
    }

    return user
  }

}
