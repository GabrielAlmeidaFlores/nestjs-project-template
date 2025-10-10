import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetLegalPleadingDocumentAnalysisQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document-analysis/query/result/get-legal-pleading-document-analysis.query.result';
import type { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingDocumentAnalysisQueryRepositoryGateway {
  public abstract findOneByLegalPleadingDocumentAnalysisAndOrganizationIdOrFail(
    id: LegalPleadingDocumentAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentAnalysisQueryResult>;
}
