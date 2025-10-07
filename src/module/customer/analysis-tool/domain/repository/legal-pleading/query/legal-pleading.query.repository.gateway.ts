import type { NotFoundError } from '@core/error/not-found.error';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading/legal-pleading-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: LegalPleadingId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingWithRelationsQueryResult>;
}
