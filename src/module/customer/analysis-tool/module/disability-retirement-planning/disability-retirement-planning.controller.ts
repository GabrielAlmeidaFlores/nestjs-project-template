import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { CreateDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning-remuneration.request.dto';
import { CreateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning.request.dto';
import { ListDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/list-disability-retirement-planning-remuneration.request.dto';
import { UpdateDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning-remuneration.request.dto';
import { UpdateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning.request.dto';
import { CreateDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-remuneration.response.dto';
import { CreateDisabilityRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning-result.response.dto';
import { CreateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning.response.dto';
import { DeleteDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/delete-disability-retirement-planning.response.dto';
import { GetDisabilityRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning-remuneration-calculation.response.dto';
import { GetDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning.response.dto';
import { ListDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/list-disability-retirement-planning-remuneration.response.dto';
import { UpdateDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning-remuneration.response.dto';
import { UpdateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning.response.dto';
import { CreateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-remuneration.use-case';
import { CreateDisabilityRetirementPlanningResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning-result.use-case';
import { CreateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/create-disability-retirement-planning.use-case';
import { DeleteDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/delete-disability-retirement-planning.use-case';
import { GetDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/get-disability-retirement-planning.use-case';
import { ListDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/list-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning-remuneration.use-case';
import { UpdateDisabilityRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning/use-case/update-disability-retirement-planning.use-case';
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

@CustomerControllerRoute('analysis-tool/disability-retirement-planning')
export class DisabilityRetirementPlanningController {
  protected readonly _type = DisabilityRetirementPlanningController.name;

  public constructor(
    private readonly createDisabilityRetirementPlanningUseCase: CreateDisabilityRetirementPlanningUseCase,
    private readonly createDisabilityRetirementPlanningRemunerationUseCase: CreateDisabilityRetirementPlanningRemunerationUseCase,
    private readonly updateDisabilityRetirementPlanningRemunerationUseCase: UpdateDisabilityRetirementPlanningRemunerationUseCase,
    private readonly getDisabilityRetirementPlanningUseCase: GetDisabilityRetirementPlanningUseCase,
    private readonly listDisabilityRetirementPlanningRemunerationUseCase: ListDisabilityRetirementPlanningRemunerationUseCase,
    private readonly updateDisabilityRetirementPlanningUseCase: UpdateDisabilityRetirementPlanningUseCase,
    private readonly createDisabilityRetirementPlanningResultUseCase: CreateDisabilityRetirementPlanningResultUseCase,
    private readonly deleteDisabilityRetirementPlanningUseCase: DeleteDisabilityRetirementPlanningUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningRequestDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Planejamento de aposentadoria por invalidez criado com sucesso.',
      type: CreateDisabilityRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDisabilityRetirementPlanningRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningResponseDto> {
    return await this.createDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar remunerações do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: CreateDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.createDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar remunerações do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: UpdateDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.updateDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter planejamento de aposentadoria por invalidez por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do planejamento de aposentadoria por invalidez retornados com sucesso.',
      type: GetDisabilityRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningResponseDto> {
    return await this.getDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar remunerações do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: ':disabilityRetirementPlanningId/remuneration',
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações do planejamento de aposentadoria por invalidez listadas com sucesso.',
      type: ListDisabilityRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDisabilityRetirementPlanningRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Query() dto: ListDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRemunerationResponseDto> {
    return await this.listDisabilityRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.PATCH,
      path: ':disabilityRetirementPlanningId',
      type: UpdateDisabilityRetirementPlanningRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Planejamento de aposentadoria por invalidez atualizado com sucesso.',
      type: UpdateDisabilityRetirementPlanningResponseDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    @Body() dto: UpdateDisabilityRetirementPlanningRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningResponseDto> {
    return await this.updateDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: ':disabilityRetirementPlanningId/result',
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado do planejamento de aposentadoria por invalidez criado com sucesso.',
      type: CreateDisabilityRetirementPlanningResultResponseDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityRetirementPlanningResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<CreateDisabilityRetirementPlanningResultResponseDto> {
    return await this.createDisabilityRetirementPlanningResultUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.DELETE,
      path: ':disabilityRetirementPlanningId',
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Planejamento de aposentadoria por invalidez excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningResponseDto,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDisabilityRetirementPlanning(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<DeleteDisabilityRetirementPlanningResponseDto> {
    return await this.deleteDisabilityRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter cálculo de remunerações do planejamento de aposentadoria por invalidez',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityRetirementPlanningId/remuneration-calculation',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-por-invalidez'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cálculo de remunerações retornado com sucesso.',
      type: GetDisabilityRetirementPlanningRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
    deprecated: true,
  })
  public getDisabilityRetirementPlanningRemunerationCalculation(
    @GetSessionData() _sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    _organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityRetirementPlanningId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningId),
    )
    _disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): GetDisabilityRetirementPlanningRemunerationCalculationResponseDto {
    return GetDisabilityRetirementPlanningRemunerationCalculationResponseDto.build(
      {},
    );
  }
}
