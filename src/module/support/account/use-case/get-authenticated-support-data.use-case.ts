import { Inject, Injectable } from '@nestjs/common';

import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { SupportAttendantQueryRepositoryGateway } from '@module/support/account/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { GetAuthenticatedSupportDataResponseDto } from '@module/support/account/dto/response/get-authenticated-support-data.response.dto';
import { SupportAccountNotFoundError } from '@module/support/account/error/support-account-not-found.error';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAuthenticatedSupportDataUseCase {
  protected readonly _type = GetAuthenticatedSupportDataUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
  ): Promise<GetAuthenticatedSupportDataResponseDto> {
    const supportAttendant =
      await this.supportAttendantQueryRepositoryGateway.findOneByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!supportAttendant) {
      throw new SupportAccountNotFoundError();
    }

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityById(
        sessionData.authIdentityId,
      );

    if (!authIdentity) {
      throw new SupportAccountNotFoundError();
    }

    return GetAuthenticatedSupportDataResponseDto.build({
      name: supportAttendant.name,
      email: authIdentity.email,
      federalDocument: authIdentity.federalDocument,
      supportType: supportAttendant.supportType,
    });
  }
}
