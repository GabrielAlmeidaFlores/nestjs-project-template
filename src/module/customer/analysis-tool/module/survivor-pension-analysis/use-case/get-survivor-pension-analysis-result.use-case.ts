import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { GetSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-retirement-rule.response.dto';
import { GetSurvivorPensionAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisResultUseCase {
  protected readonly _type = GetSurvivorPensionAnalysisResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const result =
      await this.survivorPensionAnalysisResultQueryRepositoryGateway.findOneBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      );

    if (result === null) {
      throw new SurvivorPensionAnalysisResultNotFoundError();
    }

    return GetSurvivorPensionAnalysisResultResponseDto.build({
      survivorPensionAnalysisResultId: result.id,
      survivorPensionAnalysisId: result.survivorPensionAnalysisId,
      ...(result.isInsuredStatusConfirmed !== null && {
        isInsuredStatusConfirmed: result.isInsuredStatusConfirmed,
      }),
      ...(result.insuredStatusSummary !== null && {
        insuredStatusSummary: result.insuredStatusSummary,
      }),
      ...(result.isRetirementRightConfirmed !== null && {
        isRetirementRightConfirmed: result.isRetirementRightConfirmed,
      }),
      ...(result.retirementRightSummary !== null && {
        retirementRightSummary: result.retirementRightSummary,
      }),
      ...(result.completeAnalysis !== null && {
        completeAnalysis: result.completeAnalysis,
      }),
      ...(result.simplifiedAnalysis !== null && {
        simplifiedAnalysis: result.simplifiedAnalysis,
      }),
      retirementRules: result.retirementRules.map((rr) =>
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
      ),
      dependentPensionAnalyses: result.dependentPensionAnalyses.map((dpa) =>
        GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.build(
          {
            survivorPensionAnalysisDpaId: dpa.id,
            survivorPensionAnalysisResultId:
              dpa.survivorPensionAnalysisResultId,
            ...(dpa.dependentName !== null && {
              dependentName: dpa.dependentName,
            }),
            ...(dpa.dependencyDegree !== null && {
              dependencyDegree: dpa.dependencyDegree,
            }),
            ...(dpa.isDependencyVerified !== null && {
              isDependencyVerified: dpa.isDependencyVerified,
            }),
            ...(dpa.pensionStartDate !== null && {
              pensionStartDate: dpa.pensionStartDate,
            }),
            ...(dpa.estimatedPensionDuration !== null && {
              estimatedPensionDuration: dpa.estimatedPensionDuration,
            }),
            createdAt: dpa.createdAt,
            updatedAt: dpa.updatedAt,
          },
        ),
      ),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
