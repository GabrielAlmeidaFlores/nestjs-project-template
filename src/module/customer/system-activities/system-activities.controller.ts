import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListSystemActivitiesCollaboratorsRequestDto } from '@module/customer/system-activities/dto/request/list-system-activities-collaborators.request.dto';
import { ListSystemActivitiesRequestDto } from '@module/customer/system-activities/dto/request/list-system-activities.request.dto';
import { ListOrganizationCollaboratorsWithStatsResponseDto } from '@module/customer/system-activities/dto/response/list-organization-collaborators-with-stats.response.dto';
import { ListSystemActivitiesResponseDto } from '@module/customer/system-activities/dto/response/list-system-activities.response.dto';
import { ListSystemActivitiesCollaboratorsUseCase } from '@module/customer/system-activities/use-case/list-system-activities-collaborators.use-case';
import { ListSystemActivitiesUseCase } from '@module/customer/system-activities/use-case/list-system-activities.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('system-activities')
export class SystemActivitiesController {
  protected readonly _type = SystemActivitiesController.name;

  public constructor(
    private readonly listSystemActivitiesUseCase: ListSystemActivitiesUseCase,
    private readonly listSystemActivitiesCollaboratorsUseCase: ListSystemActivitiesCollaboratorsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Listar colaboradores da organização com totais de peças e análises (paginado)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'collaborators',
      method: RequestMethod.GET,
    },
    tag: ['customer/system-activities'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de colaboradores com estatísticas.',
      type: ListOrganizationCollaboratorsWithStatsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listCollaborators(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListSystemActivitiesCollaboratorsRequestDto,
  ): Promise<ListOrganizationCollaboratorsWithStatsResponseDto> {
    return this.listSystemActivitiesCollaboratorsUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar movimentações do sistema da organização (paginado)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['customer/system-activities'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de movimentações.',
      type: ListSystemActivitiesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async list(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListSystemActivitiesRequestDto,
  ): Promise<ListSystemActivitiesResponseDto> {
    return this.listSystemActivitiesUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
