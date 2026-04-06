import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MiniAdvisorEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import type { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

export abstract class MiniAdvisorCommandRepositoryGateway {
  public abstract createMiniAdvisor(props: MiniAdvisorEntity): TransactionType;

  public abstract updateMiniAdvisor(
    id: MiniAdvisorId,
    props: MiniAdvisorEntity,
  ): TransactionType;

  public abstract deleteMiniAdvisor(id: MiniAdvisorId): TransactionType;
}
