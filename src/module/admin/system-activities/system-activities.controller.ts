import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListSystemActivitiesAdminRequestDto } from '@module/admin/system-activities/dto/request/list-system-activities-admin.request.dto';
import { ListSystemActivitiesCollaboratorsAdminRequestDto } from '@module/admin/system-activities/dto/request/list-system-activities-collaborators-admin.request.dto';
import { ListSystemActivitiesAdminUseCase } from '@module/admin/system-activities/use-case/list-system-activities-admin.use-case';
import { ListSystemActivitiesCollaboratorsAdminUseCase } from '@module/admin/system-activities/use-case/list-system-activities-collaborators-admin.use-case';
import { ListOrganizationCollaboratorsWithStatsResponseDto } from '@module/customer/system-activities/dto/response/list-organization-collaborators-with-stats.response.dto';
import { ListSystemActivitiesResponseDto } from '@module/customer/system-activities/dto/response/list-system-activities.response.dto';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('system-activities')
export class SystemActivitiesAdminController {
  protected readonly _type = SystemActivitiesAdminController.name;

  public constructor(
    private readonly listSystemActivitiesAdminUseCase: ListSystemActivitiesAdminUseCase,
    private readonly listSystemActivitiesCollaboratorsAdminUseCase: ListSystemActivitiesCollaboratorsAdminUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Listar colaboradores com totais de peças e análises (admin, paginado)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'collaborators',
      method: RequestMethod.GET,
    },
    tag: ['admin/system-activities'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de colaboradores com estatísticas.',
      type: ListOrganizationCollaboratorsWithStatsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCollaborators(
    @Query() dto: ListSystemActivitiesCollaboratorsAdminRequestDto,
  ): Promise<ListOrganizationCollaboratorsWithStatsResponseDto> {
    return this.listSystemActivitiesCollaboratorsAdminUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar movimentações do sistema (admin, paginado)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['admin/system-activities'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de movimentações.',
      type: ListSystemActivitiesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async list(
    @Query() dto: ListSystemActivitiesAdminRequestDto,
  ): Promise<ListSystemActivitiesResponseDto> {
    return this.listSystemActivitiesAdminUseCase.execute(dto);
  }
}
