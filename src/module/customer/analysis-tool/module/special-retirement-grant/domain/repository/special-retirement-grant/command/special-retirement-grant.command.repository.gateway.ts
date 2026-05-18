import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

export abstract class SpecialRetirementGrantCommandRepositoryGateway {
  public abstract createSpecialRetirementGrant(
    props: SpecialRetirementGrantEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementGrant(
    id: SpecialRetirementGrantId,
    props: SpecialRetirementGrantEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrant(
    id: SpecialRetirementGrantId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
