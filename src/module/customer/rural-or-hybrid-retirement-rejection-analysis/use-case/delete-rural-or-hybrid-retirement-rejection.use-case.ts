import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/account/error/organization-member-not-found.error';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/dto/response/rural-or-hybrid-retirement-rejection.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = DeleteRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionCommandRepositoryGateway: RuralOrHybridRetirementRejectionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
      ruralOrHybridRetirementRejectionId,
      RuralOrHybridRetirementRejectionNotFoundError,
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralOrHybridRetirementRejectionCommandRepositoryGateway.deleteRuralOrHybridRetirementRejection(
        ruralOrHybridRetirementRejectionId,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}
