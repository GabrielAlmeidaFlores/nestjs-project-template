import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

export abstract class CidTenCommandRepositoryGateway {
  public abstract createCidTen(props: CidTenEntity): TransactionType;

  public abstract updateCidTen(
    id: CidTenId,
    props: CidTenEntity,
  ): TransactionType;
}
