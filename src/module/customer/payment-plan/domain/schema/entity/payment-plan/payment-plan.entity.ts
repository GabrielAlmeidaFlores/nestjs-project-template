import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan-entity.props.interface';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PaymentPlanEntity extends BaseEntity<PaymentPlanId> {
  @Description('Nome do plano de pagamento')
  public readonly name: string;

  @Description('Descrição sobre o plano e seus recursos')
  public readonly description: string;

  @Description('Valor do plano de pagamento')
  public readonly price: DecimalValue;

  @Description('Quantidade maxima de membros participantes')
  public readonly maxMemberCount: number;

  @Description('Creditos mensais para organização')
  public readonly monthlyCreditAmount: number;

  @Description('Status do plano na plataforma')
  public readonly active: boolean;

  @Description('Tipo de assinatura contratada pelo cliente')
  public readonly cycle: PaymentPlanCycleEnum;

  protected readonly _type = PaymentPlanEntity.name;

  public constructor(props: PaymentPlanEntityPropsInterface) {
    super(PaymentPlanId, props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberCount = props.maxMemberCount;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.active = props.active;
    this.cycle = props.cycle as PaymentPlanCycleEnum;
  }
}
