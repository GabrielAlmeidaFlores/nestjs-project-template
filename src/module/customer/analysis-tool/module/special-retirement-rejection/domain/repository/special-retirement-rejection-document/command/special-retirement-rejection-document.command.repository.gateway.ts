import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';

export abstract class SpecialRetirementRejectionDocumentCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionDocument(
    props: SpecialRetirementRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionDocumentBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
