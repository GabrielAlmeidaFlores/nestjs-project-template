import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { CountLegalProceedingDetailStatusResponseDto } from '@module/customer/legal-proceeding/dto/response/count-legal-proceeding-detail-status.reponse.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CountLegalProceedingDetailUseCase {
  protected readonly _type = CountLegalProceedingDetailUseCase.name;

  public constructor(
    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CountLegalProceedingDetailStatusResponseDto> {
    const statistics =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.countByOrganizationId(
        organizationSessionData.organizationId,
      );

    return CountLegalProceedingDetailStatusResponseDto.build({
      completed: statistics.completedLegalProceedings,
      inProgress: statistics.pendingLegalProceedings,
      total: statistics.totalLegalProceedings,
    });
  }
}
