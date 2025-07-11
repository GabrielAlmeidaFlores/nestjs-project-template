import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { LoginRequestDto } from '@module/customer/auth/dto/request/login.request.dto';
import { SignUpRequestDto } from '@module/customer/auth/dto/request/sign-up.request.dto';
import { LoginResponseDto } from '@module/customer/auth/dto/response/login.response.dto';
import { SignUpResponseDto } from '@module/customer/auth/dto/response/sign-up.response.dto';
import { LoginUseCase } from '@module/customer/auth/use-case/login.use-case';
import { LogoutUseCase } from '@module/customer/auth/use-case/logout.use-case';
import { SignUpUseCase } from '@module/customer/auth/use-case/sign-up.use-case';
import { CustomerController } from '@shared/api/decorator/class/controller-routing/customer-controller.decorator';
import { BuildEndpointSpecification } from '@shared/api/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@CustomerController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;

  public constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Customer signup',
    secure: false,
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Customer signed up successfully',
      type: SignUpResponseDto,
    },
  })
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return await this.signUpUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Customer login',
    secure: false,
    http: {
      path: 'login',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Customer logged in successfully ',
      type: LoginResponseDto,
    },
  })
  public async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.loginUseCase.execute(reply, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Customer logout',
    secure: true,
    http: {
      path: 'logout',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Customer logged out successfully ',
    },
  })
  public logout(@Res({ passthrough: true }) reply: FastifyReply): void {
    return this.logoutUseCase.execute(reply);
  }
}
