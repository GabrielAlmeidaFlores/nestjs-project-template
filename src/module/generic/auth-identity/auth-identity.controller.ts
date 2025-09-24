import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { PreAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { AuthIdentitySignOutUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-out.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@GenericControllerRoute('auth-identity')
export class AuthIdentityController {
  protected readonly _type = AuthIdentityController.name;

  public constructor(
    private readonly preAuthIdentitySignInUseCase: PreAuthIdentitySignInUseCase,
    private readonly authIdentitySignInUseCase: AuthIdentitySignInUseCase,
    private readonly authIdentitySignOutUseCase: AuthIdentitySignOutUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'User pre-sign-in',
    http: {
      path: 'pre-sign-in',
      method: RequestMethod.POST,
      type: PreAuthIdentitySignInRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'User credentials were validated successfully and pre-authentication completed',
      type: PreAuthIdentitySignInResponseDto,
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 2,
    },
  })
  public async preAuthIdentitySignIn(
    @Body() dto: PreAuthIdentitySignInRequestDto,
  ): Promise<PreAuthIdentitySignInResponseDto> {
    return await this.preAuthIdentitySignInUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'User sign-in',
    http: {
      path: 'sign-in',
      method: RequestMethod.POST,
      type: AuthIdentitySignInRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'User credentials were validated successfully and authentication completed',
      type: AuthIdentitySignInResponseDto,
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 2,
    },
  })
  public async authIdentitySignIn(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() dto: AuthIdentitySignInRequestDto,
  ): Promise<AuthIdentitySignInResponseDto> {
    return await this.authIdentitySignInUseCase.execute(reply, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Validate authenticated user',
    http: {
      path: 'validate-sign-in',
      method: RequestMethod.GET,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'User credentials were validated successfully and authentication is valid',
      type: AuthIdentitySignInResponseDto,
    },
    guard: [AuthGuard],
  })
  public validateAuthIdentitySignIn(
    @GetSessionData() sessionData: SessionDataModel,
  ): AuthIdentitySignInResponseDto {
    return AuthIdentitySignInResponseDto.build(sessionData);
  }

  @BuildEndpointSpecification({
    summary: 'User sign-out',
    http: {
      path: 'sign-out',
      method: RequestMethod.HEAD,
    },
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'User session invalidated and signed out',
    },
    guard: [AuthGuard],
  })
  public async authIdentitySignOut(
    @Res({ passthrough: true }) reply: FastifyReply,
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<void> {
    return await this.authIdentitySignOutUseCase.execute(reply, sessionData);
  }
}
