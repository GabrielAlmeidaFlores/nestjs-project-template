import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearAnalysesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-count.response.dto';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

@Injectable()
export class GetCurrentYearAnalysesCountUseCase {
  protected readonly _type = GetCurrentYearAnalysesCountUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<CurrentYearAnalysesCountResponseDto> {
    const year = new Date().getFullYear();
    const totalAnalyses =
      await this.analysisToolRecordQueryRepositoryGateway.countAllAnalysesForYear(
        year,
        type,
      );

    return CurrentYearAnalysesCountResponseDto.build({
      totalAnalyses,
      year,
    });
  }
}
