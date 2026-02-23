import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListCustomersRequestDto } from '@module/admin/customer-management/dto/request/list-customers.request.dto';
import { ToggleCustomerActiveStatusRequestDto } from '@module/admin/customer-management/dto/request/toggle-customer-active-status.request.dto';
import { DeactivateCustomerAuthIdentityResponseDto } from '@module/admin/customer-management/dto/response/deactivate-customer-auth-identity.response.dto';
import { GetCustomerProfileResponseDto } from '@module/admin/customer-management/dto/response/get-customer-profile.response.dto';
import { ListCustomersResponseDto } from '@module/admin/customer-management/dto/response/list-customers.response.dto';
import { GetCustomerBankPaymentsUseCase } from '@module/admin/customer-management/use-case/get-customer-bank-payments.use-case';
import { GetCustomerProfileUseCase } from '@module/admin/customer-management/use-case/get-customer-profile.use-case';
import { ListCustomersUseCase } from '@module/admin/customer-management/use-case/list-customers.use-case';
import { ToggleCustomerActiveStatusUseCase } from '@module/admin/customer-management/use-case/toggle-customer-active-status.use-case';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { PaginatedBankPaymentsResponseDto } from '@module/customer/payment-plan/dto/response/paginated-bank-payments.response.dto';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('customer-management')
export class CustomerManagementController {
  protected readonly _type = CustomerManagementController.name;

  public constructor(
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly toggleCustomerActiveStatusUseCase: ToggleCustomerActiveStatusUseCase,
    private readonly getCustomerProfileUseCase: GetCustomerProfileUseCase,
    private readonly getCustomerBankPaymentsUseCase: GetCustomerBankPaymentsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar usuários com filtros e paginação',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'users',
      method: RequestMethod.GET,
    },
    tag: ['customer-management'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de usuários obtida com sucesso.',
      type: ListCustomersResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCustomers(
    @Query() dto: ListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto> {
    return this.listCustomersUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Alternar status ativo da identidade de autenticação do customer',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':customerId/deactivate-auth-identity',
      method: RequestMethod.POST,
      type: ToggleCustomerActiveStatusRequestDto,
    },
    tag: ['customer-management'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Status do customer alterado com sucesso.',
      type: DeactivateCustomerAuthIdentityResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deactivateCustomerAuthIdentity(
    @Param('customerId', new ParseValueObjectPipe(CustomerId))
    customerId: CustomerId,
    @Body() dto: ToggleCustomerActiveStatusRequestDto,
  ): Promise<DeactivateCustomerAuthIdentityResponseDto> {
    return this.toggleCustomerActiveStatusUseCase.execute(
      customerId,
      dto.isActive,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter perfil e informações de plano do customer',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':customerId/profile',
      method: RequestMethod.GET,
    },
    tag: ['customer-management'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Perfil do customer obtido com sucesso.',
      type: GetCustomerProfileResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCustomerProfile(
    @Param('customerId', new ParseValueObjectPipe(CustomerId))
    customerId: CustomerId,
  ): Promise<GetCustomerProfileResponseDto> {
    return this.getCustomerProfileUseCase.execute(customerId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar pagamentos do cliente paginado',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':customerId/bank-payments',
      method: RequestMethod.GET,
    },
    tag: ['customer-management'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Pagamentos do cliente obtidos com sucesso.',
      type: PaginatedBankPaymentsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCustomerBankPayments(
    @Param('customerId', new ParseValueObjectPipe(CustomerId))
    customerId: CustomerId,
    @Query() dto: ListDataRequestDto,
  ): Promise<PaginatedBankPaymentsResponseDto> {
    return this.getCustomerBankPaymentsUseCase.execute(
      customerId,
      new ListDataInputModel(dto),
    );
  }
}
