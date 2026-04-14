import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/command/survivor-pension-analysis-result-retirement-rule.command.repository.gateway';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';
import { DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-result-retirement-rule.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase {
  protected readonly _type =
    DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway)
    private readonly survivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway: SurvivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisResultRetirementRuleId: SurvivorPensionAnalysisResultRetirementRuleId,
  ): Promise<DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisResultRetirementRuleCommandRepositoryGateway.deleteSurvivorPensionAnalysisResultRetirementRule(
        survivorPensionAnalysisResultRetirementRuleId,
      ),
    ]);

    await txn.commit();

    return DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto.build({
      survivorPensionAnalysisResultRetirementRuleId,
    });
  }
}
