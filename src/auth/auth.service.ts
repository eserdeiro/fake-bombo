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

  /**
   * Creates a new user with a hashed password.
   * @param createUserDto The DTO containing user data.
   * @returns The newly created user (without the password).
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      // Create a new user entity with the provided data and a hashed password.
      const user = this.userRepository.create({
        ...userData,
        password: bcr.hashSync(password, 10) // Hash the password using bcrypt.
      });

      // Save the user to the database.
      await this.userRepository.save(user);

      // Remove the password from the returned user object for security.
      delete user.password;

      // Return the created user.
      return user;
    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Authenticates a user based on email and password.
   * @param loginUserDto The DTO containing email and password.
   * @returns The authenticated user (with email and password).
   */
  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    // Find the user by email, selecting only email and password for security.
    const user = await this.userRepository.findOne({
      where: {
        email
      },
      select: {
        email: true,
        password: true,
      }
    });

    // Throw an UnauthorizedException if the user is not found.
    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }

    // Compare the provided password with the stored hashed password.
    if (!bcr.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    // Return the authenticated user.
    return user;
  }

}
