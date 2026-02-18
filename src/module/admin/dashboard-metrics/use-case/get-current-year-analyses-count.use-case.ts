import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { CurrentYearAnalysesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-count.response.dto';

@Injectable()
export class GetCurrentYearAnalysesCountUseCase {
  protected readonly _type = GetCurrentYearAnalysesCountUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<CurrentYearAnalysesCountResponseDto> {
    const year = new Date().getFullYear();
    const totalAnalyses =
      await this.analysisToolRecordQueryRepositoryGateway.countAllAnalysesForYear(
        year,
      );

    return CurrentYearAnalysesCountResponseDto.build({
      totalAnalyses,
      year,
    });
  }
}
