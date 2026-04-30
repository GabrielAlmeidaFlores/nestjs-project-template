import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period/command/rural-or-hybrid-retirement-rejection-work-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-work-period.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriod(
        ruralOrHybridRetirementRejectionWorkPeriodId,
      ),
    );

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}
