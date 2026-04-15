import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export abstract class GeneralUrbanRetirementDenialPeriodDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialPeriodDocument(
    props: GeneralUrbanRetirementDenialPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByGeneralUrbanRetirementDenialPeriodId(
    generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType;
}
