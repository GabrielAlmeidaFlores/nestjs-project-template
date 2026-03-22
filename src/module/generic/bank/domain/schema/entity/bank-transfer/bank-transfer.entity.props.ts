import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import type { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export interface BankTransferEntityPropsInterface extends BaseEntityPropsInterface<BankTransferId> {
  bankExternalId: string | null | undefined;
  amount: DecimalValue;
  status: TransferStatusEnum;
  pixAddressKey: string;
  pixAddressKeyType: PixAddressKeyTypeEnum;
  transferDate?: Date | null;
  description?: string | null;
}
