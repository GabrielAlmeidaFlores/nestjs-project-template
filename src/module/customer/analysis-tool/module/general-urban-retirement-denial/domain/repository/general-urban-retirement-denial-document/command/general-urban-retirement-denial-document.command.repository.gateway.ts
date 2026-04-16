import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';

export abstract class GeneralUrbanRetirementDenialDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialDocument(
    props: GeneralUrbanRetirementDenialDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByGeneralUrbanRetirementDenialId(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): TransactionType;
}
