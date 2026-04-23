import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity';
import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';

export abstract class RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionPeriodMemberDocument(
    props: RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionPeriodMemberDocument(
    id: RuralOrHybridRetirementRejectionPeriodMemberDocumentId,
  ): TransactionType;
}
