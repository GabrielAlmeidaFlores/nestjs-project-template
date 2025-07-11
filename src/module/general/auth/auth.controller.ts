import {
  Body,
  HttpStatus,
  RequestMethod,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CustomerSignUpRequestDto } from '@module/general/auth/dto/request/customer-sign-up.request.dto';
import { LoginRequestDto } from '@module/general/auth/dto/request/login.request.dto';
import { AuthVerificationResponseDto } from '@module/general/auth/dto/response/auth-verification.response.dto';
import { CustomerSignUpResponseDto } from '@module/general/auth/dto/response/customer-sign-up.response.dto';
import { LoginResponseDto } from '@module/general/auth/dto/response/login.response.dto';
import { CustomerSignUpUseCase } from '@module/general/auth/use-case/customer-sign-up.use-case';
import { LoginUseCase } from '@module/general/auth/use-case/login.use-case';
import { LogoutUseCase } from '@module/general/auth/use-case/logout.use-case';
import { UserAuthGuard } from '@shared/api/gateway/guard/user-auth/user-auth.guard';
import { GeneralController } from '@shared/api/util/decorator/class/controller-routing/general-controller.decorator copy';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetUserData } from '@shared/api/util/decorator/method/get-user-data/get-user-data.decorator';
import { UserDataInputModel } from '@shared/api/util/decorator/method/get-user-data/model/input/user-data.input.model';

@GeneralController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;

  public constructor(
    private readonly customerSignUpUseCase: CustomerSignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Customer signup',
    secure: false,
    http: {
      path: 'customer/sign-up',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Customer signed up successfully',
      type: CustomerSignUpResponseDto,
    },
  })
  public async signUp(
    @Body() dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    return await this.customerSignUpUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'User login',
    secure: false,
    http: {
      path: 'login',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'User logged in successfully',
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
    summary: 'User logout',
    secure: true,
    http: {
      path: 'logout',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'User logged out successfully',
    },
  })
  @UseGuards(UserAuthGuard)
  public logout(@Res({ passthrough: true }) reply: FastifyReply): void {
    return this.logoutUseCase.execute(reply);
  }

  @BuildEndpointSpecification({
    summary: 'User authentication verification',
    secure: true,
    http: {
      path: 'verify',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'User authentication verified successfully',
      type: AuthVerificationResponseDto,
    },
  })
  @UseGuards(UserAuthGuard)
  public authVerification(
    @GetUserData() userData: UserDataInputModel,
  ): AuthVerificationResponseDto {
    return AuthVerificationResponseDto.build(userData);
  }
}
