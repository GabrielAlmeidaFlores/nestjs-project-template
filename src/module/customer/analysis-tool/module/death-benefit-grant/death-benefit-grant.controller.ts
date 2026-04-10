import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import { CreateDeathBenefitGrantDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant-dependent.request.dto';
import { CreateDeathBenefitGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant-period.request.dto';
import { CreateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant.request.dto';
import { UpdateDeathBenefitGrantInstitutorDataRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-institutor-data.request.dto';
import { UpdateDeathBenefitGrantLegalRepresentativeRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-legal-representative.request.dto';
import { UpdateDeathBenefitGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant-period.request.dto';
import { UpdateDeathBenefitGrantRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/update-death-benefit-grant.request.dto';
import { CreateDeathBenefitGrantDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-dependent.response.dto';
import { CreateDeathBenefitGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-first-analysis.response.dto';
import { CreateDeathBenefitGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-period.response.dto';
import { CreateDeathBenefitGrantResultResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant-result.response.dto';
import { CreateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/create-death-benefit-grant.response.dto';
import { DeleteDeathBenefitGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/delete-death-benefit-grant-period.response.dto';
import { GetDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/get-death-benefit-grant.response.dto';
import { UpdateDeathBenefitGrantInstitutorDataResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-institutor-data.response.dto';
import { UpdateDeathBenefitGrantLegalRepresentativeResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-legal-representative.response.dto';
import { UpdateDeathBenefitGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant-period.response.dto';
import { UpdateDeathBenefitGrantResponseDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/response/update-death-benefit-grant.response.dto';
import { CreateDeathBenefitGrantDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-dependent.use-case';
import { CreateDeathBenefitGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-first-analysis.use-case';
import { CreateDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-period.use-case';
import { CreateDeathBenefitGrantResultUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant-result.use-case';
import { CreateDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/create-death-benefit-grant.use-case';
import { DeleteDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/delete-death-benefit-grant-period.use-case';
import { GetDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/get-death-benefit-grant.use-case';
import { UpdateDeathBenefitGrantInstitutorDataUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-institutor-data.use-case';
import { UpdateDeathBenefitGrantLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-legal-representative.use-case';
import { UpdateDeathBenefitGrantPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant-period.use-case';
import { UpdateDeathBenefitGrantUseCase } from '@module/customer/analysis-tool/module/death-benefit-grant/use-case/update-death-benefit-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/death-benefit-grant')
export class DeathBenefitGrantController {
  protected readonly _type = DeathBenefitGrantController.name;

  public constructor(
    private readonly createDeathBenefitGrantUseCase: CreateDeathBenefitGrantUseCase,
    private readonly getDeathBenefitGrantUseCase: GetDeathBenefitGrantUseCase,
    private readonly updateDeathBenefitGrantUseCase: UpdateDeathBenefitGrantUseCase,
    private readonly updateDeathBenefitGrantInstitutorDataUseCase: UpdateDeathBenefitGrantInstitutorDataUseCase,
    private readonly createDeathBenefitGrantPeriodUseCase: CreateDeathBenefitGrantPeriodUseCase,
    private readonly updateDeathBenefitGrantPeriodUseCase: UpdateDeathBenefitGrantPeriodUseCase,
    private readonly deleteDeathBenefitGrantPeriodUseCase: DeleteDeathBenefitGrantPeriodUseCase,
    private readonly updateDeathBenefitGrantLegalRepresentativeUseCase: UpdateDeathBenefitGrantLegalRepresentativeUseCase,
    private readonly createDeathBenefitGrantDependentUseCase: CreateDeathBenefitGrantDependentUseCase,
    private readonly createDeathBenefitGrantFirstAnalysisUseCase: CreateDeathBenefitGrantFirstAnalysisUseCase,
    private readonly createDeathBenefitGrantResultUseCase: CreateDeathBenefitGrantResultUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDeathBenefitGrantRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateDeathBenefitGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDeathBenefitGrantRequestDto,
  ): Promise<CreateDeathBenefitGrantResponseDto> {
    return await this.createDeathBenefitGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetDeathBenefitGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<GetDeathBenefitGrantResponseDto> {
    return await this.getDeathBenefitGrantUseCase.execute(deathBenefitGrantId);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitGrantRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateDeathBenefitGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: UpdateDeathBenefitGrantRequestDto,
  ): Promise<UpdateDeathBenefitGrantResponseDto> {
    return await this.updateDeathBenefitGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados do instituidor e documentos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/institutor-data',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitGrantInstitutorDataRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do instituidor e documentos atualizados com sucesso.',
      type: UpdateDeathBenefitGrantInstitutorDataResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInstitutorData(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: UpdateDeathBenefitGrantInstitutorDataRequestDto,
  ): Promise<UpdateDeathBenefitGrantInstitutorDataResponseDto> {
    return await this.updateDeathBenefitGrantInstitutorDataUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.POST,
      type: CreateDeathBenefitGrantPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateDeathBenefitGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: CreateDeathBenefitGrantPeriodRequestDto,
  ): Promise<CreateDeathBenefitGrantPeriodResponseDto> {
    return await this.createDeathBenefitGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitGrantPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateDeathBenefitGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: UpdateDeathBenefitGrantPeriodRequestDto,
  ): Promise<UpdateDeathBenefitGrantPeriodResponseDto> {
    return await this.updateDeathBenefitGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period/:periodId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período excluído com sucesso.',
      type: DeleteDeathBenefitGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Param('periodId', new ParseValueObjectPipe(DeathBenefitGrantPeriodId))
    deathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): Promise<DeleteDeathBenefitGrantPeriodResponseDto> {
    return await this.deleteDeathBenefitGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      deathBenefitGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar representante legal',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/legal-representative',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitGrantLegalRepresentativeRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Representante legal atualizado com sucesso.',
      type: UpdateDeathBenefitGrantLegalRepresentativeResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalRepresentative(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: UpdateDeathBenefitGrantLegalRepresentativeRequestDto,
  ): Promise<UpdateDeathBenefitGrantLegalRepresentativeResponseDto> {
    return await this.updateDeathBenefitGrantLegalRepresentativeUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar dependente à análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/dependent',
      method: RequestMethod.POST,
      type: CreateDeathBenefitGrantDependentRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Dependente criado com sucesso.',
      type: CreateDeathBenefitGrantDependentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDependent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
    @Body() dto: CreateDeathBenefitGrantDependentRequestDto,
  ): Promise<CreateDeathBenefitGrantDependentResponseDto> {
    return await this.createDeathBenefitGrantDependentUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Executar primeira análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Primeira análise executada com sucesso.',
      type: CreateDeathBenefitGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<CreateDeathBenefitGrantFirstAnalysisResponseDto> {
    return await this.createDeathBenefitGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result',
      method: RequestMethod.POST,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateDeathBenefitGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitGrantId))
    deathBenefitGrantId: DeathBenefitGrantId,
  ): Promise<CreateDeathBenefitGrantResultResponseDto> {
    return await this.createDeathBenefitGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitGrantId,
    );
  }
}
