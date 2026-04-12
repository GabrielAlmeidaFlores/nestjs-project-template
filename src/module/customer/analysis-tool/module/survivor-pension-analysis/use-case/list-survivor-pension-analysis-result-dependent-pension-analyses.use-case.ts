import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/survivor-pension-analysis-result.query.repository.gateway';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/survivor-pension-analysis-result-dependent-pension-analysis.query.repository.gateway';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-result-dependent-pension-analyses.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { SurvivorPensionAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase {
  protected readonly _type =
    ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisResultQueryRepositoryGateway)
    private readonly survivorPensionAnalysisResultQueryRepositoryGateway: SurvivorPensionAnalysisResultQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway: SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): Promise<ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto> {
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

    const dpaList =
      await this.survivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway.listBySurvivorPensionAnalysisResultId(
        survivorPensionAnalysisResultId,
      );

    const dependentPensionAnalyses = dpaList.map((dpa) =>
      GetSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto.build(
        {
          survivorPensionAnalysisResultDependentPensionAnalysisId: dpa.id,
          survivorPensionAnalysisResultId: dpa.survivorPensionAnalysisResultId,
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
    );

    return ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto.build(
      {
        dependentPensionAnalyses,
      },
    );
  }
}
