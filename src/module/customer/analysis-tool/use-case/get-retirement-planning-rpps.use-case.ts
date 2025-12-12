import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import {
  GetRetirementPlanningRppsCidResponseDto,
  GetRetirementPlanningRppsPeriodDisabilityResponseDto,
  GetRetirementPlanningRppsPeriodResponseDto,
  GetRetirementPlanningRppsPeriodSpecialTimeResponseDto,
  GetRetirementPlanningRppsResponseDto,
  GetRetirementPlanningRppsResultResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rpps.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRppsUseCase {
  protected readonly _type = GetRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRppsQueryResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const periods = retirementPlanningRppsQueryResult.periods.map((period) => {
      const specialTimePeriod = period.specialTimePeriod
        ? GetRetirementPlanningRppsPeriodSpecialTimeResponseDto.build({
            type: period.specialTimePeriod.type,
            startDate: period.specialTimePeriod.startDate,
            endDate: period.specialTimePeriod.endDate,
          })
        : null;

      const disabilityPeriod = period.disabilityPeriod
        ? GetRetirementPlanningRppsPeriodDisabilityResponseDto.build({
            type: period.disabilityPeriod.type,
            degree: period.disabilityPeriod.degree,
            startDate: period.disabilityPeriod.startDate,
            endDate: period.disabilityPeriod.endDate,
            category: period.disabilityPeriod.category,
            description: period.disabilityPeriod.description,
            dailyImpact: period.disabilityPeriod.dailyImpact,
            cid: GetRetirementPlanningRppsCidResponseDto.build({
              code: period.disabilityPeriod.cid.code,
              description: period.disabilityPeriod.cid.description,
            }),
          })
        : null;

      return GetRetirementPlanningRppsPeriodResponseDto.build({
        startDate: period.startDate,
        endDate: period.endDate,
        jobPosition: period.jobPosition,
        career: period.career,
        serviceType: period.serviceType,
        department: period.department,
        specialTimePeriod,
        disabilityPeriod,
      });
    });

    const response = GetRetirementPlanningRppsResponseDto.build({
      id: retirementPlanningRppsQueryResult.id,
      ctcDocument: retirementPlanningRppsQueryResult.ctcDocument,
      careerStartDate: retirementPlanningRppsQueryResult.careerStartDate,
      publicServiceStartDate:
        retirementPlanningRppsQueryResult.publicServiceStartDate,
      createdAt: retirementPlanningRppsQueryResult.createdAt,
      updatedAt: retirementPlanningRppsQueryResult.updatedAt,
      retirementPlanningRppsResult:
        retirementPlanningRppsQueryResult.retirementPlanningRppsResult !== null
          ? GetRetirementPlanningRppsResultResponseDto.build({
              ...retirementPlanningRppsQueryResult.retirementPlanningRppsResult,
            })
          : null,
      periods,
    });

    return response;
  }
}
