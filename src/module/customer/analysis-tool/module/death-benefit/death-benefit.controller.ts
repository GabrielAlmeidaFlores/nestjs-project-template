import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { CreateDeathBenefitDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit-dependent.request.dto';
import { CreateDeathBenefitPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit-period.request.dto';
import { CreateDeathBenefitRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit.request.dto';
import { UpdateDeathBenefitBenefitInstitorRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/update-death-benefit-benefit-institutor.request.dto';
import { UpdateDeathBenefitLegalRepresentativeRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/update-death-benefit-legal-representative.request.dto';
import { UpdateDeathBenefitPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/update-death-benefit-period.request.dto';
import { UpdateDeathBenefitRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/update-death-benefit.request.dto';
import { CreateDeathBenefitDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-dependent.response.dto';
import { CreateDeathBenefitFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-first-analysis.response.dto';
import { CreateDeathBenefitPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-period.response.dto';
import { CreateDeathBenefitResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit.response.dto';
import { CreateDeathBenefitResultResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/create-death-benefit-result.response.dto';
import { DeleteDeathBenefitPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/delete-death-benefit-period.response.dto';
import { GetDeathBenefitResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/get-death-benefit.response.dto';
import { UpdateDeathBenefitBenefitInstitorResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/update-death-benefit-benefit-institutor.response.dto';
import { UpdateDeathBenefitLegalRepresentativeResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/update-death-benefit-legal-representative.response.dto';
import { UpdateDeathBenefitPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/update-death-benefit-period.response.dto';
import { UpdateDeathBenefitResponseDto } from '@module/customer/analysis-tool/module/death-benefit/dto/response/update-death-benefit.response.dto';
import { CreateDeathBenefitDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-dependent.use-case';
import { CreateDeathBenefitFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-first-analysis.use-case';
import { CreateDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-period.use-case';
import { CreateDeathBenefitResultUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit-result.use-case';
import { CreateDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/create-death-benefit.use-case';
import { DeleteDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/delete-death-benefit-period.use-case';
import { GetDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/get-death-benefit.use-case';
import { UpdateDeathBenefitBenefitInstitorUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-benefit-institutor.use-case';
import { UpdateDeathBenefitDocumentUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-document.use-case';
import { UpdateDeathBenefitLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-legal-representative.use-case';
import { UpdateDeathBenefitPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit-period.use-case';
import { UpdateDeathBenefitUseCase } from '@module/customer/analysis-tool/module/death-benefit/use-case/update-death-benefit.use-case';
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

@CustomerControllerRoute('analysis-tool/death-benefit')
export class DeathBenefitController {
  protected readonly _type = DeathBenefitController.name;

  public constructor(
    private readonly createDeathBenefitUseCase: CreateDeathBenefitUseCase,
    private readonly getDeathBenefitUseCase: GetDeathBenefitUseCase,
    private readonly updateDeathBenefitUseCase: UpdateDeathBenefitUseCase,
    private readonly updateDeathBenefitDocumentUseCase: UpdateDeathBenefitDocumentUseCase,
    private readonly createDeathBenefitPeriodUseCase: CreateDeathBenefitPeriodUseCase,
    private readonly updateDeathBenefitPeriodUseCase: UpdateDeathBenefitPeriodUseCase,
    private readonly deleteDeathBenefitPeriodUseCase: DeleteDeathBenefitPeriodUseCase,
    private readonly updateDeathBenefitBenefitInstitorUseCase: UpdateDeathBenefitBenefitInstitorUseCase,
    private readonly updateDeathBenefitLegalRepresentativeUseCase: UpdateDeathBenefitLegalRepresentativeUseCase,
    private readonly createDeathBenefitDependentUseCase: CreateDeathBenefitDependentUseCase,
    private readonly createDeathBenefitFirstAnalysisUseCase: CreateDeathBenefitFirstAnalysisUseCase,
    private readonly createDeathBenefitResultUseCase: CreateDeathBenefitResultUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDeathBenefitRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateDeathBenefitResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDeathBenefitRequestDto,
  ): Promise<CreateDeathBenefitResponseDto> {
    return await this.createDeathBenefitUseCase.execute(
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
      type: GetDeathBenefitResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
  ): Promise<GetDeathBenefitResponseDto> {
    return await this.getDeathBenefitUseCase.execute(deathBenefitId);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateDeathBenefitResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: UpdateDeathBenefitRequestDto,
  ): Promise<UpdateDeathBenefitResponseDto> {
    return await this.updateDeathBenefitUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar documentos da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/document',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos atualizados com sucesso.',
      type: UpdateDeathBenefitResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: UpdateDeathBenefitRequestDto,
  ): Promise<UpdateDeathBenefitResponseDto> {
    return await this.updateDeathBenefitDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.POST,
      type: CreateDeathBenefitPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateDeathBenefitPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: CreateDeathBenefitPeriodRequestDto,
  ): Promise<CreateDeathBenefitPeriodResponseDto> {
    return await this.createDeathBenefitPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateDeathBenefitPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: UpdateDeathBenefitPeriodRequestDto,
  ): Promise<UpdateDeathBenefitPeriodResponseDto> {
    return await this.updateDeathBenefitPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
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
      type: DeleteDeathBenefitPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Param('periodId', new ParseValueObjectPipe(DeathBenefitPeriodId))
    deathBenefitPeriodId: DeathBenefitPeriodId,
  ): Promise<DeleteDeathBenefitPeriodResponseDto> {
    return await this.deleteDeathBenefitPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      deathBenefitPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar instituidor do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/benefit-institutor',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitBenefitInstitorRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Instituidor do benefício atualizado com sucesso.',
      type: UpdateDeathBenefitBenefitInstitorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBenefitInstitutor(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: UpdateDeathBenefitBenefitInstitorRequestDto,
  ): Promise<UpdateDeathBenefitBenefitInstitorResponseDto> {
    return await this.updateDeathBenefitBenefitInstitorUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar representante legal',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/legal-representative',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitLegalRepresentativeRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Representante legal atualizado com sucesso.',
      type: UpdateDeathBenefitLegalRepresentativeResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalRepresentative(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: UpdateDeathBenefitLegalRepresentativeRequestDto,
  ): Promise<UpdateDeathBenefitLegalRepresentativeResponseDto> {
    return await this.updateDeathBenefitLegalRepresentativeUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar dependente à análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/dependent',
      method: RequestMethod.POST,
      type: CreateDeathBenefitDependentRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Dependente criado com sucesso.',
      type: CreateDeathBenefitDependentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDependent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
    @Body() dto: CreateDeathBenefitDependentRequestDto,
  ): Promise<CreateDeathBenefitDependentResponseDto> {
    return await this.createDeathBenefitDependentUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
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
      type: CreateDeathBenefitFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
  ): Promise<CreateDeathBenefitFirstAnalysisResponseDto> {
    return await this.createDeathBenefitFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
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
      type: CreateDeathBenefitResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitId))
    deathBenefitId: DeathBenefitId,
  ): Promise<CreateDeathBenefitResultResponseDto> {
    return await this.createDeathBenefitResultUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitId,
    );
  }
}
