import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-earnings-history/query/general-urban-retirement-review-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GetGeneralUrbanRetirementReviewPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period-earning.response.dto';
import { GeneralUrbanRetirementReviewPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase {
  protected readonly _type =
    GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway: GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodEarningResponseDto[]> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const period =
      await this.generalUrbanRetirementReviewPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewPeriodIdOrFail(
        generalUrbanRetirementReviewPeriodId,
        GeneralUrbanRetirementReviewPeriodNotFoundError,
      );

    if (
      period.isPendency === true &&
      period.reasonPendency !== ReasonPendencyEnum.COMPETENCE_BELOW_MINIMUM
    ) {
      return [];
    }

    const earnings =
      await this.generalUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway.findByGeneralUrbanRetirementReviewPeriodId(
        generalUrbanRetirementReviewPeriodId,
      );

    const filtered = earnings.filter(
      (e) => e.competenceBelowTheMinimum === true,
    );

    return filtered.map((item) =>
      GetGeneralUrbanRetirementReviewPeriodEarningResponseDto.build({
        ...item,
      }),
    );
  }
}
