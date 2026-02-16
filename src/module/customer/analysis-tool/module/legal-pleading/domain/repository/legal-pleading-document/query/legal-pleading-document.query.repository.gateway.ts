import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import type { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { LegalPleadingDocumentTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/enum/legal-pleading-document-type.enum';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingDocumentQueryRepositoryGateway {
  public abstract findOneByLegalPleadingDocumentIdAndOrganizationIdOrFail(
    id: LegalPleadingDocumentId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentWithRelationsQueryResult>;

  public abstract findByDocumentTypeAndOrganizationIdAndLegalPleadingId(
    legalPleadingId: LegalPleadingId,
    documentType: LegalPleadingDocumentTypeEnum,
    organizationId: OrganizationId,
  ): Promise<GetLegalPleadingDocumentWithRelationsQueryResult[]>;
}
