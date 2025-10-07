import type { NotFoundError } from '@core/error/not-found.error';
import type { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import type { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingAddressQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: LegalPleadingAddressId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingAddressQueryResult>;
}
