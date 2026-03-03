import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { CreateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/create-retirement-planning-rpps-remuneration.request.dto';
import { CreateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/create-retirement-planning-rpps.request.dto';
import { ListRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/list-retirement-planning-rpps-remuneration.request.dto';
import { UpdateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/update-retirement-planning-rpps-remuneration.request.dto';
import { UpdateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/request/update-retirement-planning-rpps.request.dto';
import { CreateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/create-retirement-planning-rpps-remuneration.response.dto';
import { CreateRetirementPlanningRppsResultResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/create-retirement-planning-rpps-result.response.dto';
import { CreateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/create-retirement-planning-rpps.response.dto';
import { GetRetirementPlanningRppsRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/get-retirement-planning-rpps-remuneration-calculation.response.dto';
import { GetRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/get-retirement-planning-rpps.response.dto';
import { ListRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/list-retirement-planning-rpps-remuneration.response.dto';
import { UpdateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/update-retirement-planning-rpps-remuneration.response.dto';
import { UpdateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/update-retirement-planning-rpps.response.dto';
import { CreateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps-remuneration.use-case';
import { CreateRetirementPlanningRppsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps-result.use-case';
import { CreateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/create-retirement-planning-rpps.use-case';
import { GetRetirementPlanningRppsRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/get-retirement-planning-rpps-remuneration-calculation.use-case';
import { GetRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/get-retirement-planning-rpps.use-case';
import { ListRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/list-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/update-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rpps/use-case/update-retirement-planning-rpps.use-case';
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

@CustomerControllerRoute('analysis-tool/retirement-planning-rpps')
export class RetirementPlanningRppsController {
  protected readonly _type = RetirementPlanningRppsController.name;

  public constructor(
    private readonly createRetirementPlanningRppsUseCase: CreateRetirementPlanningRppsUseCase,
    private readonly createRetirementPlanningRppsRemunerationUseCase: CreateRetirementPlanningRppsRemunerationUseCase,
    private readonly updateRetirementPlanningRppsRemunerationUseCase: UpdateRetirementPlanningRppsRemunerationUseCase,
    private readonly getRetirementPlanningRppsUseCase: GetRetirementPlanningRppsUseCase,
    private readonly getRetirementPlanningRppsRemunerationCalculationUseCase: GetRetirementPlanningRppsRemunerationCalculationUseCase,
    private readonly listRetirementPlanningRppsRemunerationUseCase: ListRetirementPlanningRppsRemunerationUseCase,
    private readonly updateRetirementPlanningRppsUseCase: UpdateRetirementPlanningRppsUseCase,
    private readonly createRetirementPlanningRppsResultUseCase: CreateRetirementPlanningRppsResultUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRppsRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Planejamento previdenciário RPPS criado com sucesso.',
      type: CreateRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRetirementPlanningRppsRequestDto,
  ): Promise<CreateRetirementPlanningRppsResponseDto> {
    return await this.createRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar remunerações do cliente para planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRppsId/remuneration',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRppsRemunerationRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: CreateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<CreateRetirementPlanningRppsRemunerationResponseDto> {
    return await this.createRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRppsId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPlanningRppsRemunerationRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: UpdateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<UpdateRetirementPlanningRppsRemunerationResponseDto> {
    return await this.updateRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter planejamento previdenciário RPPS por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRppsId',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do planejamento previdenciário RPPS retornados com sucesso.',
      type: GetRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsResponseDto> {
    return await this.getRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter cálculo de remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRppsId/remuneration-calculation',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cálculo de remunerações retornado com sucesso.',
      type: GetRetirementPlanningRppsRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRppsRemunerationCalculation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationCalculationResponseDto> {
    return await this.getRetirementPlanningRppsRemunerationCalculationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: ':retirementPlanningRppsId/remuneration',
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Remunerações do planejamento previdenciário RPPS listadas com sucesso.',
      type: ListRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Query() dto: ListRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<ListRetirementPlanningRppsRemunerationResponseDto> {
    return await this.listRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.PATCH,
      path: ':retirementPlanningRppsId',
      type: UpdateRetirementPlanningRppsRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Planejamento previdenciário RPPS atualizado com sucesso.',
      type: UpdateRetirementPlanningRppsResponseDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: UpdateRetirementPlanningRppsRequestDto,
  ): Promise<UpdateRetirementPlanningRppsResponseDto> {
    return await this.updateRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: ':retirementPlanningRppsId/result',
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do planejamento previdenciário RPPS criado com sucesso.',
      type: CreateRetirementPlanningRppsResultResponseDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRppsResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<CreateRetirementPlanningRppsResultResponseDto> {
    return await this.createRetirementPlanningRppsResultUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }
}
