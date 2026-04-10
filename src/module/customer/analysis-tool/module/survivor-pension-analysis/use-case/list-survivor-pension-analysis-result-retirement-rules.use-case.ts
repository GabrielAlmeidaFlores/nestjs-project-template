import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/survivor-pension-analysis-result-retirement-rule.query.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { GetSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-retirement-rule.response.dto';
import { ListSurvivorPensionAnalysisResultRetirementRulesResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-result-retirement-rules.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSurvivorPensionAnalysisResultRetirementRulesUseCase {
  protected readonly _type =
    ListSurvivorPensionAnalysisResultRetirementRulesUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway: SurvivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): Promise<ListSurvivorPensionAnalysisResultRetirementRulesResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const resultResult =
      await this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisResultId,
        SurvivorPensionAnalysisResultNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      resultResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const rrList =
      await this.survivorPensionAnalysisResultRetirementRuleQueryRepositoryGateway.findManyBySurvivorPensionAnalysisResultId(
        survivorPensionAnalysisResultId,
      );

    const retirementRules = rrList.map((rr) =>
      GetSurvivorPensionAnalysisResultRetirementRuleResponseDto.build({
        survivorPensionAnalysisRrId: rr.id,
        survivorPensionAnalysisResultId: rr.survivorPensionAnalysisResultId,
        ...(rr.ruleName !== null && { ruleName: rr.ruleName }),
        ...(rr.isRequirementMet !== null && {
          isRequirementMet: rr.isRequirementMet,
        }),
        ...(rr.entitlementDate !== null && {
          entitlementDate: rr.entitlementDate,
        }),
        ...(rr.estimatedRmi !== null && { estimatedRmi: rr.estimatedRmi }),
        ...(rr.isBestRmi !== null && { isBestRmi: rr.isBestRmi }),
        ...(rr.isHighestClaimValue !== null && {
          isHighestClaimValue: rr.isHighestClaimValue,
        }),
        ...(rr.detailedAnalysis !== null && {
          detailedAnalysis: rr.detailedAnalysis,
        }),
        createdAt: rr.createdAt,
        updatedAt: rr.updatedAt,
      }),
    );

    return ListSurvivorPensionAnalysisResultRetirementRulesResponseDto.build({
      retirementRules,
    });
  }
}
