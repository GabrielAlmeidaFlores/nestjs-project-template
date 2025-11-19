import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdminEntityPropsInterface } from '@module/admin/account/domain/schema/entity/admin/admin.entity.props.interface';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { InvalidCustomerNameError } from '@module/customer/account/domain/schema/entity/customer/error/invalid-customer-name.error';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class AdminEntity extends BaseEntity<AdminId> {
  @Description('Nome do administrador.')
  public readonly name: string;

  protected readonly _type = AdminEntity.name;

  public constructor(props: AdminEntityPropsInterface) {
    AdminEntity.validateName(props.name);

    super(AdminId, props);

    this.name = props.name;
  }

  public static validateName(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 50;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = name.length >= minNameLength;
    const hasMaximumLength = name.length <= maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidCustomerNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
