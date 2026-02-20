import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { LegalPleadingItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/legal-pleading-item.response.dto';
import { ListCurrentYearLegalPleadingsResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-current-year-legal-pleadings.response.dto';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { ListLegalPleadingQueryParam } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/param/list-legal-pleading.query.param';

@Injectable()
export class ListCurrentYearLegalPleadingsUseCase {
  protected readonly _type = ListCurrentYearLegalPleadingsUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListCurrentYearLegalPleadingsResponseDto> {
    const year = new Date().getFullYear();

    const listParam = new ListLegalPleadingQueryParam({
      page: pagination.page,
      limit: pagination.limit,
      searchBy: null,
      status: null,
    });

    const legalPleadings =
      await this.legalPleadingQueryRepositoryGateway.listAllLegalPleadingsForYear(
        year,
        listParam,
      );

    const items = legalPleadings.resource.map((legalPleading) => {
      return LegalPleadingItemResponseDto.build({
        legalPleadingId: legalPleading.id,
        documentType: legalPleading.petitionType ?? 'N/A',
        clientName:
          legalPleading.analysisToolClient.name ?? 'Cliente não informado',
        organizationName: legalPleading.createdBy.organization.name,
        createdAt: legalPleading.createdAt,
      });
    });

    return ListCurrentYearLegalPleadingsResponseDto.build({
      page: legalPleadings.page,
      limit: legalPleadings.limit,
      totalItems: legalPleadings.totalItems,
      totalPages: legalPleadings.totalPages,
      amountItemsCurrentPage: legalPleadings.amountItemsCurrentPage,
      resource: items,
    });
  }
}
