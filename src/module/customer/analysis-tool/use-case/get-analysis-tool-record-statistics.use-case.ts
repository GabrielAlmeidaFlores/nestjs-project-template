import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import {
  GetAnalysisToolRecordStatisticsResponseDto,
  MonthlyStatisticsDto,
} from '@module/customer/analysis-tool/dto/response/get-analysis-tool-record-statistics.response.dto';

import type { AnalysisToolRecordStatisticsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics.query.result';
import type { GetAnalysisToolRecordStatisticsRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-record-statistics.request.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetAnalysisToolRecordStatisticsUseCase {
  protected readonly _type = GetAnalysisToolRecordStatisticsUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: GetAnalysisToolRecordStatisticsRequestDto,
  ): Promise<GetAnalysisToolRecordStatisticsResponseDto> {
    let endDate: Date;
    if (dto.endDate instanceof Date) {
      endDate = new Date(dto.endDate);
    } else {
      endDate = new Date();
    }

    let startDate: Date;
    if (dto.startDate instanceof Date) {
      startDate = new Date(dto.startDate);
    } else {
      const date = new Date(endDate);
      date.setFullYear(date.getFullYear() - 1);
      startDate = date;
    }

    const statistics: AnalysisToolRecordStatisticsQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.getStatisticsByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        startDate,
        endDate,
        dto.type,
      );

    return GetAnalysisToolRecordStatisticsResponseDto.build({
      totalCount: statistics.totalCount,
      monthlyStatistics: statistics.monthlyStatistics.map((stat) =>
        MonthlyStatisticsDto.build({
          year: stat.year,
          month: stat.month,
          count: stat.count,
        }),
      ),
    });
  }
}
