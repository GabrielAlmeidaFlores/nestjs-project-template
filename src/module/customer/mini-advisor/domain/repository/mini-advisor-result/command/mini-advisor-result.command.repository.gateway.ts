import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import type { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

export abstract class MiniAdvisorResultCommandRepositoryGateway {
  public abstract createMiniAdvisorResult(
    props: MiniAdvisorResultEntity,
  ): TransactionType;

  public abstract deleteMiniAdvisorResult(
    id: MiniAdvisorResultId,
  ): TransactionType;
}
