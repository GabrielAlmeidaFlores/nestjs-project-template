import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client-legal-proceeding.response.dto';
import type { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

export abstract class ListAnalysisToolClientLegalProceedingUseCaseGateway {
  public abstract execute(
    organizationId: OrganizationId,
    dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientLegalProceedingResponseDto>;
}
