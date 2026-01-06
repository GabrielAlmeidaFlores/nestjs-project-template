import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-by-legal-proceeding-number.query.param.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto } from '@module/customer/legal-proceeding/dto/request/get-analysis-tool-client-legal-proceeding.-by-legal-proceeding-number.request.dto';
import { ListLegalProceedingItemActionResponseDto } from '@module/customer/legal-proceeding/dto/response/list-analysis-tool-client-legal-proceeding-client-detail-action.response.dto';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase {
  protected readonly _type =
    GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,

    @Inject(LegalProceedingConsumerGateway)
    private readonly legalProceedingConsumerGateway: LegalProceedingConsumerGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingItemActionResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientLegalProceedingList =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByLegalProceedingNumber(
        organizationSessionData.organizationId,
        new ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway(
          dto,
        ),
      );

    const resource = analysisToolClientLegalProceedingList.resource.flatMap(
      (item) => {
        const latestDetailEntity = item.legalProceedingDetail
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )[0];

        if (!latestDetailEntity) {
          return [];
        }

        const actionItems = this.legalProceedingConsumerGateway.extractActions(
          latestDetailEntity.detail,
        );

        return actionItems;
      },
    );

    return ListLegalProceedingItemActionResponseDto.build({
      ...analysisToolClientLegalProceedingList,
      resource,
    });
  }
}
