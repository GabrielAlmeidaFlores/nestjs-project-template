import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import type { BankTransferEntityPropsInterface } from '@module/generic/bank/domain/schema/entity/bank-transfer/bank-transfer.entity.props';
import type { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';

export class BankTransferEntity extends BaseEntity<BankTransferId> {
  @Description('ID externo da transferência no banco')
  public readonly bankExternalId: string | null;

  @Description('Valor da transferência')
  public readonly amount: DecimalValue;

  @Description('Status atual da transferência')
  public readonly status: TransferStatusEnum;

  @Description('Chave Pix de destino')
  public readonly pixAddressKey: string;

  @Description('Tipo da chave Pix de destino')
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum;

  @Description('Data em que a transferência foi realizada')
  public readonly transferDate: Date | null;

  @Description('Descrição da transferência')
  public readonly description: string | null;

  protected readonly _type = BankTransferEntity.name;

  public constructor(props: BankTransferEntityPropsInterface) {
    super(BankTransferId, props);
    this.bankExternalId = props.bankExternalId ?? null;
    this.amount = props.amount;
    this.status = props.status;
    this.pixAddressKey = props.pixAddressKey;
    this.pixAddressKeyType = props.pixAddressKeyType;
    this.transferDate = props.transferDate ?? null;
    this.description = props.description ?? null;
  }
}
