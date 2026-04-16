import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';
import type { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

export abstract class GeneralUrbanRetirementDenialResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialResult(
    props: GeneralUrbanRetirementDenialResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementDenialResult(
    id: GeneralUrbanRetirementDenialResultId,
    props: GeneralUrbanRetirementDenialResultEntity,
  ): TransactionType;
}
