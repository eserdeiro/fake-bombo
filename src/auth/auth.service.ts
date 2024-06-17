import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcr from "bcrypt";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ErrorHandlingService } from 'src/common/error-handling/error-handling.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    // Inject the User repository for interacting with User entities.
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // Inject the ErrorHandlingService for centralized error handling.
    private readonly errorHandlingService: ErrorHandlingService,
    // Inject the JwtService for generating JWT tokens.
    private readonly jwtService: JwtService
  ) { }

  /**
   * Creates a new user with a hashed password.
   * @param createUserDto The DTO containing user data.
   * @returns The newly created user (without the password) and a JWT token.
   */
  async create(createUserDto: CreateUserDto) {
    try {
      // Destructure the DTO to separate the password from other user data.
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

      // Generate a JWT token for the newly created user.
      const token = this.getJwtToken({
        email: user.email
      });

      // Return the created user with the generated token.
      return {
        ...user, token
      };
    } catch (error) {
      // Handle database errors using the error handling service.
      this.errorHandlingService.handleDatabaseErrors(error);
    }
  }

  /**
   * Authenticates a user based on email and password.
   * @param loginUserDto The DTO containing email and password.
   * @returns The authenticated user (with email and password) and a JWT token.
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

    // Generate a JWT token for the authenticated user.
    const token = this.getJwtToken({
      email: user.email
    });

    // Return the authenticated user with the generated token.
    return {
      ...user,
      token
    };
  }

  /**
   * Generates a JWT token for a given payload.
   * @param payload The payload to include in the token.
   * @returns The generated JWT token.
   */
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
