import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentityForgotPasswordValidateCodeRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password-code.request.dto';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { AuthIdentitySignUpRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-up.request.dto';
import { UpdateAuthIdentityRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-update-password.request.dto';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AuthIdentityForgotPasswordCodeResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password-code.response.dto';
import { AuthIdentityResetPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-reset-password.response.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { AuthIdentitySignUpResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-up.response.dto';
import { UpdateAuthIdentityResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-update-password.response.dto';
import { AuthIdentityForgotPasswordValidateCodeUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password-validate-code.use-case';
import { AuthIdentityForgotPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password.use-case';
import { AuthIdentityResetPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-reset-password.use-case';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { UpdateAuthIdentityPasswordUseCase } from '@module/generic/auth-identity/use-case/update-auth-identity-password.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { AuthIdentitySignUpUseCaseGateway } from '@module/generic/auth-identity/use-case-gateway/auth-identity-sign-up.use-case-gateway';

@GenericControllerRoute('auth-identity')
export class AuthIdentityController {
  protected readonly _type = AuthIdentityController.name;

  public constructor(
    private readonly authIdentitySignInUseCase: AuthIdentitySignInUseCase,
    private readonly authIdentitySignUpUseCase: AuthIdentitySignUpUseCaseGateway,
    private readonly preAuthIdentitySignInUseCase: PreAuthIdentitySignInUseCase,
    private readonly authIdentityForgotPasswordUseCase: AuthIdentityForgotPasswordUseCase,
    private readonly authIdentityForgotPasswordValidateCodeUseCase: AuthIdentityForgotPasswordValidateCodeUseCase,
    private readonly authIdentityResetPasswordUseCase: AuthIdentityResetPasswordUseCase,
    private readonly updateAuthIdentityPasswordUseCase: UpdateAuthIdentityPasswordUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'User sign-up',
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
      type: AuthIdentitySignUpRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'User registered successfully.',
      type: AuthIdentitySignUpResponseDto,
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 5,
    },
  })
  public async authIdentitySignUp(
    @Body() dto: AuthIdentitySignUpRequestDto,
  ): Promise<AuthIdentitySignUpResponseDto> {
    return await this.authIdentitySignUpUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'User sign-in',
    http: {
      path: 'sign-in',
      method: RequestMethod.POST,
      type: AuthIdentitySignInRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'User authenticated successfully.',
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
    summary: 'Request sign-in verification code',
    http: {
      path: 'sign-in/pre',
      method: RequestMethod.POST,
      type: PreAuthIdentitySignInRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Verification code sent to the registered email.',
    },
    throttle: {
      limit: 5,
      ttlInMinutes: 2,
    },
  })
  public async preAuthIdentitySignIn(
    @Body() dto: PreAuthIdentitySignInRequestDto,
  ): Promise<void> {
    return await this.preAuthIdentitySignInUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Forgot password',
    http: {
      path: 'forgot-password',
      method: RequestMethod.POST,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Password reset email sent.',
    },
    throttle: {
      limit: 10,
      ttlInMinutes: 2,
    },
  })
  public async forgotPassword(
    @Body() dto: AuthIdentityForgotPasswordRequestDto,
  ): Promise<void> {
    return await this.authIdentityForgotPasswordUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Validate password reset code',
    http: {
      path: 'forgot-password/validate-code',
      method: RequestMethod.POST,
      type: AuthIdentityForgotPasswordValidateCodeRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Reset code validated successfully.',
      type: AuthIdentityForgotPasswordCodeResponseDto,
    },
  })
  public async validateCode(
    @Body() dto: AuthIdentityForgotPasswordValidateCodeRequestDto,
  ): Promise<AuthIdentityForgotPasswordCodeResponseDto> {
    return await this.authIdentityForgotPasswordValidateCodeUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Reset password',
    http: {
      path: 'reset-password',
      method: RequestMethod.PATCH,
      type: AuthIdentityResetPasswordRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Password updated successfully.',
      type: AuthIdentityResetPasswordResponseDto,
    },
  })
  public async resetPassword(
    @Body() dto: AuthIdentityResetPasswordRequestDto,
  ): Promise<AuthIdentityResetPasswordResponseDto> {
    return await this.authIdentityResetPasswordUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Update authenticated user password',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: 'password',
      method: RequestMethod.PATCH,
      type: UpdateAuthIdentityRequestDto,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Password updated successfully.',
      type: UpdateAuthIdentityResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateAuthIdentityPassword(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: UpdateAuthIdentityRequestDto,
  ): Promise<UpdateAuthIdentityResponseDto> {
    return await this.updateAuthIdentityPasswordUseCase.execute(
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Validate authenticated user session',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: 'sign-in/validate',
      method: RequestMethod.GET,
    },
    tag: ['auth'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Session validated successfully.',
      type: AuthIdentitySignInResponseDto,
    },
    guard: [AuthGuard],
  })
  public validateAuthIdentitySignIn(
    @GetSessionData() sessionData: SessionDataModel,
  ): AuthIdentitySignInResponseDto {
    return AuthIdentitySignInResponseDto.build(sessionData);
  }
}
