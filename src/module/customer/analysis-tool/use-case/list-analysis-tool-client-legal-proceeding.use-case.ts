import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { GetAnalysisToolClientLegalProceedingWithRelationsResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding-with-relations.response.dto';
import { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListAnalysisToolClientLegalProceedingUseCase {
  protected readonly _type = ListAnalysisToolClientLegalProceedingUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async findAnalysisToolClientLegalProceedingWithRelations(
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto> {
    const queryResult =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listAnalysisToolClientWithRelations(
        new ListDataInputModel(dto),
      );

    const resource = queryResult.resource.map((item) => {
      const analysisToolClient = new AnalysisToolClientEntity({
        ...item.analysisToolClient,
        createdBy: new OrganizationMemberId(
          item.analysisToolClient.createdBy.id.toString(),
        ),
        updatedBy: new OrganizationMemberId(
          item.analysisToolClient.updatedBy.id.toString(),
        ),
      });

      return GetAnalysisToolClientLegalProceedingWithRelationsResponseDto.build(
        {
          legalProceedingNumber: item.legalProceedingNumber,
          analysisToolClientLegalProceedingId: item.id,
          analysisToolClient,
        },
      );
    });

    return ListAnalysisToolClientLegalProceedingResponseDto.build({
      ...queryResult,
      resource,
    });
  }
}
