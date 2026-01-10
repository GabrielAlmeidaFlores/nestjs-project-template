import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-created-range.query.param.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ListLegalProceedingDetailByDateRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-date.request.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@Injectable()
export class ListAnalysisToolClientLegalProceedingActionUseCase {
  protected readonly _type =
    ListAnalysisToolClientLegalProceedingActionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: ListLegalProceedingDetailByDateRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientLegalProceedingList =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByOrganizationId(
        organizationSessionData.organizationId,
        new ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway(
          dto,
        ),
      );

    const resource: object[] =
      analysisToolClientLegalProceedingList.resource.flatMap((item) => {
        const latestDetailEntity = item.legalProceedingDetail
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0];

        if (!latestDetailEntity) {
          return [];
        }

        const parsed = JSON.parse(latestDetailEntity.detail) as {
          ok: boolean;
          data: {
            items: PublicPropertyType<object>[];
          };
        };

        return parsed.data.items.map((rawItem) => Object.assign({}, rawItem));
      });

    return ListLegalProceedingDetailResponseDto.build({
      ...analysisToolClientLegalProceedingList,
      resource,
    });
  }
}
