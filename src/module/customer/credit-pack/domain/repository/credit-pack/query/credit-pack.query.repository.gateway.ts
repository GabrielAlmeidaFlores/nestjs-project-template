import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import type { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

export abstract class CreditPackQueryRepositoryGateway {
  public abstract findOneCreditPackById(
    id: CreditPackId,
  ): Promise<CreditPackEntity | null>;
  public abstract listCreditPacks(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<CreditPackEntity>>;
  public abstract listActiveCreditPacks(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<CreditPackEntity>>;
}
