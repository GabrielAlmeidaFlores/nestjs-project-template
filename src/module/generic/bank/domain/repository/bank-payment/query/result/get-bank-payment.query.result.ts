import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export class GetBankPaymentQueryResult extends BaseBuildableObject {
  public readonly id: BankPaymentId;
  public readonly bankExternalId: string;
  public readonly paymentMethod: PaymentMethodEnum;
  public readonly amount: DecimalValue;
  public readonly status: PaymentStatusEnum;
  public readonly dueDate: Date;
  public readonly paymentDate: Date | null;
  public readonly installmentNumber: number | null;
  public readonly pixQrCode: Base64 | null;
  public readonly pixCopyPaste: string | null;
  public readonly bankSlipUrl: string | null;
  public readonly description: string | null;
  public readonly paymentReceipt: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetBankPaymentQueryResult.name;
}
