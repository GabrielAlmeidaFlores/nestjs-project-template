import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-time-accelerator/command/rural-or-hybrid-retirement-analysis-time-accelerator.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';
import { DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway: RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    ruralOrHybridRetirementAnalysisTimeAcceleratorId: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway.deleteRuralOrHybridRetirementAnalysisTimeAccelerator(
        ruralOrHybridRetirementAnalysisTimeAcceleratorId,
      ),
    );

    await transaction.commit();

    return DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto.build(
      {
        ruralOrHybridRetirementAnalysisId,
      },
    );
  }
}
