import { Inject, Injectable } from '@nestjs/common';

import { CurrentYearAnalysesMonthCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-monthly-count-item.response.dto';
import { CurrentYearAnalysesMonthCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-monthly-count.response.dto';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

@Injectable()
export class GetCurrentYearAnalysisMonthlyCountUseCase {
  protected readonly _type = GetCurrentYearAnalysisMonthlyCountUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<CurrentYearAnalysesMonthCountResponseDto> {
    const year = new Date().getFullYear();

    const monthlyAnalyses =
      await this.analysisToolRecordQueryRepositoryGateway.countAllMonthlyAnalysesForYear(
        year,
        type,
      );

    const analysesMonthly = monthlyAnalyses.map((item) =>
      CurrentYearAnalysesMonthCountItemResponseDto.build({
        month: item.month,
        totalAnalyses: item.totalCount,
      }),
    );

    return CurrentYearAnalysesMonthCountResponseDto.build({
      analysesMonthly,
    });
  }
}
