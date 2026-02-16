import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-period-not-found.error';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/enum/reason-pendency.enum';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { GetRetirementPlanningRgpsPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-period-earning.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase {
  protected readonly _type =
    GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway)
    private readonly retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway: RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodEarningResponseDto[]> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRgpsPeriod =
      await this.retirementPlanningRgpsPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsPeriodIdOrFail(
        retirementPlanningRgpsPeriodId,
        RetirementPlanningRgpsPeriodNotFoundError,
      );

    if (
      retirementPlanningRgpsPeriod.isPendency === true &&
      retirementPlanningRgpsPeriod.reasonPendency !==
        ReasonPendencyEnum.COMPETENCE_BELOW_MINIMUM
    ) {
      return [];
    }

    const earnings =
      await this.retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway.findByRetirementPlanningRgpsPeriodId(
        retirementPlanningRgpsPeriodId,
      );

    const filtered = earnings.filter(
      (e) => e.competenceBelowTheMinimum === true,
    );

    const resource = filtered.map((item) =>
      GetRetirementPlanningRgpsPeriodEarningResponseDto.build({
        ...item,
      }),
    );

    return resource;
  }
}
