import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/loginUsuario.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { validate } from 'class-validator';
import { LoginCatadorDto } from './dto/loginCatador.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  //Login Usuário
  @Post('login/usuario')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async loginUsuario(@Body() dto: LoginUsuarioDto) {
    return this.authService.loginUsuario(dto.email, dto.senha);
  }

  //Login Catador
  @Post('catador/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({whitelist: true}))
  async loginCatador(@Body() dto: LoginCatadorDto) {
    return this.authService.loginCatador(dto.email, dto.senha);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user; // usuario autenticado
  }
}
