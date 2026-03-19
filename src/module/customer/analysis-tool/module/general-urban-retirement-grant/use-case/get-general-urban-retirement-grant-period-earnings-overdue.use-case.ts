import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/query/general-urban-retirement-grant-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { GetGeneralUrbanRetirementGrantPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period-earning.response.dto';
import { GeneralUrbanRetirementGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway: GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodQueryRepositoryGateway: GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodEarningResponseDto[]> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const period =
      await this.generalUrbanRetirementGrantPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantPeriodIdOrFail(
        generalUrbanRetirementGrantPeriodId,
        GeneralUrbanRetirementGrantPeriodNotFoundError,
      );

    if (
      period.isPendency === true &&
      period.reasonPendency !== ReasonPendencyEnum.INCONSISTENT_COMPETENCE
    ) {
      return [];
    }

    const earnings =
      await this.generalUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway.findByGeneralUrbanRetirementGrantPeriodId(
        generalUrbanRetirementGrantPeriodId,
      );

    return earnings.map((item) =>
      GetGeneralUrbanRetirementGrantPeriodEarningResponseDto.build({
        ...item,
        impact: item.analysis,
      }),
    );
  }
}
