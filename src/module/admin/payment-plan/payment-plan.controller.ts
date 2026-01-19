import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CreatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/create-payment-plan.request.dto';
import { ListPaymentPlanPaidResourcesRequestDto } from '@module/admin/payment-plan/dto/request/list-payment-plan-paid-resources.request.dto';
import { UpdatePaymentPlanPaidResourceRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan-paid-resource.request.dto';
import { UpdatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan.request.dto';
import { GetPaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan-paid-resource.response.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { ListPaymentPlansResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plans.response.dto';
import { CreatePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/create-payment-plan.use-case';
import { DeletePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/delete-payment-plan.use-case';
import { GetPaymentPlanPaidResourceUseCase } from '@module/admin/payment-plan/use-case/get-payment-plan-paid-resource.use-case';
import { GetPaymentPlanUseCase } from '@module/admin/payment-plan/use-case/get-payment-plan.use-case';
import { ListPaymentPlanPaidResourcesUseCase } from '@module/admin/payment-plan/use-case/list-payment-plan-paid-resources.use-case';
import { ListPaymentPlansUseCase } from '@module/admin/payment-plan/use-case/list-payment-plans.use-case';
import { UpdatePaymentPlanPaidResourceUseCase } from '@module/admin/payment-plan/use-case/update-payment-plan-paid-resource.use-case';
import { UpdatePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/update-payment-plan.use-case';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('payment-plan')
export class PaymentPlanController {
  protected readonly _type = PaymentPlanController.name;

  public constructor(
    private readonly createPaymentPlanUseCase: CreatePaymentPlanUseCase,
    private readonly updatePaymentPlanUseCase: UpdatePaymentPlanUseCase,
    private readonly deletePaymentPlanUseCase: DeletePaymentPlanUseCase,
    private readonly getPaymentPlanUseCase: GetPaymentPlanUseCase,
    private readonly listPaymentPlansUseCase: ListPaymentPlansUseCase,
    private readonly listPaymentPlanPaidResourcesUseCase: ListPaymentPlanPaidResourcesUseCase,
    private readonly getPaymentPlanPaidResourceUseCase: GetPaymentPlanPaidResourceUseCase,
    private readonly updatePaymentPlanPaidResourceUseCase: UpdatePaymentPlanPaidResourceUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar plano de pagamento',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreatePaymentPlanRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Plano de pagamento criado com sucesso.',
      type: GetPaymentPlanResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createPaymentPlan(
    @Body() dto: CreatePaymentPlanRequestDto,
  ): Promise<GetPaymentPlanResponseDto> {
    return await this.createPaymentPlanUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar plano de pagamento',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':paymentPlanId',
      method: RequestMethod.PATCH,
      type: UpdatePaymentPlanRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Plano de pagamento atualizado com sucesso.',
      type: GetPaymentPlanResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updatePaymentPlan(
    @Param('paymentPlanId', new ParseValueObjectPipe(PaymentPlanId))
    paymentPlanId: PaymentPlanId,
    @Body() dto: UpdatePaymentPlanRequestDto,
  ): Promise<GetPaymentPlanResponseDto> {
    return await this.updatePaymentPlanUseCase.execute(paymentPlanId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Deletar plano de pagamento',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':paymentPlanId',
      method: RequestMethod.DELETE,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Plano de pagamento deletado com sucesso.',
    },
    guard: [AuthGuard],
  })
  public async deletePaymentPlan(
    @Param('paymentPlanId', new ParseValueObjectPipe(PaymentPlanId))
    paymentPlanId: PaymentPlanId,
  ): Promise<void> {
    await this.deletePaymentPlanUseCase.execute(paymentPlanId);
  }

  @BuildEndpointSpecification({
    summary: 'Buscar plano de pagamento por ID',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':paymentPlanId',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Plano de pagamento encontrado com sucesso.',
      type: GetPaymentPlanResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getPaymentPlan(
    @Param('paymentPlanId', new ParseValueObjectPipe(PaymentPlanId))
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanResponseDto> {
    return await this.getPaymentPlanUseCase.execute(paymentPlanId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar planos de pagamento',
    userLevel: [UserLevelEnum.ADMIN],
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
    guard: [AuthGuard],
  })
  public async listPaymentPlans(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListPaymentPlansResponseDto> {
    return await this.listPaymentPlansUseCase.execute(
      new ListDataInputModel(dto),
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar recursos pagos disponíveis',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'paid-resources',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de recursos pagos disponíveis.',
      type: ListPaymentPlanPaidResourcesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listPaymentPlanPaidResources(
    @Query() dto: ListPaymentPlanPaidResourcesRequestDto,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    return await this.listPaymentPlanPaidResourcesUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Obter recurso pago por ID',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'paid-resources/:paidResourceId',
      method: RequestMethod.GET,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Recurso pago obtido com sucesso.',
      type: GetPaymentPlanPaidResourceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getPaymentPlanPaidResource(
    @Param(
      'paidResourceId',
      new ParseValueObjectPipe(PaymentPlanPaidResourceId),
    )
    paidResourceId: PaymentPlanPaidResourceId,
  ): Promise<GetPaymentPlanPaidResourceResponseDto> {
    return await this.getPaymentPlanPaidResourceUseCase.execute(paidResourceId);
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar recurso pago e configuração de IA. Se o campo "prompt" for fornecido, cria ou atualiza automaticamente a configuração de IA vinculada ao recurso.',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'paid-resources/:paidResourceId',
      method: RequestMethod.PATCH,
      type: UpdatePaymentPlanPaidResourceRequestDto,
    },
    tag: ['plano-de-pagamento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Recurso pago atualizado com sucesso. Configuração de IA criada ou atualizada se prompt foi fornecido.',
      type: GetPaymentPlanPaidResourceResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updatePaymentPlanPaidResource(
    @Param(
      'paidResourceId',
      new ParseValueObjectPipe(PaymentPlanPaidResourceId),
    )
    paidResourceId: PaymentPlanPaidResourceId,
    @Body() dto: UpdatePaymentPlanPaidResourceRequestDto,
  ): Promise<GetPaymentPlanPaidResourceResponseDto> {
    return await this.updatePaymentPlanPaidResourceUseCase.execute(
      paidResourceId,
      dto,
    );
  }
}
