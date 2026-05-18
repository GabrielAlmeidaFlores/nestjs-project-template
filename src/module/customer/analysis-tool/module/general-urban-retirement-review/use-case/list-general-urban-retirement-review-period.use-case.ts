import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { ListGeneralUrbanRetirementReviewPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/param/list-general-urban-retirement-review-period.query.param';
import { ListGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/list-general-urban-retirement-review-period.request.dto';
import { GetGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period.response.dto';
import { ListGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/list-general-urban-retirement-review-period.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListGeneralUrbanRetirementReviewPeriodUseCase {
  protected readonly _type = ListGeneralUrbanRetirementReviewPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<ListGeneralUrbanRetirementReviewPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const listParam = new ListGeneralUrbanRetirementReviewPeriodQueryParam({
      ...dto,
      generalUrbanRetirementReview: dto.generalUrbanRetirementReviewId,
    });

    const listQueryResult =
      await this.generalUrbanRetirementReviewPeriodQueryRepositoryGateway.listByGeneralUrbanRetirementReviewId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetGeneralUrbanRetirementReviewPeriodResponseDto.build({
        ...item,
      }),
    );

    return ListGeneralUrbanRetirementReviewPeriodResponseDto.build({
      ...listQueryResult,
      resource,
    });
  }
}
