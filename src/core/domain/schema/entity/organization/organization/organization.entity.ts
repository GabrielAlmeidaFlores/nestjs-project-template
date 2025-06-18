import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { OrganizationEntityPropsInterface } from '@core/domain/schema/entity/organization/organization/organization.entity.props.interface';

export class OrganizationEntity extends BaseEntity {
  public readonly name: string;
  public readonly organizationLogo: string | null;

  protected readonly _type = OrganizationEntity.name;

  public constructor(props: OrganizationEntityPropsInterface) {
    OrganizationEntity.validateName(props.name);

    super(props);

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
