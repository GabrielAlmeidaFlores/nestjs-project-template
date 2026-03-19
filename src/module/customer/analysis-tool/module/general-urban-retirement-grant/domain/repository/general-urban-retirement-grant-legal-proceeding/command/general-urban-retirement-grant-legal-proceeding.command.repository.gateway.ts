import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import type { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';

export abstract class GeneralUrbanRetirementGrantLegalProceedingCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantLegalProceeding(
    props: GeneralUrbanRetirementGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementGrantLegalProceeding(
    id: GeneralUrbanRetirementGrantLegalProceedingId,
  ): TransactionType;
}
