import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class EnabledPaidResourceItemDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanPaidResourceId)
  public id: PaymentPlanPaidResourceId;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum)
  public resource: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoNumberProperty()
  public creditCost: number;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type = EnabledPaidResourceItemDto.name;
}

@ResponseDto()
export class ValidateOrganizationPaymentPlanStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({
    description:
      'Indica se o plano de pagamento da organização está ativo no momento. O plano é considerado ativo quando há um pagamento válido (RECEIVED ou COMPLETED) realizado nos últimos 30 dias.',
  })
  public isActive: boolean;

  @ResponseDtoStringProperty({
    required: false,
    description:
      'Status do último pagamento realizado pela organização. Valores possíveis: RECEIVED, COMPLETED, PENDING, OVERDUE, REFUNDED. Retorna undefined caso não haja nenhum pagamento registrado.',
  })
  public lastPaymentStatus?: string;

  @ResponseDtoDateProperty({
    required: false,
    description:
      'Data e hora em que o último pagamento foi confirmado/recebido. Retorna undefined caso não haja nenhum pagamento confirmado ainda.',
  })
  public lastPaymentDate?: Date;

  @ResponseDtoDateProperty({
    required: false,
    description:
      'Data de vencimento do próximo pagamento pendente. Útil para informar ao usuário quando será a próxima cobrança. Retorna undefined caso não haja pagamentos pendentes.',
  })
  public nextDueDate?: Date;

  @ResponseDtoDateProperty({
    required: false,
    description:
      'Data de adesão da organização ao plano de pagamento. Retorna undefined caso não haja data de adesão registrada.',
  })
  public accessionDate?: Date;

  @ResponseDtoStringProperty({
    description:
      'Nome do plano de pagamento contratado pela organização (ex: Plano Premium, Plano Básico, etc).',
  })
  public planName: string;

  @ResponseDtoStringProperty({
    description:
      'Descrição detalhada do plano de pagamento, incluindo informações sobre recursos e benefícios disponíveis.',
  })
  public planDescription: string;

  @ResponseDtoValueObjectProperty(DecimalValue, {
    description:
      'Valor mensal do plano de pagamento em reais (R$). Representa o preço que a organização paga mensalmente pela assinatura.',
  })
  public planPrice: DecimalValue;

  @ResponseDtoEnumProperty(PaymentPlanCycleEnum)
  public paymentPlanCycle: PaymentPlanCycleEnum;

  @ResponseDtoNumberProperty({
    description:
      'Quantidade máxima de membros que podem participar da organização conforme o plano contratado. Limite de usuários ativos permitidos.',
  })
  public maxMemberCount: number;

  @ResponseDtoNumberProperty({
    description:
      'Quantidade de créditos mensais disponíveis para a organização conforme o plano. Créditos podem ser usados para funcionalidades específicas da plataforma.',
  })
  public monthlyCreditAmount: number;

  @ResponseDtoBooleanProperty({
    description:
      'Indica se existem pagamentos em atraso (vencidos e não pagos) ou com status de OVERDUE. Importante para alertar sobre pendências financeiras.',
  })
  public hasOverduePayments: boolean;

  @ResponseDtoNumberProperty({
    description:
      'Quantidade total de pagamentos que estão em atraso ou vencidos. Número de faturas pendentes que precisam ser regularizadas.',
  })
  public overduePaymentsCount: number;

  @ResponseDtoObjectProperty(() => EnabledPaidResourceItemDto, {
    isArray: true,
    description:
      'Lista de recursos pagos habilitados no plano de pagamento da organização. Cada recurso possui ID, tipo, custo em créditos e descrição.',
  })
  public enabledPaidResources: EnabledPaidResourceItemDto[];

  @ResponseDtoEnumProperty(PaymentMethodEnum, {
    description: 'Método de pagamento utilizado pela organização.',
    required: false,
  })
  public paymentMethod?: PaymentMethodEnum;

  @ResponseDtoBooleanProperty({
    description:
      'Indica se o plano de pagamento foi cancelado. Quando true, o plano está cancelado e não deve mais cobrar ou prover benefícios.',
  })
  public canceled: boolean;

  protected override readonly _type =
    ValidateOrganizationPaymentPlanStatusResponseDto.name;
}
