import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearLegalPleadingMonthCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleading-monthly-count-item.response.dto';
import { CurrentYearLegalPleadingMonthCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleading-monthly-count.response.dto';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';

@Injectable()
export class GetCurrentYearLegalPleadingMonthlyCountUseCase {
  protected readonly _type =
    GetCurrentYearLegalPleadingMonthlyCountUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearLegalPleadingMonthCountResponseDto> {
    const year = new Date().getFullYear();

    const monthlyLegalPleading =
      await this.legalPleadingQueryRepositoryGateway.countAllMonthlyLegalPleadingForYear(
        year,
      );

    const legalPleadingMonthly = monthlyLegalPleading.map((item) =>
      CurrentYearLegalPleadingMonthCountItemResponseDto.build({
        month: item.month,
        totalLegalPleadings: item.totalCount,
      }),
    );

    return CurrentYearLegalPleadingMonthCountResponseDto.build({
      legalPleadingMonthly,
    });
  }
}
