import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.entity';
import type { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

export abstract class GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantPeriodDocument(
    props: GeneralUrbanRetirementGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantPeriodDocument(
    id: GeneralUrbanRetirementGrantPeriodDocumentId,
    props: GeneralUrbanRetirementGrantPeriodDocumentEntity,
  ): TransactionType;
}
