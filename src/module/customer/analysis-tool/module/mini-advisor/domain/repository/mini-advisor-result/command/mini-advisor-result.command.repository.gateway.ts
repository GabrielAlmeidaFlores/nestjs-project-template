import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { MiniAdvisorResultEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { MiniAdvisorResultId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';

export abstract class MiniAdvisorResultCommandRepositoryGateway {
  public abstract createMiniAdvisorResult(
    props: MiniAdvisorResultEntity,
  ): TransactionType;

  public abstract deleteMiniAdvisorResult(
    id: MiniAdvisorResultId,
  ): TransactionType;
}
