import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user'})
  @ApiBody({ type: AuthDto })
  @ApiOkResponse({schema: {example: {key: 'api_key'}}})
  @ApiForbiddenResponse({schema: {example: {message: 'Error message', statusCode: 403}}})
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register user'})
  @ApiBody({ type: AuthDto })
  @ApiCreatedResponse({schema: {example: {key: 'api_key'}}})
  @ApiBadRequestResponse({schema: {example: {message: 'Error message', statusCode: 404}}})
  @Post('register')
  public register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

}
