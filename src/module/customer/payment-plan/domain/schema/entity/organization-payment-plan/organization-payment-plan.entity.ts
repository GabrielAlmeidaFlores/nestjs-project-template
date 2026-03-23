import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { OrganizationPaymentPlanEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity.props.interface';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { InvalidTotalInstallmentsError } from '@module/customer/payment-plan/error/invalid-total-installments.error';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class OrganizationPaymentPlanEntity extends BaseEntity<OrganizationPaymentPlanId> {
  @Description('Nome do plano de pagamento')
  public readonly name: string;

  @Description('Descrição sobre o plano e seus recursos')
  public readonly description: string;

  @Description('Preço do plano de pagamento')
  public readonly price: DecimalValue;

  @Description('Quantidade maxima de membros participantes')
  public readonly maxMemberCount: number;

  @Description('Creditos mensais para organização')
  public readonly monthlyCreditAmount: number;

  @Description('ID externo do pagamento no banco')
  public readonly bankExternalId: string;

  @Description('Tipo de assinatura contratada pelo cliente')
  public readonly cycle: PaymentPlanCycleEnum;

  @Description('Quantidade total de parcelas da assinatura')
  public readonly totalInstallments: number | null;

  @Description('Organização pertencente ao plano de pagamento')
  public readonly organization: OrganizationId;

  @Description('Identificador do plano de pagamento')
  public readonly paymentPlan: PaymentPlanId;

  @Description('Indica se o plano foi cancelado')
  public readonly canceled: boolean;

  @Description('Afiliado que originou esta contratação')
  public readonly affiliateCustomerId: AffiliateCustomerId | null;

  protected readonly _type = OrganizationPaymentPlanEntity.name;

  public constructor(props: OrganizationPaymentPlanEntityPropsInterface) {
    OrganizationPaymentPlanEntity.validateTotalInstallments(
      props.totalInstallments,
    );

    super(OrganizationPaymentPlanId, props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberCount = props.maxMemberCount;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.cycle = props.cycle;
    this.totalInstallments = props.totalInstallments ?? null;
    this.organization = props.organization;
    this.paymentPlan = props.paymentPlan;
    this.bankExternalId = props.bankExternalId;
    this.canceled = props.canceled;
    this.affiliateCustomerId = props.affiliateCustomerId ?? null;
  }

  private static validateTotalInstallments(
    totalInstallments: number | null | undefined,
  ): void {
    const MAX_INSTALLMENTS = 12;

    if (
      totalInstallments !== null &&
      totalInstallments !== undefined &&
      totalInstallments > MAX_INSTALLMENTS
    ) {
      throw new InvalidTotalInstallmentsError({
        maxInstallments: MAX_INSTALLMENTS,
      });
    }
  }
}
