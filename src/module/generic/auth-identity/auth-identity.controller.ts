import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { PreAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@GenericControllerRoute('auth-identity')
export class AuthIdentityController {
  protected readonly _type = AuthIdentityController.name;

  public constructor(
    private readonly preAuthIdentitySignInUseCase: PreAuthIdentitySignInUseCase,
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
}
