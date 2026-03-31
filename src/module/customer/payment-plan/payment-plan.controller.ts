import {
  Body,
  HttpStatus,
  Param,
  Query,
  Res,
  RequestMethod,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { GenerateMonthlyPaymentBillingRequestDto } from '@module/customer/payment-plan/dto/request/generate-monthly-payment-billing.request.dto';
import { GenerateYearlyPaymentBillingRequestDto } from '@module/customer/payment-plan/dto/request/generate-yearly-payment-billing.request.dto';
import { ListPaymentPlansRequestDto } from '@module/customer/payment-plan/dto/request/list-payment-plans.request.dto';
import { PayBillingRequestDto } from '@module/customer/payment-plan/dto/request/pay-billing.request.dto';
import { SubscribeToMonthlyRecurringPaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-to-monthly-recurring-payment-plan.request.dto';
import { CancelPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/cancel-payment-plan.response.dto';
import { GenerateMonthlyPaymentBillingResponseDto } from '@module/customer/payment-plan/dto/response/generate-monthly-payment-billing.response.dto';
import { GenerateYearlyPaymentBillingResponseDto } from '@module/customer/payment-plan/dto/response/generate-yearly-payment-billing.response.dto';
import { GetBankPaymentResponseDto } from '@module/customer/payment-plan/dto/response/get-bank-payment.response.dto';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { ListPaymentPlansResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plans.response.dto';
import { PaginatedBankPaymentsResponseDto } from '@module/customer/payment-plan/dto/response/paginated-bank-payments.response.dto';
import { PayBillingResponseDto } from '@module/customer/payment-plan/dto/response/pay-billing.response.dto';
import { SubscribeToMonthlyRecurringPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-to-monthly-recurring-payment-plan.response.dto';
import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { CancelPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/cancel-payment-plan.use-case';
import { GenerateMonthlyPaymentBillingUseCase } from '@module/customer/payment-plan/use-case/generate-monthly-payment-billing.use-case';
import { GenerateYearlyPaymentBillingUseCase } from '@module/customer/payment-plan/use-case/generate-yearly-payment-billing.use-case';
import { GetBankPaymentDetailsUseCase } from '@module/customer/payment-plan/use-case/get-bank-payment-details.use-case';
import { GetOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/get-organization-payment-plan-status.use-case';
import { ListBankPaymentsByOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/list-bank-payments-by-organization-payment-plan.use-case';
import { ListPaymentPlanPaidResourcesUseCase } from '@module/customer/payment-plan/use-case/list-payment-plan-paid-resources.use-case';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { PayBillingUseCase } from '@module/customer/payment-plan/use-case/pay-billing.use-case';
import { SubscribeToMonthlyRecurringPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-to-monthly-recurring-payment-plan.use-case';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationOwnerGuard } from '@shared/api/gateway/guard/organization-owner/organization-owner.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('payment-plan')
export class PaymentPlanController {
  protected readonly _type = PaymentPlanController.name;

  public constructor(
    private readonly subscribePaymentPlanUseCase: SubscribeToMonthlyRecurringPaymentPlanUseCase,
    private readonly listPaymentPlansUseCase: ListPaymentPlansUseCase,
    private readonly listPaymentPlanPaidResourcesUseCase: ListPaymentPlanPaidResourcesUseCase,
    private readonly cancelPaymentPlanUseCase: CancelPaymentPlanUseCase,
    private readonly getOrganizationPaymentPlanStatusUseCase: GetOrganizationPaymentPlanStatusUseCase,
    private readonly generateMonthlyPaymentBillingUseCase: GenerateMonthlyPaymentBillingUseCase,
    private readonly generateYearlyPaymentBillingUseCase: GenerateYearlyPaymentBillingUseCase,
    private readonly payMonthlyPaymentBillingUseCase: PayBillingUseCase,
    private readonly listBankPaymentsByOrganizationPaymentPlanUseCase: ListBankPaymentsByOrganizationPaymentPlanUseCase,
    private readonly getBankPaymentDetailsUseCase: GetBankPaymentDetailsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar planos de pagamento disponíveis',
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de planos de pagamento disponíveis.',
      type: ListPaymentPlansResponseDto,
    },
  })
  public async list(
    @Query() dto: ListPaymentPlansRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<ListPaymentPlansResponseDto> {
    return this.listPaymentPlansUseCase.execute(
      dto,
      reply.request.cookies[ApiCookieEnum.AFFILIATE],
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar recursos pagos disponíveis',
    http: {
      path: 'paid-resources',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de recursos pagos disponíveis.',
      type: ListPaymentPlanPaidResourcesResponseDto,
    },
  })
  public async listPaidResources(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    return this.listPaymentPlanPaidResourcesUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Assinar plano de pagamento mensal recorrente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'monthly-recurring/subscribe',
      method: RequestMethod.POST,
      type: SubscribeToMonthlyRecurringPaymentPlanRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Assinatura criada com sucesso.',
      type: SubscribeToMonthlyRecurringPaymentPlanResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async subscribe(
    @Body() body: SubscribeToMonthlyRecurringPaymentPlanRequestDto,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<SubscribeToMonthlyRecurringPaymentPlanResponseDto> {
    return this.subscribePaymentPlanUseCase.execute(
      organizationSessionData,
      sessionData,
      body,
      reply,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cancelar assinatura do plano de pagamento mensal recorrente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'monthly-recurring/cancel',
      method: RequestMethod.DELETE,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Assinatura(s) cancelada(s) com sucesso.',
      type: CancelPaymentPlanResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async cancel(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CancelPaymentPlanResponseDto> {
    return this.cancelPaymentPlanUseCase.execute(organizationSessionData);
  }

  @BuildEndpointSpecification({
    summary: 'Verificar status do plano de pagamento da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'status',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Status do plano de pagamento da organização retornado com sucesso.',
      type: ValidateOrganizationPaymentPlanStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getStatus(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto> {
    return this.getOrganizationPaymentPlanStatusUseCase.execute(
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar cobrança para pagamento mensal (não recorrente)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'monthly/generate-billing',
      method: RequestMethod.POST,
      type: GenerateMonthlyPaymentBillingRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Billing gerado com sucesso. Retorna ID do pagamento bancário e informações do PIX.',
      type: GenerateMonthlyPaymentBillingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async generateMonthlyBilling(
    @Body() body: GenerateMonthlyPaymentBillingRequestDto,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<GenerateMonthlyPaymentBillingResponseDto> {
    return this.generateMonthlyPaymentBillingUseCase.execute(
      organizationSessionData,
      sessionData,
      body,
      reply,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Pagar cobrança com cartão de crédito',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'pay/billing/:bankPaymentId',
      method: RequestMethod.POST,
      type: PayBillingRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pagamento realizado com sucesso.',
      type: PayBillingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async payMonthlyBilling(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('bankPaymentId', new ParseValueObjectPipe(BankPaymentId))
    bankPaymentId: BankPaymentId,
    @Body() body: PayBillingRequestDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<PayBillingResponseDto> {
    return this.payMonthlyPaymentBillingUseCase.execute(
      organizationSessionData,
      bankPaymentId,
      body,
      reply,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar cobrança para pagamento anual com parcelas',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'yearly/generate-billing',
      method: RequestMethod.POST,
      type: GenerateYearlyPaymentBillingRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Billing anual gerado com sucesso. Retorna ID do pagamento bancário e informações do PIX.',
      type: GenerateYearlyPaymentBillingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async generateYearlyBilling(
    @Body() body: GenerateYearlyPaymentBillingRequestDto,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<GenerateYearlyPaymentBillingResponseDto> {
    return this.generateYearlyPaymentBillingUseCase.execute(
      organizationSessionData,
      sessionData,
      body,
      reply,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar pagamentos do plano de pagamento da organização',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'bank-payment',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de pagamentos do plano de pagamento.',
      type: PaginatedBankPaymentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async listBankPayments(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<PaginatedBankPaymentsResponseDto> {
    return this.listBankPaymentsByOrganizationPaymentPlanUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Buscar detalhes de um pagamento bancário por id',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'bank-payment/:bankPaymentId',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do pagamento bancário.',
      type: GetBankPaymentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async getBankPaymentDetails(
    @Param('bankPaymentId', new ParseValueObjectPipe(BankPaymentId))
    bankPaymentId: BankPaymentId,
  ): Promise<GetBankPaymentResponseDto> {
    return this.getBankPaymentDetailsUseCase.execute(bankPaymentId);
  }
}
