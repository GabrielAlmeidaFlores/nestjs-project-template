import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import { PreAuthIdentitySignInRequestDto } from '@module/generic/auth-identity/dto/request/pre-auth-identity-sign-in.request.dto';
import {
  PreAuthIdentityAuthenticatorDataSignInResponseDto,
  PreAuthIdentitySignInResponseDto,
} from '@module/generic/auth-identity/dto/response/pre-auth-identity-sign-in.response.dto';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { AccountDeactivatedError } from '@module/generic/auth-identity/error/account-deactivated.error';
import { AuthIdentitySessionConflictError } from '@module/generic/auth-identity/error/auth-identity-session-conflict.error';
import { OrganizationMemberDeactivatedError } from '@module/generic/auth-identity/error/organization-member-deactivated.error';
import { OrganizationMemberRemovedError } from '@module/generic/auth-identity/error/organization-member-removed.error';
import { WrongSignInCredentialsError } from '@module/generic/auth-identity/error/wrong-sign-in-credentials.error';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthenticatorGateway } from '@module/generic/auth-identity/lib/authenticator/authenticator.gateway';
import { AuthenticatorCredentialsOutputModel } from '@module/generic/auth-identity/lib/authenticator/model/output/authenticator-credentials.output.model';
import { EmailMFAGateway } from '@module/generic/auth-identity/lib/email-mfa/email-mfa.gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class PreAuthIdentitySignInUseCase {
  protected readonly _type = PreAuthIdentitySignInUseCase.name;

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthenticatorGateway)
    private readonly authenticatorGateway: AuthenticatorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(EmailMFAGateway)
    private readonly emailMFAGateway: EmailMFAGateway,
    @Inject(AuthIdentitySessionGateway)
    private readonly authIdentitySessionGateway: AuthIdentitySessionGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: PreAuthIdentitySignInRequestDto,
  ): Promise<PreAuthIdentitySignInResponseDto> {
    const identifier = dto.federalDocument ?? dto.email;

    if (!identifier) {
      throw new WrongSignInCredentialsError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocumentWithRelations(
        identifier,
      );

    if (!authIdentity) {
      throw new WrongSignInCredentialsError();
    }

    if (!authIdentity.isActive) {
      throw new AccountDeactivatedError();
    }

    const userLevel = authIdentity.admin
      ? UserLevelEnum.ADMIN
      : authIdentity.customer
        ? UserLevelEnum.CUSTOMER
        : authIdentity.supportAttendant
          ? UserLevelEnum.SUPPORT
          : null;

    if (userLevel === null) {
      throw new WrongSignInCredentialsError();
    }

    const isPasswordRight = bcrypt.compareSync(
      dto.password,
      authIdentity.password.toString(),
    );

    if (!isPasswordRight) {
      throw new WrongSignInCredentialsError();
    }

    if (authIdentity.customer !== null) {
      await this.validateOrganizationMemberStatus(authIdentity.customer.id);
    }

    const activeSession = await this.authIdentitySessionGateway.getSession(
      authIdentity.id,
    );

    if (dto.mfaOption === undefined) {
      return PreAuthIdentitySignInResponseDto.build({
        userLevel,
      });
    }

    if (activeSession !== null && dto.forceNewSession !== true) {
      throw new AuthIdentitySessionConflictError();
    }

    if (
      dto.mfaOption === SignInMFAOptionEnum.AUTHENTICATOR_APP &&
      authIdentity.authenticatorAppSecret === null
    ) {
      const authenticatorCredentials =
        await this.generateAuthenticatorSecret(authIdentity);

      return PreAuthIdentitySignInResponseDto.build({
        authenticatorData:
          PreAuthIdentityAuthenticatorDataSignInResponseDto.build({
            ...authenticatorCredentials,
          }),
      });
    }

    if (dto.mfaOption === SignInMFAOptionEnum.EMAIL) {
      const authIdentityName =
        authIdentity.customer?.name ??
        authIdentity.admin?.name ??
        authIdentity.supportAttendant?.name;

      if (authIdentityName === undefined) {
        throw new WrongSignInCredentialsError();
      }

      await this.emailMFAGateway.generatePersistAndSendSignInCode(
        authIdentity.id,
        authIdentityName,
        authIdentity.email,
      );
    }

    return PreAuthIdentitySignInResponseDto.build({
      userLevel,
    });
  }

  private async generateAuthenticatorSecret(
    authIdentity: GetAuthIdentityWithRelationsQueryResult,
  ): Promise<AuthenticatorCredentialsOutputModel> {
    const authenticatorCredentials =
      await this.authenticatorGateway.generateCredentials(
        authIdentity.email.toString(),
      );

    const updateAuthIdentityAuthenticatorAppSecret =
      this.authIdentityCommandRepositoryGateway.updateAuthenticatorAppSecret(
        authIdentity.id,
        authenticatorCredentials.secret,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      updateAuthIdentityAuthenticatorAppSecret,
    );
    await transaction.commit();

    return authenticatorCredentials;
  }

  private async validateOrganizationMemberStatus(
    customerId: CustomerId,
  ): Promise<void> {
    const member =
      await this.organizationMemberQueryRepositoryGateway.findOneOrganizationMemberByCustomerIdWithDeleted(
        customerId,
      );

    if (member === null) {
      return;
    }

    if (member.deletedAt !== null) {
      throw new OrganizationMemberRemovedError();
    }

    if (!member.isActive) {
      throw new OrganizationMemberDeactivatedError();
    }
  }
}
