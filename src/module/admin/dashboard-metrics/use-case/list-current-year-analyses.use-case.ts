import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { AnalysisItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/analysis-item.response.dto';
import { ListCurrentYearAnalysesResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-current-year-analyses.response.dto';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';

@Injectable()
export class ListCurrentYearAnalysesUseCase {
  protected readonly _type = ListCurrentYearAnalysesUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListCurrentYearAnalysesResponseDto> {
    const year = new Date().getFullYear();

    const listParam = new ListAnalysisToolRecordQueryParam({
      page: pagination.page,
      limit: pagination.limit,
    });

    const analysesData =
      await this.analysisToolRecordQueryRepositoryGateway.listAllAnalysesForYearWithFullRelations(
        year,
        listParam,
      );

    const mappedResource = analysesData.resource.map((analysis) => {
      const clientName =
        analysis.analysisToolClient?.name ?? analysis.createdBy.customer.name;
      const organizationName = analysis.createdBy.organization.name;

      return AnalysisItemResponseDto.build({
        analysisToolRecordId: analysis.id,
        analysisToolRecordCode: analysis.code,
        analysisToolRecordType: analysis.type,
        analysisStatus: analysis.status,
        clientName,
        organizationName,
        createdAt: analysis.createdAt,
      });
    });

    return ListCurrentYearAnalysesResponseDto.build({
      page: analysesData.page,
      limit: analysesData.limit,
      totalItems: analysesData.totalItems,
      totalPages: analysesData.totalPages,
      amountItemsCurrentPage: analysesData.amountItemsCurrentPage,
      resource: mappedResource,
    });
  }
}
