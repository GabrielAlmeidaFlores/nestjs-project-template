import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingDocumentQueryRepositoryGateway {
  public abstract findOneByLegalPleadingDocumentAndOrganizationIdOrFail(
    id: LegalPleadingDocumentId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentWithRelationsQueryResult>;
}
