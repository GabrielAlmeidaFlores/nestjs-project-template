import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/survivor-pension-analysis-deceased-benefit-dependents.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents-document.response.dto';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase {
  protected readonly _type =
    ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase.name;

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
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
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

    const dbdResults =
      await this.survivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway.findManyBySurvivorPensionAnalysisId(
        survivorPensionAnalysisId,
      );

    const dependents = dbdResults.map((dbd) =>
      GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.build({
        survivorPensionAnalysisDbdId: dbd.id,
        survivorPensionAnalysisId: dbd.survivorPensionAnalysisId,
        ...(dbd.dependentFullName !== null && {
          dependentFullName: dbd.dependentFullName,
        }),
        ...(dbd.dependencyClassificationLevel !== null && {
          dependencyClassificationLevel: dbd.dependencyClassificationLevel,
        }),
        ...(dbd.type !== null && { type: dbd.type }),
        ...(dbd.gender !== null && { gender: dbd.gender }),
        ...(dbd.dateOfBirth !== null && { dateOfBirth: dbd.dateOfBirth }),
        ...(dbd.hasDisabilityOrInvalidity !== null && {
          hasDisabilityOrInvalidity: dbd.hasDisabilityOrInvalidity,
        }),
        ...(dbd.unionCommencementDate !== null && {
          unionCommencementDate: dbd.unionCommencementDate,
        }),
        documents: dbd.documents.map((doc) =>
          GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentResponseDto.build(
            {
              documentType: doc.documentType,
              documentName: doc.documentName,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
            },
          ),
        ),
        createdAt: dbd.createdAt,
        updatedAt: dbd.updatedAt,
      }),
    );

    return ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto.build(
      { dependents },
    );
  }
}
