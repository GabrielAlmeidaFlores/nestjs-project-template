import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationCustomizationEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/organization-customization.entity';
import type { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';

export abstract class OrganizationCustomizationCommandRepositoryGateway {
  public abstract createOrganizationCustomization(
    props: OrganizationCustomizationEntity,
  ): TransactionType;

  public abstract updateOrganizationCustomization(
    id: OrganizationCustomizationId,
    props: OrganizationCustomizationEntity,
  ): TransactionType;
}
