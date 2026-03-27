import { Body, HttpStatus, Param, Query, RequestMethod, StreamableFile } from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common/pipes';

import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';
import { AnalyzeDisabilityRetirementPlanningGrantPppRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/analyze-disability-retirement-planning-grant-ppp.request.dto';
import { AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/analyze-disability-retirement-planning-grant-time-accelerator.request.dto';
import { CreateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant-disability-period.request.dto';
import { CreateDisabilityRetirementPlanningGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant-period.request.dto';
import { CreateDisabilityRetirementPlanningGrantRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant.request.dto';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant-disability-period.request.dto';
import { UpdateDisabilityRetirementPlanningGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant-period.request.dto';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant-time-accelerator.request.dto';
import { UpdateDisabilityRetirementPlanningGrantRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/update-disability-retirement-planning-grant.request.dto';
import { CreateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-disability-period.response.dto';
import { CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-first-analysis.response.dto';
import { CreateDisabilityRetirementPlanningGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-period.response.dto';
import { CreateDisabilityRetirementPlanningGrantResultResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant-result.response.dto';
import { AnalyzeDisabilityRetirementPlanningGrantPppResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/analyze-disability-retirement-planning-grant-ppp.response.dto';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/analyze-disability-retirement-planning-grant-time-accelerator.response.dto';
import { CreateDisabilityRetirementPlanningGrantResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/create-disability-retirement-planning-grant.response.dto';
import { DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-disability-period.response.dto';
import { DeleteDisabilityRetirementPlanningGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-period.response.dto';
import { DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/delete-disability-retirement-planning-grant-time-accelerator.response.dto';
import { GetDisabilityRetirementPlanningGrantResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/get-disability-retirement-planning-grant.response.dto';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant-disability-period.response.dto';
import { UpdateDisabilityRetirementPlanningGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant-period.response.dto';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant-time-accelerator.response.dto';
import { UpdateDisabilityRetirementPlanningGrantResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/response/update-disability-retirement-planning-grant.response.dto';
import { AnalyzeDisabilityRetirementPlanningGrantPppUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/analyze-disability-retirement-planning-grant-ppp.use-case';
import { AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/analyze-disability-retirement-planning-grant-time-accelerator.use-case';
import { CreateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-disability-period.use-case';
import { CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-first-analysis.use-case';
import { CreateDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-period.use-case';
import { CreateDisabilityRetirementPlanningGrantResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant-result.use-case';
import { DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/download-disability-retirement-planning-grant-complete-analysis.use-case';
import { DownloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/download-disability-retirement-planning-grant-simplified-analysis.use-case';
import { CreateDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/create-disability-retirement-planning-grant.use-case';
import { DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-disability-period.use-case';
import { DeleteDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-period.use-case';
import { DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/delete-disability-retirement-planning-grant-time-accelerator.use-case';
import { GetDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/get-disability-retirement-planning-grant.use-case';
import { UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-disability-period.use-case';
import { UpdateDisabilityRetirementPlanningGrantPeriodUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-period.use-case';
import { UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant-time-accelerator.use-case';
import { UpdateDisabilityRetirementPlanningGrantUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/use-case/update-disability-retirement-planning-grant.use-case';
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

@CustomerControllerRoute('analysis-tool/disability-retirement-planning-grant')
export class DisabilityRetirementPlanningGrantController {
  protected readonly _type = DisabilityRetirementPlanningGrantController.name;

  public constructor(
    private readonly createDisabilityRetirementPlanningGrantUseCase: CreateDisabilityRetirementPlanningGrantUseCase,
    private readonly getDisabilityRetirementPlanningGrantUseCase: GetDisabilityRetirementPlanningGrantUseCase,
    private readonly updateDisabilityRetirementPlanningGrantUseCase: UpdateDisabilityRetirementPlanningGrantUseCase,
    private readonly createDisabilityRetirementPlanningGrantPeriodUseCase: CreateDisabilityRetirementPlanningGrantPeriodUseCase,
    private readonly updateDisabilityRetirementPlanningGrantPeriodUseCase: UpdateDisabilityRetirementPlanningGrantPeriodUseCase,
    private readonly deleteDisabilityRetirementPlanningGrantPeriodUseCase: DeleteDisabilityRetirementPlanningGrantPeriodUseCase,
    private readonly createDisabilityRetirementPlanningGrantDisabilityPeriodUseCase: CreateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    private readonly createDisabilityRetirementPlanningGrantFirstAnalysisUseCase: CreateDisabilityRetirementPlanningGrantFirstAnalysisUseCase,
    private readonly updateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase: UpdateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    private readonly deleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase: DeleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase,
    private readonly analyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    private readonly analyzeDisabilityRetirementPlanningGrantPppUseCase: AnalyzeDisabilityRetirementPlanningGrantPppUseCase,
    private readonly updateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase: UpdateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    private readonly deleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase: DeleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase,
    private readonly createDisabilityRetirementPlanningGrantResultUseCase: CreateDisabilityRetirementPlanningGrantResultUseCase,
    private readonly downloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase: DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase,
    private readonly downloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase: DownloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de concessão de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningGrantRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateDisabilityRetirementPlanningGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDisabilityRetirementPlanningGrantRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningGrantResponseDto> {
    return await this.createDisabilityRetirementPlanningGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de concessão de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetDisabilityRetirementPlanningGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<GetDisabilityRetirementPlanningGrantResponseDto> {
    return await this.getDisabilityRetirementPlanningGrantUseCase.execute(
      disabilityRetirementPlanningGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de concessão de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningGrantRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateDisabilityRetirementPlanningGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body() dto: UpdateDisabilityRetirementPlanningGrantRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantResponseDto> {
    return await this.updateDisabilityRetirementPlanningGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateDisabilityRetirementPlanningGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body() dto: CreateDisabilityRetirementPlanningGrantPeriodRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningGrantPeriodResponseDto> {
    return await this.createDisabilityRetirementPlanningGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateDisabilityRetirementPlanningGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body() dto: UpdateDisabilityRetirementPlanningGrantPeriodRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantPeriodResponseDto> {
    return await this.updateDisabilityRetirementPlanningGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period/:periodId',
      method: RequestMethod.DELETE,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Param(
      'periodId',
      new ParseValueObjectPipe(DisabilityRetirementPlanningGrantPeriodId),
    )
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantPeriodResponseDto> {
    return await this.deleteDisabilityRetirementPlanningGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      disabilityRetirementPlanningGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período de deficiência à análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/disability-period',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período de deficiência criado com sucesso.',
      type: CreateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body()
    dto: CreateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto> {
    return await this.createDisabilityRetirementPlanningGrantDisabilityPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de deficiência da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/disability-period',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de deficiência atualizado com sucesso.',
      type: UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body()
    dto: UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto> {
    return await this.updateDisabilityRetirementPlanningGrantDisabilityPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período de deficiência da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/disability-period/:disabilityPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de deficiência excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDisabilityPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Param(
      'disabilityPeriodId',
      new ParseValueObjectPipe(
        DisabilityRetirementPlanningGrantDisabilityPeriodId,
      ),
    )
    disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto> {
    return await this.deleteDisabilityRetirementPlanningGrantDisabilityPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      disabilityRetirementPlanningGrantDisabilityPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do acelerador de tempo analisados com sucesso.',
      type: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
    return await this.analyzeDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documento PPP da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-ppp-document',
      method: RequestMethod.POST,
      type: AnalyzeDisabilityRetirementPlanningGrantPppRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento PPP analisado com sucesso.',
      type: AnalyzeDisabilityRetirementPlanningGrantPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePppDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeDisabilityRetirementPlanningGrantPppRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningGrantPppResponseDto> {
    return await this.analyzeDisabilityRetirementPlanningGrantPppUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar aceleradores de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo atualizado com sucesso.',
      type: UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Body()
    dto: UpdateDisabilityRetirementPlanningGrantTimeAcceleratorRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
    return await this.updateDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator/:timeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Param(
      'timeAcceleratorId',
      new ParseValueObjectPipe(
        DisabilityRetirementPlanningGrantTimeAcceleratorId,
      ),
    )
    disabilityRetirementPlanningGrantTimeAcceleratorId: DisabilityRetirementPlanningGrantTimeAcceleratorId,
  ): Promise<DeleteDisabilityRetirementPlanningGrantTimeAcceleratorResponseDto> {
    return await this.deleteDisabilityRetirementPlanningGrantTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      disabilityRetirementPlanningGrantTimeAcceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis criada com sucesso.',
      type: CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto> {
    return await this.createDisabilityRetirementPlanningGrantFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateDisabilityRetirementPlanningGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): Promise<CreateDisabilityRetirementPlanningGrantResultResponseDto> {
    return await this.createDisabilityRetirementPlanningGrantResultUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da concessão de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de concessão de aposentadoria da pessoa com deficiência retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada da concessão de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de concessão de aposentadoria da pessoa com deficiência retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DisabilityRetirementPlanningGrantId))
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityRetirementPlanningGrantSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningGrantId,
      format,
    );
  }
}
