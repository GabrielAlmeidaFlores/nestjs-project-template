import type { ListAnalysisToolClientLegalProceedingDetailResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding-detail.response.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import type { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

export abstract class GetAnalysisToolClientLegalProceedingUseCaseGateway {
  public abstract getAnalysisToolClientLegalProceedingWithRelations(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingDetailResponseDto>;
}
