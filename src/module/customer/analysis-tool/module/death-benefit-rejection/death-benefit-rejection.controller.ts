import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common/pipes';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';
import { AnalyzeDeathBenefitRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/analyze-death-benefit-rejection-time-accelerator.request.dto';
import { CreateDeathBenefitRejectionPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/create-death-benefit-rejection-period.request.dto';
import { CreateDeathBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/create-death-benefit-rejection.request.dto';
import { UpdateDeathBenefitRejectionDependentRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-dependent.request.dto';
import { UpdateDeathBenefitRejectionInstitutorDataRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-institutor-data.request.dto';
import { UpdateDeathBenefitRejectionLegalRepresentativeRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-legal-representative.request.dto';
import { UpdateDeathBenefitRejectionPeriodRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-period.request.dto';
import { UpdateDeathBenefitRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection-time-accelerator.request.dto';
import { UpdateDeathBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/update-death-benefit-rejection.request.dto';
import { AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/analyze-death-benefit-rejection-time-accelerator.response.dto';
import { CreateDeathBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-first-analysis.response.dto';
import { CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-inss-decision-analysis.response.dto';
import { CreateDeathBenefitRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-period.response.dto';
import { CreateDeathBenefitRejectionResultResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection-result.response.dto';
import { CreateDeathBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/create-death-benefit-rejection.response.dto';
import { DeleteDeathBenefitRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/delete-death-benefit-rejection-period.response.dto';
import { DeleteDeathBenefitRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/delete-death-benefit-rejection-time-accelerator.response.dto';
import { GetDeathBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/get-death-benefit-rejection.response.dto';
import { UpdateDeathBenefitRejectionDependentResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-dependent.response.dto';
import { UpdateDeathBenefitRejectionInstitutorDataResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-institutor-data.response.dto';
import { UpdateDeathBenefitRejectionLegalRepresentativeResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-legal-representative.response.dto';
import { UpdateDeathBenefitRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-period.response.dto';
import { UpdateDeathBenefitRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection-time-accelerator.response.dto';
import { UpdateDeathBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/response/update-death-benefit-rejection.response.dto';
import { AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/analyze-death-benefit-rejection-time-accelerator.use-case';
import { CreateDeathBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-first-analysis.use-case';
import { CreateDeathBenefitRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-inss-decision-analysis.use-case';
import { CreateDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-period.use-case';
import { CreateDeathBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection-result.use-case';
import { CreateDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/create-death-benefit-rejection.use-case';
import { DeleteDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/delete-death-benefit-rejection-period.use-case';
import { DeleteDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/delete-death-benefit-rejection-time-accelerator.use-case';
import { DownloadDeathBenefitRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/download-death-benefit-rejection-complete-analysis.use-case';
import { DownloadDeathBenefitRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/download-death-benefit-rejection-simplified-analysis.use-case';
import { GetDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/get-death-benefit-rejection.use-case';
import { UpdateDeathBenefitRejectionDependentUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-dependent.use-case';
import { UpdateDeathBenefitRejectionInstitutorDataUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-institutor-data.use-case';
import { UpdateDeathBenefitRejectionLegalRepresentativeUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-legal-representative.use-case';
import { UpdateDeathBenefitRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-period.use-case';
import { UpdateDeathBenefitRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection-time-accelerator.use-case';
import { UpdateDeathBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/death-benefit-rejection/use-case/update-death-benefit-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/death-benefit-rejection')
export class DeathBenefitRejectionController {
  protected readonly _type = DeathBenefitRejectionController.name;

  public constructor(
    private readonly createDeathBenefitRejectionUseCase: CreateDeathBenefitRejectionUseCase,
    private readonly getDeathBenefitRejectionUseCase: GetDeathBenefitRejectionUseCase,
    private readonly updateDeathBenefitRejectionUseCase: UpdateDeathBenefitRejectionUseCase,
    private readonly updateDeathBenefitRejectionInstitutorDataUseCase: UpdateDeathBenefitRejectionInstitutorDataUseCase,
    private readonly createDeathBenefitRejectionPeriodUseCase: CreateDeathBenefitRejectionPeriodUseCase,
    private readonly updateDeathBenefitRejectionPeriodUseCase: UpdateDeathBenefitRejectionPeriodUseCase,
    private readonly deleteDeathBenefitRejectionPeriodUseCase: DeleteDeathBenefitRejectionPeriodUseCase,
    private readonly updateDeathBenefitRejectionLegalRepresentativeUseCase: UpdateDeathBenefitRejectionLegalRepresentativeUseCase,
    private readonly updateDeathBenefitRejectionDependentUseCase: UpdateDeathBenefitRejectionDependentUseCase,
    private readonly createDeathBenefitRejectionFirstAnalysisUseCase: CreateDeathBenefitRejectionFirstAnalysisUseCase,
    private readonly createDeathBenefitRejectionInssDecisionAnalysisUseCase: CreateDeathBenefitRejectionInssDecisionAnalysisUseCase,
    private readonly createDeathBenefitRejectionResultUseCase: CreateDeathBenefitRejectionResultUseCase,
    private readonly analyzeDeathBenefitRejectionTimeAcceleratorUseCase: AnalyzeDeathBenefitRejectionTimeAcceleratorUseCase,
    private readonly updateDeathBenefitRejectionTimeAcceleratorUseCase: UpdateDeathBenefitRejectionTimeAcceleratorUseCase,
    private readonly deleteDeathBenefitRejectionTimeAcceleratorUseCase: DeleteDeathBenefitRejectionTimeAcceleratorUseCase,
    private readonly downloadDeathBenefitRejectionCompleteAnalysisUseCase: DownloadDeathBenefitRejectionCompleteAnalysisUseCase,
    private readonly downloadDeathBenefitRejectionSimplifiedAnalysisUseCase: DownloadDeathBenefitRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDeathBenefitRejectionRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateDeathBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDeathBenefitRejectionRequestDto,
  ): Promise<CreateDeathBenefitRejectionResponseDto> {
    return await this.createDeathBenefitRejectionUseCase.execute(
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
      type: GetDeathBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<GetDeathBenefitRejectionResponseDto> {
    return await this.getDeathBenefitRejectionUseCase.execute(
      deathBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateDeathBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionRequestDto,
  ): Promise<UpdateDeathBenefitRejectionResponseDto> {
    return await this.updateDeathBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados do instituidor e documentos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/institutor-data',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionInstitutorDataRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do instituidor e documentos atualizados com sucesso.',
      type: UpdateDeathBenefitRejectionInstitutorDataResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInstitutorData(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionInstitutorDataRequestDto,
  ): Promise<UpdateDeathBenefitRejectionInstitutorDataResponseDto> {
    return await this.updateDeathBenefitRejectionInstitutorDataUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.POST,
      type: CreateDeathBenefitRejectionPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateDeathBenefitRejectionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: CreateDeathBenefitRejectionPeriodRequestDto,
  ): Promise<CreateDeathBenefitRejectionPeriodResponseDto> {
    return await this.createDeathBenefitRejectionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateDeathBenefitRejectionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionPeriodRequestDto,
  ): Promise<UpdateDeathBenefitRejectionPeriodResponseDto> {
    return await this.updateDeathBenefitRejectionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
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
      type: DeleteDeathBenefitRejectionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Param('periodId', new ParseValueObjectPipe(DeathBenefitRejectionPeriodId))
    deathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): Promise<DeleteDeathBenefitRejectionPeriodResponseDto> {
    return await this.deleteDeathBenefitRejectionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      deathBenefitRejectionPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar representante legal',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/legal-representative',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionLegalRepresentativeRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Representante legal atualizado com sucesso.',
      type: UpdateDeathBenefitRejectionLegalRepresentativeResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalRepresentative(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionLegalRepresentativeRequestDto,
  ): Promise<UpdateDeathBenefitRejectionLegalRepresentativeResponseDto> {
    return await this.updateDeathBenefitRejectionLegalRepresentativeUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir dependentes da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/dependent',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionDependentRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dependentes atualizados com sucesso.',
      type: UpdateDeathBenefitRejectionDependentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDependent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionDependentRequestDto,
  ): Promise<UpdateDeathBenefitRejectionDependentResponseDto> {
    return await this.updateDeathBenefitRejectionDependentUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de indeferimento de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionInssDecisionAnalysisResponseDto> {
    return await this.createDeathBenefitRejectionInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
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
      type: CreateDeathBenefitRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionFirstAnalysisResponseDto> {
    return await this.createDeathBenefitRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
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
      type: CreateDeathBenefitRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): Promise<CreateDeathBenefitRejectionResultResponseDto> {
    return await this.createDeathBenefitRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos de acelerador de tempo da pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeDeathBenefitRejectionTimeAcceleratorRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos de acelerador de tempo analisados com sucesso.',
      type: AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeDeathBenefitRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDeathBenefitRejectionTimeAcceleratorResponseDto> {
    return await this.analyzeDeathBenefitRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir aceleradores de tempo da pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateDeathBenefitRejectionTimeAcceleratorRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Aceleradores de tempo atualizados com sucesso.',
      type: UpdateDeathBenefitRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Body() dto: UpdateDeathBenefitRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateDeathBenefitRejectionTimeAcceleratorResponseDto> {
    return await this.updateDeathBenefitRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir acelerador de tempo da pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator/:timeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo excluído com sucesso.',
      type: DeleteDeathBenefitRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Param(
      'timeAcceleratorId',
      new ParseValueObjectPipe(DeathBenefitRejectionTimeAcceleratorId),
    )
    deathBenefitRejectionTimeAcceleratorId: DeathBenefitRejectionTimeAcceleratorId,
  ): Promise<DeleteDeathBenefitRejectionTimeAcceleratorResponseDto> {
    return await this.deleteDeathBenefitRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      deathBenefitRejectionTimeAcceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download da análise completa de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/download-complete',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo de análise completa gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDeathBenefitRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Download da análise simplificada de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result/download-simplified',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo de análise simplificada gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(DeathBenefitRejectionId))
    deathBenefitRejectionId: DeathBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDeathBenefitRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      deathBenefitRejectionId,
      format,
    );
  }
}
