import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { PreAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@GenericControllerRoute('auth-identity')
export class AuthIdentityController {
  protected readonly _type = AuthIdentityController.name;

  public constructor(
    private readonly preAuthIdentitySignInUseCase: PreAuthIdentitySignInUseCase,
    private readonly authIdentitySignInUseCase: AuthIdentitySignInUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Pre-authenticate user',
    secure: false,
    http: {
      path: 'pre-sign-in',
      method: RequestMethod.POST,
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
    summary: 'Authenticate user',
    secure: false,
    http: {
      path: 'sign-in',
      method: RequestMethod.POST,
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
}
