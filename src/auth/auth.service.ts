import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    const { username, password, password2 } = authSignUpDto;

    if (password !== password2) {
      throw new BadRequestException('Passwords do not match');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    if (!user) {
      console.log('User not created');
      throw new InternalServerErrorException();
    }

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      // Duplicate Key
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<{ accessToken: string }> {
    const { username, password } = authSignInDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your Login Credentials');
    }
  }
}
