import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import type { RetirementPermanentDisabilityRevisionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity';

export abstract class RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionDocument(
    props: RetirementPermanentDisabilityRevisionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByRetirementPermanentDisabilityRevisionIdAndType(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    type: RetirementPermanentDisabilityRevisionDocumentTypeEnum,
  ): TransactionType;
}
