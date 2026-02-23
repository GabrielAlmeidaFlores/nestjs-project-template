import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListCustomersRequestDto } from '@module/admin/customer-management/dto/request/list-customers.request.dto';
import { ListCustomersResponseDto } from '@module/admin/customer-management/dto/response/list-customers.response.dto';
import { ListCustomersUseCase } from '@module/admin/customer-management/use-case/list-customers.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('customer-management')
export class CustomerManagementController {
  protected readonly _type = CustomerManagementController.name;

  public constructor(
    private readonly listCustomersUseCase: ListCustomersUseCase,
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
}
