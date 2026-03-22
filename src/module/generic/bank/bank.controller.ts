import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { AsaasWebhookPaymentEventRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-payment-event.request.dto';
import { AsaasWebhookTransferAuthorizationRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-transfer-authorization.request.dto';
import { AsaasWebhookPaymentEventResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-payment-event.response.dto';
import { AsaasWebhookTransferAuthorizationResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-transfer-authorization.response.dto';
import { ProcessAsaasWebhookPaymentEventUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-payment-event.use-case';
import { ProcessAsaasWebhookTransferAuthorizationUseCase } from '@module/generic/bank/use-case/process-asaas-webhook-transfer-authorization.use-case';
import { AsaasWebhookGuard } from '@shared/api/gateway/guard/asaas-webhook/asaas-webhook.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@GenericControllerRoute('bank/webhook')
export class BankController {
  protected readonly _type = BankController.name;

  public constructor(
    private readonly processAsaasWebhookPaymentEventUseCase: ProcessAsaasWebhookPaymentEventUseCase,
    private readonly processAsaasWebhookTransferAuthorizationUseCase: ProcessAsaasWebhookTransferAuthorizationUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Processar webhook de evento de pagamento do Asaas',
    http: {
      path: 'asaas/payment',
      method: RequestMethod.POST,
      type: AsaasWebhookPaymentEventRequestDto,
    },
    tag: ['webhook', 'pagamento-bancario'],
    guard: [AsaasWebhookGuard],
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

  @BuildEndpointSpecification({
    summary: 'Autorizar transferência bancária pelo Asaas',
    http: {
      path: 'asaas/transfer/authorization',
      method: RequestMethod.POST,
      type: AsaasWebhookTransferAuthorizationRequestDto,
    },
    tag: ['webhook', 'transferencia-bancaria'],
    guard: [AsaasWebhookGuard],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resposta de autorização de transferência enviada.',
      type: AsaasWebhookTransferAuthorizationResponseDto,
    },
  })
  public async processAsaasTransferAuthorization(
    @Body() dto: AsaasWebhookTransferAuthorizationRequestDto,
  ): Promise<AsaasWebhookTransferAuthorizationResponseDto> {
    return this.processAsaasWebhookTransferAuthorizationUseCase.execute(dto);
  }
}
