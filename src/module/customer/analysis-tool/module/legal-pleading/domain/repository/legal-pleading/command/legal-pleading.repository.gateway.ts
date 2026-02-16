import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { LegalPleadingEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/legal-pleading.entity';
import type { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';

export abstract class LegalPleadingCommandRepositoryGateway {
  public abstract createLegalPleading(
    props: LegalPleadingEntity,
  ): TransactionType;

  public abstract updateLegalPleading(
    id: LegalPleadingId,
    props: LegalPleadingEntity,
  ): TransactionType;

  public abstract deleteLegalPleading(
    id: LegalPleadingId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
