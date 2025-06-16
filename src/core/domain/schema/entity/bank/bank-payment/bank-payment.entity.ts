import { BankPaymentEntityPropsInterface } from "@core/domain/schema/entity/bank/bank-payment/bank-payment.entity.props.interface";
import { PaymentMethodEnum } from "@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum";
import { StatusEnum } from "@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum";
import { BaseEntity } from "@core/domain/schema/entity/base/base.entity";


export class BankPaymentEntity extends BaseEntity {
  public readonly bankExternalId: string;
  public readonly paymentMethod: PaymentMethodEnum;
  public readonly value: string;
  public readonly netValue: string;
  public readonly discountPercentage: number;
  public readonly status: StatusEnum;
  public readonly dueDate: Date;
  public readonly paymentDate: Date;
  public readonly installmentNumber: number | null;
  public readonly costumerConfirmDate: Date | null;
  public readonly pixQrCode: string | null;

  protected readonly _type = BankPaymentEntity.name;

  public constructor(props: BankPaymentEntityPropsInterface) {
    super(props);

    this.bankExternalId = props.bankExternalId;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.discountPercentage = props.discountPercentage;
    this.status = props.status;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate;
    this.installmentNumber = props.installmentNumber;
    this.costumerConfirmDate = props.costumerConfirmDate;
    this.pixQrCode = props.pixQrCode;
  }
}