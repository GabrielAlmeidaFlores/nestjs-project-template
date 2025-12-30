import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import {
  GetAnalysisToolClientLegalProceedingClientDetailResponseDto,
  GetAnalysisToolClientLegalProceedingResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListAnalysisToolClientLegalProceedingUseCase {
  protected readonly _type = ListAnalysisToolClientLegalProceedingUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    const queryResult =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listAnalysisToolClientWithRelations(
        new ListDataInputModel(dto),
      );

    const resource = queryResult.resource.map((item) => {
      const analysisToolClient =
        GetAnalysisToolClientLegalProceedingClientDetailResponseDto.build({
          ...item.analysisToolClient,
          organizationId: item.analysisToolClient.createdBy.organizationId,
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
