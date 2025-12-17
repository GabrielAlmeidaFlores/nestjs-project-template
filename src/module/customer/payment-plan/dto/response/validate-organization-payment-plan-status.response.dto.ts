import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

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

  protected override readonly _type =
    ValidateOrganizationPaymentPlanStatusResponseDto.name;
}
