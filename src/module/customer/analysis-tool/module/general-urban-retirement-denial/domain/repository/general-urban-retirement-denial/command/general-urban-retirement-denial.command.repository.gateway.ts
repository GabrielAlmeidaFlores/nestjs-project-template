import type { GeneralUrbanRetirementDenialEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/general-urban-retirement-denial.entity';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export abstract class GeneralUrbanRetirementDenialCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenial(
    props: GeneralUrbanRetirementDenialEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementDenial(
    id: GeneralUrbanRetirementDenialId,
    props: GeneralUrbanRetirementDenialEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementDenialResultId(
    id: GeneralUrbanRetirementDenialId,
    resultId: GeneralUrbanRetirementDenialResultId,
  ): TransactionType;
}
