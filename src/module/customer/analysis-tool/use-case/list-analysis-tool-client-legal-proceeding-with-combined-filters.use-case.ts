import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding.query.param.gateway';
import { ListLegalProceedingDetailWithCombinedFiltersRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-proceeding-detail-with-combined-filters.request.dto';
import {
  GetAnalysisToolClientLegalProceedingClientDetailResponseDto,
  GetAnalysisToolClientLegalProceedingResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';

@Injectable()
export class ListAnalysisToolClientLegalProceedingUseCase {
  protected readonly _type = ListAnalysisToolClientLegalProceedingUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    dto: ListLegalProceedingDetailWithCombinedFiltersRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    const queryResult =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByOrganizationIdWithCombinedFilters(
        organizationId,
        new ListAnalysisToolClientLegalProceedingQueryParamGateway(dto),
      );

    const resource = queryResult.resource.map((item) => {
      const analysisToolClient =
        GetAnalysisToolClientLegalProceedingClientDetailResponseDto.build({
          ...item.analysisToolClient,
          organizationId: item.analysisToolClient.createdBy.organizationId,
          createdBy: item.analysisToolClient.createdBy.id,
          updatedBy: item.analysisToolClient.updatedBy.id,
        });

      return GetAnalysisToolClientLegalProceedingResponseDto.build({
        legalProceedingNumber: item.legalProceedingNumber,
        analysisToolClientLegalProceedingId: item.id,
        analysisToolClient,
      });
    });

    return ListAnalysisToolClientLegalProceedingResponseDto.build({
      ...queryResult,
      resource,
    });
  }
}
