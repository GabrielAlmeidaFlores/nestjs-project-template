import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding.query.param.gateway';
import { ListLegalProceedingDetailWithCombinedFiltersRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-proceeding-detail-with-combined-filters.request.dto';
import {
  GetAnalysisToolClientLegalProceedingClientDetailResponseDto,
  GetAnalysisToolClientLegalProceedingResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase {
  protected readonly _type =
    ListAnalysisToolClientLegalProceedingWithCombinedFiltersUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListLegalProceedingDetailWithCombinedFiltersRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    const queryResult =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByOrganizationIdWithCombinedFilters(
        organizationSessionData.organizationId,
        new ListAnalysisToolClientLegalProceedingQueryParamGateway(dto),
      );

    const resource = await Promise.all(
      queryResult.resource.map(async (item) => {
        const analysisToolClientQuery =
          await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
            item.analysisToolClient.id,
            organizationSessionData.organizationId,
            AnalysisToolClientNotFoundError,
          );

        const analysisToolClientResponse =
          GetAnalysisToolClientLegalProceedingClientDetailResponseDto.build({
            ...item.analysisToolClient,
            organizationId: analysisToolClientQuery.createdBy.organizationId,
            createdBy: analysisToolClientQuery.createdBy.id,
            updatedBy: analysisToolClientQuery.updatedBy.id,
          });

        return GetAnalysisToolClientLegalProceedingResponseDto.build({
          legalProceedingNumber: item.legalProceedingNumber,
          status: item.status,
          type: item.type,
          lastUpdated: item.lastUpdated,
          deadline: item.deadline,
          analysisToolClientLegalProceedingId: item.id,
          analysisToolClient: analysisToolClientResponse,
        });
      }),
    );

    return ListAnalysisToolClientLegalProceedingResponseDto.build({
      ...queryResult,
      resource,
    });
  }
}
