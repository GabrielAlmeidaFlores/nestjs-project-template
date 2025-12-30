import type { GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-client-legal-proceeding.-by-legal-proceeding-number.request.dto';
import type { ListLegalProceedingItemActionResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-client-detail-action.response.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

export abstract class GetAnalysisToolClientLegalProceedingActionByLegalProceedingNumberUseCaseGateway {
  public abstract execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GetAnalysisToolClientLegalProceedingByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingItemActionResponseDto>;
}
