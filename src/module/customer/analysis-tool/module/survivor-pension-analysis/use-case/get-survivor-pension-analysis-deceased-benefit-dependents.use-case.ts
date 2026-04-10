import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/survivor-pension-analysis-deceased-benefit-dependents.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents-document.response.dto';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { SurvivorPensionAnalysisDbdNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-benefit-dependents-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase {
  protected readonly _type =
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDbdId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dbdResult =
      await this.survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDbdId,
        SurvivorPensionAnalysisDbdNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dbdResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    return GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.build(
      {
        survivorPensionAnalysisDbdId: dbdResult.id,
        survivorPensionAnalysisId: dbdResult.survivorPensionAnalysisId,
        ...(dbdResult.dependentFullName !== null && {
          dependentFullName: dbdResult.dependentFullName,
        }),
        ...(dbdResult.dependencyClassificationLevel !== null && {
          dependencyClassificationLevel:
            dbdResult.dependencyClassificationLevel,
        }),
        ...(dbdResult.type !== null && { type: dbdResult.type }),
        ...(dbdResult.gender !== null && { gender: dbdResult.gender }),
        ...(dbdResult.dateOfBirth !== null && {
          dateOfBirth: dbdResult.dateOfBirth,
        }),
        ...(dbdResult.hasDisabilityOrInvalidity !== null && {
          hasDisabilityOrInvalidity: dbdResult.hasDisabilityOrInvalidity,
        }),
        ...(dbdResult.unionCommencementDate !== null && {
          unionCommencementDate: dbdResult.unionCommencementDate,
        }),
        documents: dbdResult.documents.map((doc) =>
          GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentResponseDto.build(
            {
              documentType: doc.documentType,
              documentName: doc.documentName,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
            },
          ),
        ),
        createdAt: dbdResult.createdAt,
        updatedAt: dbdResult.updatedAt,
      },
    );
  }
}
