import { HttpStatus, Query, RequestMethod, Param } from '@nestjs/common';

import { ListCustomersRequestDto } from '@module/admin/customer-management/dto/request/list-customers.request.dto';
import { DeactivateCustomerAuthIdentityResponseDto } from '@module/admin/customer-management/dto/response/deactivate-customer-auth-identity.response.dto';
import { ListCustomersResponseDto } from '@module/admin/customer-management/dto/response/list-customers.response.dto';
import { DeactivateCustomerAuthIdentityUseCase } from '@module/admin/customer-management/use-case/deactivate-customer-auth-identity.use-case';
import { ListCustomersUseCase } from '@module/admin/customer-management/use-case/list-customers.use-case';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('customer-management')
export class CustomerManagementController {
  protected readonly _type = CustomerManagementController.name;

  public constructor(
    private readonly listCustomersUseCase: ListCustomersUseCase,
    private readonly deactivateCustomerAuthIdentityUseCase: DeactivateCustomerAuthIdentityUseCase,
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
    summary: 'Desativar identidade de autenticação do customer',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':customerId/deactivate-auth-identity',
      method: RequestMethod.POST,
    },
    tag: ['customer-management'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Identidade de autenticação do customer desativada com sucesso.',
      type: DeactivateCustomerAuthIdentityResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deactivateCustomerAuthIdentity(
    @Param('customerId', new ParseValueObjectPipe(CustomerId))
    customerId: CustomerId,
  ): Promise<DeactivateCustomerAuthIdentityResponseDto> {
    return this.deactivateCustomerAuthIdentityUseCase.execute(customerId);
  }
}
