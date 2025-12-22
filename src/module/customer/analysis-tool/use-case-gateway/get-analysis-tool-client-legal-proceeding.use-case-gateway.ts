import type { GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding-created-range.request.dto';
import type { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export abstract class GetAnalysisToolClientLegalProceedingUseCaseGateway {
  public abstract execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GetAnalysisToolClientLegalProceedingCreatedRangeRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto>;
}
