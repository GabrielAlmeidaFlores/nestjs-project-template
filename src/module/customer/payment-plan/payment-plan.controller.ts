import { Body, HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { SubscribePaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-payment-plan.request.dto';
import { CancelPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/cancel-payment-plan.response.dto';
import { ListPaymentPlansResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plans.response.dto';
import { SubscribePaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-payment-plan.response.dto';
import { ValidateOrganizationPaymentPlanStatusResponseDto } from '@module/customer/payment-plan/dto/response/validate-organization-payment-plan-status.response.dto';
import { CancelPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/cancel-payment-plan.use-case';
import { GetOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/get-organization-payment-plan-status.use-case';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { SubscribePaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-payment-plan.use-case';
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
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('payment-plan')
export class PaymentPlanController {
  protected readonly _type = PaymentPlanController.name;

  public constructor(
    private readonly subscribePaymentPlanUseCase: SubscribePaymentPlanUseCase,
    private readonly listPaymentPlansUseCase: ListPaymentPlansUseCase,
    private readonly cancelPaymentPlanUseCase: CancelPaymentPlanUseCase,
    private readonly getOrganizationPaymentPlanStatusUseCase: GetOrganizationPaymentPlanStatusUseCase,
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
      description: 'Lista de planos de pagamento.',
      type: ListPaymentPlansResponseDto,
    },
  })
  public async list(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListPaymentPlansResponseDto[]> {
    return this.listPaymentPlansUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Assinar plano de pagamento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'subscribe',
      method: RequestMethod.POST,
      type: SubscribePaymentPlanRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Assinatura criada com sucesso.',
      type: SubscribePaymentPlanResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async subscribe(
    @Body() body: SubscribePaymentPlanRequestDto,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<SubscribePaymentPlanResponseDto> {
    return this.subscribePaymentPlanUseCase.execute(
      organizationSessionData,
      sessionData,
      body,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cancelar assinatura',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cancel',
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
    guard: [AuthGuard, OrganizationSessionGuard, OrganizationOwnerGuard],
  })
  public async getStatus(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<ValidateOrganizationPaymentPlanStatusResponseDto> {
    return this.getOrganizationPaymentPlanStatusUseCase.execute(
      organizationSessionData,
    );
  }
}
