import { Injectable } from '@nestjs/common';

import { CurrentYearAnalysesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-count.response.dto';

@Injectable()
export class GetCurrentYearAnalysesCountUseCase {
  protected readonly _type = GetCurrentYearAnalysesCountUseCase.name;

  public execute(): CurrentYearAnalysesCountResponseDto {
    const year = new Date().getFullYear();

    // TODO: Need to query analysis-tool-record table filtered by year
    // For now, return 0
    const totalAnalyses = 0;

    return CurrentYearAnalysesCountResponseDto.build({
      totalAnalyses,
      year,
    });
  }
}
