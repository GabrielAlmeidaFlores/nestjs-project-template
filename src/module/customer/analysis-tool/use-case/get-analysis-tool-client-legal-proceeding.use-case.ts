import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding.query.param.gateway';
import { GetAnalysisToolClientLegalProceedingRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding.request.dto';
import { GetAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding-client-detail.response.dto';
import { GetAnalysisToolClientLegalProceedingClientDetailResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';
import { GetLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAnalysisToolClientLegalProceedingUseCase {
  protected readonly _type = GetAnalysisToolClientLegalProceedingUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async getAnalysisToolClientLegalProceedingWithRelations(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GetAnalysisToolClientLegalProceedingRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto> {
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
        new ListAnalysisToolClientLegalProceedingQueryParamGateway(dto),
      );

    const resource: GetAnalysisToolClientLegalProceedingDetailResponseDto[] =
      analysisToolClientLegalProceedingList.resource.map((item) => {
        const analysisToolClient =
          GetAnalysisToolClientLegalProceedingClientDetailResponseDto.build({
            ...item.analysisToolClient,
          });

        const latestDetailEntity = item.legalProceedingDetail
          .slice()
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })[0];

        const legalProceedingDetail: GetLegalProceedingDetailResponseDto[] =
          latestDetailEntity
            ? [
                GetLegalProceedingDetailResponseDto.build({
                  ...latestDetailEntity,
                  id: new LegalProceedingDetailId(
                    latestDetailEntity.id.toString(),
                  ),
                  detail: JSON.parse(latestDetailEntity.detail) as object,
                }),
              ]
            : [];

        return GetAnalysisToolClientLegalProceedingDetailResponseDto.build({
          ...item,
          analysisToolClient,
          legalProceedingDetail,
        });
      });

    return ListAnalysisToolClientLegalProceedingDetailResponseDto.build({
      ...analysisToolClientLegalProceedingList,
      resource,
    });
  }
}
