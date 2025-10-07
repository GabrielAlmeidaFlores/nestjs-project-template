import type { NotFoundError } from '@core/error/not-found.error';
import type { GetLegalPleadingDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document.query.result';
import type { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingDocumentQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: LegalPleadingDocumentId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingDocumentQueryResult>;
}
