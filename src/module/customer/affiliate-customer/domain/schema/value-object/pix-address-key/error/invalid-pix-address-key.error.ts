import { InvalidInputError } from '@core/error/invalid-input.error';

import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';

export class InvalidPixAddressKeyError extends InvalidInputError {
  protected override readonly _type = InvalidPixAddressKeyError.name;

  public constructor(type: PixAddressKeyTypeEnum) {
    super(`A chave Pix informada não é válida para o tipo "${type}"`);
  }
}
