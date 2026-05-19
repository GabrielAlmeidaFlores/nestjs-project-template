import { RequestMethod, HttpStatus, Body, Param } from '@nestjs/common';

import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { CreateMiniAdvisorRequestDto } from '@module/customer/mini-advisor/dto/request/create-mini-advisor.request.dto';
import { CreateMiniAdvisorResultResponseDto } from '@module/customer/mini-advisor/dto/response/create-mini-advisor-result.response.dto';
import { CreateMiniAdvisorResponseDto } from '@module/customer/mini-advisor/dto/response/create-mini-advisor.response.dto';
import { GetMiniAdvisorResponseDto } from '@module/customer/mini-advisor/dto/response/get-mini-advisor.response.dto';
import { CreateMiniAdvisorResultUseCase } from '@module/customer/mini-advisor/use-case/create-mini-advisor-result.use-case';
import { CreateMiniAdvisorUseCase } from '@module/customer/mini-advisor/use-case/create-mini-advisor.use-case';
import { GetMiniAdvisorUseCase } from '@module/customer/mini-advisor/use-case/get-mini-advisor.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool/mini-advisor')
export class MiniAdvisorController {
  protected readonly _type = MiniAdvisorController.name;

  public constructor(
    private readonly createMiniAdvisorUseCase: CreateMiniAdvisorUseCase,
    private readonly createMiniAdvisorResultUseCase: CreateMiniAdvisorResultUseCase,
    private readonly getMiniAdvisorUseCase: GetMiniAdvisorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar mini orientador',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateMiniAdvisorRequestDto,
    },
    tag: ['mini-advisor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Mini orientador criado com sucesso.',
      type: CreateMiniAdvisorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createMiniAdvisor(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateMiniAdvisorRequestDto,
  ): Promise<CreateMiniAdvisorResponseDto> {
    return await this.createMiniAdvisorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter mini orientador por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':miniAdvisorId',
      method: RequestMethod.GET,
    },
    tag: ['mini-advisor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Mini orientador encontrado com sucesso.',
      type: GetMiniAdvisorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getMiniAdvisor(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('miniAdvisorId', new ParseValueObjectPipe(MiniAdvisorId))
    miniAdvisorId: MiniAdvisorId,
  ): Promise<GetMiniAdvisorResponseDto> {
    return await this.getMiniAdvisorUseCase.execute(
      sessionData,
      organizationSessionData,
      miniAdvisorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado do mini orientador',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':miniAdvisorId/result',
      method: RequestMethod.POST,
    },
    tag: ['mini-advisor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado do Mini orientador gerado com sucesso.',
      type: CreateMiniAdvisorResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
    throttle: {
      limit: 10,
      ttlInMinutes: 1,
    },
  })
  public async createMiniAdvisorResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('miniAdvisorId', new ParseValueObjectPipe(MiniAdvisorId))
    miniAdvisorId: MiniAdvisorId,
  ): Promise<CreateMiniAdvisorResultResponseDto> {
    return await this.createMiniAdvisorResultUseCase.execute(
      sessionData,
      organizationSessionData,
      miniAdvisorId,
    );
  }
}
