import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/survivor-pension-analysis-customer-profile-identification.query.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-customer-profile-identification.response.dto';
import { SurvivorPensionAnalysisCpiNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-customer-profile-identification-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase {
  protected readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway: SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisCpiId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cpiResult =
      await this.survivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisCpiId,
        SurvivorPensionAnalysisCpiNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      cpiResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    return GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto.build(
      {
        survivorPensionAnalysisCpiId: cpiResult.id,
        survivorPensionAnalysisId: cpiResult.survivorPensionAnalysisId,
        ...(cpiResult.analysisToolClientId !== null && {
          analysisToolClientId: cpiResult.analysisToolClientId,
        }),
        ...(cpiResult.clientJobTitle !== null && {
          clientJobTitle: cpiResult.clientJobTitle,
        }),
        ...(cpiResult.legalProceedingNumber !== null && {
          legalProceedingNumber: cpiResult.legalProceedingNumber,
        }),
        ...(cpiResult.inssBenefitNumber !== null && {
          inssBenefitNumber: cpiResult.inssBenefitNumber,
        }),
        ...(cpiResult.analysisName !== null && {
          analysisName: cpiResult.analysisName,
        }),
        ...(cpiResult.analysisPurpose !== null && {
          analysisPurpose: cpiResult.analysisPurpose,
        }),
        createdAt: cpiResult.createdAt,
        updatedAt: cpiResult.updatedAt,
      },
    );
  }
}
