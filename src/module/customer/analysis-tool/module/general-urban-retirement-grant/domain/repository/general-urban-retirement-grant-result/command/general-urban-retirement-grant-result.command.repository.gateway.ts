import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import type { GeneralUrbanRetirementGrantResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/value-object/general-urban-retirement-grant-result-id.value-object';

export abstract class GeneralUrbanRetirementGrantResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantResult(
    props: GeneralUrbanRetirementGrantResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantResult(
    id: GeneralUrbanRetirementGrantResultId,
    props: GeneralUrbanRetirementGrantResultEntity,
  ): TransactionType;
}
