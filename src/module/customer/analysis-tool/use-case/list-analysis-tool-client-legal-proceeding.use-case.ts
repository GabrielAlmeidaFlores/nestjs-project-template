import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import {
  GetAnalysisToolClientLegalProceedingClientDetailResponseDto,
  GetAnalysisToolClientLegalProceedingResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListAnalysisToolClientLegalProceedingUseCase implements ListAnalysisToolClientLegalProceedingUseCaseGateway {
  protected readonly _type = ListAnalysisToolClientLegalProceedingUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    const queryResult =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listAnalysisToolClientWithRelations(
        new ListDataInputModel(dto),
      );

    const resource = await Promise.all(
      queryResult.resource.map(async (item) => {
        const analysisToolClientQuery =
          await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
            item.analysisToolClient.id,
            organizationId,
            AnalysisToolClientNotFoundError,
          );

        const analysisToolClient =
          GetAnalysisToolClientLegalProceedingClientDetailResponseDto.build({
            ...item.analysisToolClient,
            organizationId: analysisToolClientQuery.createdBy.organizationId,
            createdBy: analysisToolClientQuery.createdBy.id,
            updatedBy: analysisToolClientQuery.updatedBy.id,
          });

        return GetAnalysisToolClientLegalProceedingResponseDto.build({
          legalProceedingNumber: item.legalProceedingNumber,
          analysisToolClientLegalProceedingId: item.id,
          analysisToolClient,
        });
      }),
    );

    return ListAnalysisToolClientLegalProceedingResponseDto.build({
      ...queryResult,
      resource,
    });
  }
}
