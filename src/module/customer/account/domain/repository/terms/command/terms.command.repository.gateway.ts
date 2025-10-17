import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';

export abstract class TermsCommandRepositoryGateway {
  public abstract createTermsAndConditions(props: TermsEntity): TransactionType;
}
