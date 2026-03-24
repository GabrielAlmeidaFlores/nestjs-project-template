import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import type { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

export abstract class CreditPackCommandRepositoryGateway {
  public abstract createCreditPack(entity: CreditPackEntity): TransactionType;
  public abstract updateCreditPack(
    id: CreditPackId,
    entity: CreditPackEntity,
  ): TransactionType;
  public abstract deleteCreditPack(id: CreditPackId): TransactionType;
}
