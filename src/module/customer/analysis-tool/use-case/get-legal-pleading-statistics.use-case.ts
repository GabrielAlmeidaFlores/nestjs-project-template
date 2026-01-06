import { Inject, Injectable } from '@nestjs/common';

import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import {
  GetLegalPleadingStatisticsResponseDto,
  LegalPleadingMonthlyStatisticsDto,
} from '@module/customer/analysis-tool/dto/response/get-legal-pleading-statistics.response.dto';

import type { LegalPleadingStatisticsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/legal-pleading-statistics.query.result';
import type { GetLegalPleadingStatisticsRequestDto } from '@module/customer/analysis-tool/dto/request/get-legal-pleading-statistics.request.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetLegalPleadingStatisticsUseCase {
  protected readonly _type = GetLegalPleadingStatisticsUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: GetLegalPleadingStatisticsRequestDto,
  ): Promise<GetLegalPleadingStatisticsResponseDto> {
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

    const statistics: LegalPleadingStatisticsQueryResult =
      await this.legalPleadingQueryRepositoryGateway.getStatisticsByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        startDate,
        endDate,
        dto.petitionType,
      );

    return GetLegalPleadingStatisticsResponseDto.build({
      totalCount: statistics.totalCount,
      monthlyStatistics: statistics.monthlyStatistics.map((stat) =>
        LegalPleadingMonthlyStatisticsDto.build({
          year: stat.year,
          month: stat.month,
          count: stat.count,
        }),
      ),
    });
  }
}
