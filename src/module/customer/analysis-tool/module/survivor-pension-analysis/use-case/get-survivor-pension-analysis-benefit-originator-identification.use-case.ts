import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/survivor-pension-analysis-benefit-originator-identification.query.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-benefit-originator-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase {
  protected readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const boiResult =
      await this.survivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisBenefitOriginatorIdentificationId,
        SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      boiResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    return GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto.build(
      {
        survivorPensionAnalysisBenefitOriginatorIdentificationId: boiResult.id,
        survivorPensionAnalysisId: boiResult.survivorPensionAnalysisId,
        ...(boiResult.analysisToolClientId !== null && {
          analysisToolClientId: boiResult.analysisToolClientId,
        }),
        ...(boiResult.deathDate !== null && {
          deathDate: boiResult.deathDate,
        }),
        ...(boiResult.federativeEntity !== null && {
          federativeEntity: boiResult.federativeEntity,
        }),
        ...(boiResult.stateCode !== null && {
          stateCode: boiResult.stateCode,
        }),
        ...(boiResult.beneficiaryWasRetired !== null && {
          beneficiaryWasRetired: boiResult.beneficiaryWasRetired,
        }),
        createdAt: boiResult.createdAt,
        updatedAt: boiResult.updatedAt,
      },
    );
  }
}
