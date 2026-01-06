import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { GetRetirementPlanningRgpsDetailsResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-details.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRgpsDetailsUseCase {
  protected readonly _type = GetRetirementPlanningRgpsDetailsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsDetailsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRgpsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRgpsNotFoundError,
      );

    return GetRetirementPlanningRgpsDetailsResponseDto.build({
      id: retirementPlanningRgps.id,
      name: retirementPlanningRgps.cnisDocument,
      federalDocumentNumber:
        retirementPlanningRgps.retirementPlanningRgpsResult?.clientFederalDocument?.toString() ??
        '',
      birthdate:
        retirementPlanningRgps.retirementPlanningRgpsResult?.clientBirthDate ??
        new Date(),
      gender: analysisRecord.analysisToolClient.gender ?? null,
      email: analysisRecord.analysisToolClient.email ?? null,
      phoneNumber: analysisRecord.analysisToolClient.phoneNumber ?? null,
      type: analysisRecord.analysisToolClient.clientType,
      category: 'Validar',
      legalProceedingNumber:
        retirementPlanningRgps.retirementPlanningRgpsLegalProceeding?.map(
          (legalProceeding) => legalProceeding.legalProceedingNumber,
        ) ?? [],
      inssBenefitNumber:
        retirementPlanningRgps.retirementPlanningRgpsBenefit?.map(
          (benefit) => benefit.inssBenefitNumber,
        ) ?? [],
      contributionTimeWithoutPendency: '',
      contributionTimeWithPendency: '',
      contributionTimeWithAcceleration: '',
      carencyTimeWithoutPendency: '',
      carencyTimeWithPendency: '',
      carencyTimeWithAcceleration: '',
    });
  }
}
