import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidOrganizationNameError } from '@module/customer/account/domain/schema/entity/organization/error/invalid-organization-name.error';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationEntityPropsInterface } from '@module/customer/account/domain/schema/entity/organization/organization.entity.props.interface';

export class OrganizationEntity extends BaseEntity<OrganizationId> {
  @Description('Nome da organização.')
  public readonly name: string;

  @Description('Logo da organização.')
  public readonly organizationLogo: string | null;

  protected readonly _type = OrganizationEntity.name;

  public constructor(props: OrganizationEntityPropsInterface) {
    OrganizationEntity.validateName(props.name);

    super(OrganizationId, props);

    this.name = props.name;
    this.organizationLogo = props.organizationLogo ?? null;
  }

  public static validateName(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidOrganizationNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
