import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcr from "bcrypt";
import { ErrorHandlingService } from 'src/common/error-handling/error-handling.service';

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
}
