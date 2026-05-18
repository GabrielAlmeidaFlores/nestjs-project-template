import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import type { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';

export abstract class SpecialRetirementGrantDocumentCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantDocument(
    props: SpecialRetirementGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantDocument(
    id: SpecialRetirementGrantDocumentId,
  ): TransactionType;
}
