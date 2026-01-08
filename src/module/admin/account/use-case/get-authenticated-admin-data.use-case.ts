import { Inject } from '@nestjs/common';

import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { GetAuthenticatedAdminDataResponseDto } from '@module/admin/account/dto/response/get-authenticated-admin-data.response.dto';
import { AdminNotFoundError } from '@module/admin/account/error/admin-not-found.error';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class GetAuthenticatedAdminDataUseCase {
  protected readonly _type = GetAuthenticatedAdminDataUseCase.name;

  public constructor(
    @Inject(AdminQueryRepositoryGateway)
    private readonly adminQueryRepositoryGateway: AdminQueryRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
  ): Promise<GetAuthenticatedAdminDataResponseDto> {
    const admin =
      await this.adminQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        AdminNotFoundError,
      );

    const authIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityById(
        sessionData.authIdentityId,
      );

    if (!authIdentity) {
      throw new AdminNotFoundError();
    }

    const response = GetAuthenticatedAdminDataResponseDto.build({
      name: admin.name,
      email: authIdentity.email,
      federalDocument: authIdentity.federalDocument,
    });

    return response;
  }
}
