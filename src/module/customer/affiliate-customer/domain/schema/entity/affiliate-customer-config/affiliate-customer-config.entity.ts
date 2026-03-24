import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';
import { InvalidAffiliateCustomerConfigValueError } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/error/invalid-affiliate-customer-config-value.error';
import { AffiliateCustomerConfigId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/value-object/affiliate-customer-config-id/affiliate-customer-config-id.value-object';

import type { AffiliateCustomerConfigEntityPropsInterface } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity.props.interface';

const TRANSFER_DAY_MIN = 1;
const TRANSFER_DAY_MAX = 31;

const CONFIG_VALUE_VALIDATORS: Record<
  AffiliateCustomerConfigConfigEnum,
  (value: string) => boolean
> = {
  [AffiliateCustomerConfigConfigEnum.TRANSFER_DAY_OF_MONTH]: (value) => {
    const day = Number(value);
    return (
      /^\d+$/u.test(value) && day >= TRANSFER_DAY_MIN && day <= TRANSFER_DAY_MAX
    );
  },
};

export class AffiliateCustomerConfigEntity extends BaseEntity<AffiliateCustomerConfigId> {
  public readonly config: AffiliateCustomerConfigConfigEnum;
  public readonly value: string;

  protected readonly _type = AffiliateCustomerConfigEntity.name;

  public constructor(props: AffiliateCustomerConfigEntityPropsInterface) {
    super(AffiliateCustomerConfigId, props);
    this.config = props.config;
    this.value = props.value;
    this.validateValue();
  }

  private validateValue(): void {
    const validator = CONFIG_VALUE_VALIDATORS[this.config];
    AffiliateCustomerConfigEntity.validateAllOrThrow(
      [validator(this.value)],
      () =>
        new InvalidAffiliateCustomerConfigValueError({
          message: `Valor inválido para a configuração ${this.config}. O valor para TRANSFER_DAY_OF_MONTH deve ser um número entre ${String(TRANSFER_DAY_MIN)} e ${String(TRANSFER_DAY_MAX)}.`,
        }),
    );
  }
}
