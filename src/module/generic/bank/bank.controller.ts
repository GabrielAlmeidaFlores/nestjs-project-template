import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { AsaasWebhookPaymentEventRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-payment-event.request.dto';
import { AsaasWebhookPaymentEventResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-payment-event.response.dto';
import { ProcessAsaasWebhookPaymentEventUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-payment-event.use-case';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@GenericControllerRoute('bank/webhook')
export class BankController {
  protected readonly _type = BankController.name;

  public constructor(
    private readonly processAsaasWebhookPaymentEventUseCase: ProcessAsaasWebhookPaymentEventUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Processar webhook de evento de pagamento do Asaas',
    http: {
      path: 'asaas/payment',
      method: RequestMethod.POST,
      type: AsaasWebhookPaymentEventRequestDto,
    },
    tag: ['webhook', 'pagamento-bancario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Webhook de pagamento processado com sucesso.',
      type: AsaasWebhookPaymentEventResponseDto,
    },
  })
  public async processAsaasPaymentWebhook(
    @Body() dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<AsaasWebhookPaymentEventResponseDto> {
    return this.processAsaasWebhookPaymentEventUseCase.execute(dto);
  }
}
