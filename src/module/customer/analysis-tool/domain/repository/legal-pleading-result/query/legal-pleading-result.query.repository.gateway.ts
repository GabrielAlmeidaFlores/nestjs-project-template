import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import type { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingResultQueryRepositoryGateway {
  public abstract findOneByLegalPleadingResultIdAndOrganizationIdOrFail(
    id: LegalPleadingResultId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingResultQueryResult>;
}
