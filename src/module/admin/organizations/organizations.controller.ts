import { HttpStatus, RequestMethod, Query } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListAdminOrganizationsResponseDto } from '@module/admin/organizations/dto/response/list-admin-organizations.response.dto';
import { ListOrganizationsAdminUseCase } from '@module/admin/organizations/use-case/list-organizations-admin.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('organizations')
export class OrganizationsAdminController {
  protected readonly _type = OrganizationsAdminController.name;

  public constructor(
    private readonly listOrganizationsAdminUseCase: ListOrganizationsAdminUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar organizações (admin, paginado)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['admin/organizations'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de organizações.',
      type: ListAdminOrganizationsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async list(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAdminOrganizationsResponseDto> {
    return this.listOrganizationsAdminUseCase.execute(
      new ListDataInputModel(dto),
    );
  }
}
