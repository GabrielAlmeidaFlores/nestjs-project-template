import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearLegalPleadingsCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleadings-count.response.dto';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';

@Injectable()
export class GetCurrentYearLegalPleadingsCountUseCase {
  protected readonly _type = GetCurrentYearLegalPleadingsCountUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearLegalPleadingsCountResponseDto> {
    const year = new Date().getFullYear();

    const totalLegalPleadings =
      await this.legalPleadingQueryRepositoryGateway.countAllLegalPleadingsForYear(
        year,
      );

    return CurrentYearLegalPleadingsCountResponseDto.build({
      totalLegalPleadings,
      year,
    });
  }
}
