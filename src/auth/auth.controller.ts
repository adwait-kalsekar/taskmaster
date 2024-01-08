import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<User> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('signin')
  signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInDto);
  }
}
