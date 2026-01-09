import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminQueryRepositoryGateway } from '@module/admin/account/domain/repository/admin/query/admin.query.repository.gateway';
import { AdminEntity } from '@module/admin/account/domain/schema/entity/admin/admin.entity';
import { UpdateAdminRequestDto } from '@module/admin/account/dto/request/update-admin.request.dto';
import { UpdateAdminResponseDto } from '@module/admin/account/dto/response/update-admin.response.dto';
import { AdminNotFoundError } from '@module/admin/account/error/admin-not-found.error';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';

import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export class UpdateAdminUseCase {
  protected readonly _type = UpdateAdminUseCase.name;

  public constructor(
    @Inject(AdminQueryRepositoryGateway)
    private readonly adminQueryRepositoryGateway: AdminQueryRepositoryGateway,
    @Inject(AdminCommandRepositoryGateway)
    private readonly adminCommandRepositoryGateway: AdminCommandRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateAdminRequestDto,
  ): Promise<UpdateAdminResponseDto> {
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

    const updatedAdmin = new AdminEntity({
      ...admin,
      ...dto,
    });

    const updateAdminTransaction =
      this.adminCommandRepositoryGateway.updateAdmin(admin.id, updatedAdmin);

    const updatedAuthIdentity = new AuthIdentityEntity({
      ...authIdentity,
      ...dto,
    });

    const updateAuthIdentityTransaction =
      this.authIdentityCommandRepositoryGateway.updateAuthIdentity(
        authIdentity.id,
        updatedAuthIdentity,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateAdminTransaction,
      updateAuthIdentityTransaction,
    ]);

    await transaction.commit();

    const response = UpdateAdminResponseDto.build({
      ...authIdentity,
      ...admin,
    });

    return response;
  }
}
