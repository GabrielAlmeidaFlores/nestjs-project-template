import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

export abstract class MaternityPayGrantCommandRepositoryGateway {
  public abstract createMaternityPayGrant(
    props: MaternityPayGrantEntity,
  ): TransactionType;

  public abstract updateMaternityPayGrant(
    id: MaternityPayGrantId,
    props: MaternityPayGrantEntity,
  ): TransactionType;

  public abstract updateMaternityPayGrantResultId(
    id: MaternityPayGrantId,
    resultId: MaternityPayGrantResultId,
  ): TransactionType;
}
