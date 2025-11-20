import { Body, HttpStatus, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthIdentityForgotPasswordValidateCodeRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password-code.request.dto';
import { AuthIdentityForgotPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-forgot-password.request.dto';
import { AuthIdentityResetPasswordRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-reset-password.request.dto';
import { AuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-sign-in.request.dto';
import { UpdateAuthIdentityRequestDto } from '@module/generic/auth-identity/dto/request/auth-identity-update-password.request.dto';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import { AuthIdentityForgotPasswordCodeResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-forgot-password-code.response.dto';
import { AuthIdentityResetPasswordResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-reset-password.response.dto';
import { AuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-sign-in.response.dto';
import { UpdateAuthIdentityResponseDto } from '@module/generic/auth-identity/dto/response/auth-identity-update-password.response.dto';
import { PreAuthIdentitySignInResponseDto } from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { AuthIdentityForgotPasswordValidateCodeUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password-validate-code.use-case';
import { AuthIdentityForgotPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-forgot-password.use-case';
import { AuthIdentityResetPasswordUseCase } from '@module/generic/auth-identity/use-case/auth-identity-reset-password.use-case';
import { AuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-in.use-case';
import { AuthIdentitySignOutUseCase } from '@module/generic/auth-identity/use-case/auth-identity-sign-out.use-case';
import { PreAuthIdentitySignInUseCase } from '@module/generic/auth-identity/use-case/pre-auth-identity-sign-in.use-case';
import { UpdateAuthIdentityPasswordUseCase } from '@module/generic/auth-identity/use-case/update-auth-identity-password.use-case';
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
    private readonly authIdentityForgotPasswordUseCase: AuthIdentityForgotPasswordUseCase,
    private readonly authIdentityForgotPasswordValidateCodeUseCase: AuthIdentityForgotPasswordValidateCodeUseCase,
    private readonly authIdentityResetPasswordUseCase: AuthIdentityResetPasswordUseCase,
    private readonly updateAuthIdentityPasswordUseCase: UpdateAuthIdentityPasswordUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Pré-autenticação de usuário',
    http: {
      path: 'pre-sign-in',
      method: RequestMethod.POST,
      type: PreAuthIdentitySignInRequestDto,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Credenciais do usuário validadas e pré-autenticação concluída com sucesso.',
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
    summary: 'Autenticação de usuário',
    http: {
      path: 'sign-in',
      method: RequestMethod.POST,
      type: AuthIdentitySignInRequestDto,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Credenciais do usuário validadas e autenticação concluída com sucesso.',
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
    summary: 'Esqueci minha senha',
    http: {
      path: 'forgot-password',
      method: RequestMethod.POST,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'E-mail para redefinição de senha enviado com sucesso.',
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
    summary: 'Validar código de redefinição de senha',
    http: {
      path: 'forgot-password/validate-code',
      method: RequestMethod.POST,
      type: AuthIdentityForgotPasswordValidateCodeRequestDto,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Código de redefinição de senha validado com sucesso.',
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
    summary: 'Redefinir senha',
    http: {
      path: 'reset-password',
      method: RequestMethod.PATCH,
      type: AuthIdentityResetPasswordRequestDto,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'A senha foi atualizada com sucesso.',
      type: AuthIdentityResetPasswordResponseDto,
    },
  })
  public async resetPassword(
    @Body() dto: AuthIdentityResetPasswordRequestDto,
  ): Promise<AuthIdentityResetPasswordResponseDto> {
    return await this.authIdentityResetPasswordUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar senha do usuário autenticado',
    http: {
      path: 'password',
      method: RequestMethod.PATCH,
      type: UpdateAuthIdentityRequestDto,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Senha do usuário atualizada com sucesso.',
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
    summary: 'Validar sessão do usuário autenticado',
    http: {
      path: 'sign-in/validate',
      method: RequestMethod.GET,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Sessão do usuário validada com sucesso.',
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
    summary: 'Logout de usuário',
    http: {
      path: 'sign-out',
      method: RequestMethod.HEAD,
    },
    tag: ['autenticacao'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description:
        'Sessão do usuário invalidada e logout realizado com sucesso.',
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
