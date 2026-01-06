import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { GetRetirementPlanningRgpsPeriodEarningResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-period-earning.response.dto';
import ReasonPendencyEnum from '@module/customer/analysis-tool/enums/reason-pendency.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase {
  protected readonly _type =
    GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway)
    private readonly retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway: RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
  ) {}

  async execute(
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
      retirementPlanningRgpsPeriod?.isPendency &&
      retirementPlanningRgpsPeriod.reasonPendency !==
        ReasonPendencyEnum.INCONSISTENT_COMPETENCE
    ) {
      return [];
    }

    const earnings =
      await this.retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway.findByRetirementPlanningRgpsPeriodId(
        retirementPlanningRgpsPeriodId,
      );

    const resource = earnings.map((item) =>
      GetRetirementPlanningRgpsPeriodEarningResponseDto.build({
        ...item,
        impact:
          'Consta para tempo de contribuição: true , Não consta para carência: false',
      }),
    );

    return resource;
  }
}
