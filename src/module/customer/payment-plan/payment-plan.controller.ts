import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { SubscribePaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-payment-plan.request.dto';
import { ListPaymentPlansResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plans.response.dto';
import { SubscribePaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-payment-plan.response.dto';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { SubscribePaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-payment-plan.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('payment-plan')
export class PaymentPlanController {
  protected readonly _type = PaymentPlanController.name;

  public constructor(
    private readonly subscribePaymentPlanUseCase: SubscribePaymentPlanUseCase,
    private readonly listPaymentPlansUseCase: ListPaymentPlansUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar planos de pagamento disponíveis',
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['payment-plan'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de planos de pagamento.',
      type: ListPaymentPlansResponseDto,
    },
  })
  public async list(): Promise<ListPaymentPlansResponseDto[]> {
    return this.listPaymentPlansUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Assinar plano de pagamento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'subscribe',
      method: RequestMethod.POST,
      type: SubscribePaymentPlanRequestDto,
    },
    tag: ['payment-plan'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Assinatura criada com sucesso.',
      type: SubscribePaymentPlanResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
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
}
