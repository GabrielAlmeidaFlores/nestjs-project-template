import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';
import { AnalyzeDisabilityRetirementPlanningRejectionPppRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/analyze-disability-retirement-planning-rejection-ppp.request.dto';
import { AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/analyze-disability-retirement-planning-rejection-time-accelerator.request.dto';
import { CreateDisabilityRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/create-disability-retirement-planning-rejection.request.dto';
import { SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/save-disability-retirement-planning-rejection-periods.request.dto';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/update-disability-retirement-planning-rejection-time-accelerator.request.dto';
import { UpdateDisabilityRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/update-disability-retirement-planning-rejection.request.dto';
import { UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/request/upload-disability-retirement-planning-rejection-documents.request.dto';
import { AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/analyze-disability-retirement-planning-rejection-ppp.response.dto';
import { AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/analyze-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-first-analysis.response.dto';
import { CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-inss-decision-analysis.response.dto';
import { CreateDisabilityRetirementPlanningRejectionResultResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection-result.response.dto';
import { CreateDisabilityRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/create-disability-retirement-planning-rejection.response.dto';
import { DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/delete-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { GetDisabilityRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/get-disability-retirement-planning-rejection.response.dto';
import { SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/save-disability-retirement-planning-rejection-periods.response.dto';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/update-disability-retirement-planning-rejection-time-accelerator.response.dto';
import { UpdateDisabilityRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/update-disability-retirement-planning-rejection.response.dto';
import { UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/upload-disability-retirement-planning-rejection-documents.response.dto';
import { AnalyzeDisabilityRetirementPlanningRejectionPppUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/analyze-disability-retirement-planning-rejection-ppp.use-case';
import { AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/analyze-disability-retirement-planning-rejection-time-accelerator.use-case';
import { CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-first-analysis.use-case';
import { CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-inss-decision-analysis.use-case';
import { CreateDisabilityRetirementPlanningRejectionResultUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection-result.use-case';
import { CreateDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/create-disability-retirement-planning-rejection.use-case';
import { DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/delete-disability-retirement-planning-rejection-time-accelerator.use-case';
import { DownloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/download-disability-retirement-planning-rejection-complete-analysis.use-case';
import { DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/download-disability-retirement-planning-rejection-simplified-analysis.use-case';
import { GetDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/get-disability-retirement-planning-rejection.use-case';
import { SaveDisabilityRetirementPlanningRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/save-disability-retirement-planning-rejection-periods.use-case';
import { UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/update-disability-retirement-planning-rejection-time-accelerator.use-case';
import { UpdateDisabilityRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/update-disability-retirement-planning-rejection.use-case';
import { UploadDisabilityRetirementPlanningRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/use-case/upload-disability-retirement-planning-rejection-documents.use-case';
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

@CustomerControllerRoute(
  'analysis-tool/disability-retirement-planning-rejection',
)
export class DisabilityRetirementPlanningRejectionController {
  protected readonly _type =
    DisabilityRetirementPlanningRejectionController.name;

  public constructor(
    private readonly createDisabilityRetirementPlanningRejectionUseCase: CreateDisabilityRetirementPlanningRejectionUseCase,
    private readonly getDisabilityRetirementPlanningRejectionUseCase: GetDisabilityRetirementPlanningRejectionUseCase,
    private readonly uploadDisabilityRetirementPlanningRejectionDocumentsUseCase: UploadDisabilityRetirementPlanningRejectionDocumentsUseCase,
    private readonly createDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase: CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase,
    private readonly createDisabilityRetirementPlanningRejectionFirstAnalysisUseCase: CreateDisabilityRetirementPlanningRejectionFirstAnalysisUseCase,
    private readonly saveDisabilityRetirementPlanningRejectionPeriodsUseCase: SaveDisabilityRetirementPlanningRejectionPeriodsUseCase,
    private readonly updateDisabilityRetirementPlanningRejectionUseCase: UpdateDisabilityRetirementPlanningRejectionUseCase,
    private readonly analyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly updateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase: UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly deleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase: DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly analyzeDisabilityRetirementPlanningRejectionPppUseCase: AnalyzeDisabilityRetirementPlanningRejectionPppUseCase,
    private readonly createDisabilityRetirementPlanningRejectionResultUseCase: CreateDisabilityRetirementPlanningRejectionResultUseCase,
    private readonly downloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase: DownloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase,
    private readonly downloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase: DownloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDisabilityRetirementPlanningRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateDisabilityRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDisabilityRetirementPlanningRejectionRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningRejectionResponseDto> {
    return await this.createDisabilityRetirementPlanningRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetDisabilityRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<GetDisabilityRetirementPlanningRejectionResponseDto> {
    return await this.getDisabilityRetirementPlanningRejectionUseCase.execute(
      disabilityRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/documents',
      method: RequestMethod.POST,
      type: UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Body() dto: UploadDisabilityRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<UploadDisabilityRetirementPlanningRejectionDocumentsResponseDto> {
    return await this.uploadDisabilityRetirementPlanningRejectionDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionInssDecisionAnalysisResponseDto> {
    return await this.createDisabilityRetirementPlanningRejectionInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar first analysis da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis gerada com sucesso.',
      type: CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto> {
    return await this.createDisabilityRetirementPlanningRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateDisabilityRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Body() dto: UpdateDisabilityRetirementPlanningRejectionRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRejectionResponseDto> {
    return await this.updateDisabilityRetirementPlanningRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar períodos da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos salvos com sucesso.',
      type: SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async savePeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Body() dto: SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto,
  ): Promise<SaveDisabilityRetirementPlanningRejectionPeriodsResponseDto> {
    return await this.saveDisabilityRetirementPlanningRejectionPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar documentos de acelerador de tempo de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de acelerador de tempo gerada com sucesso.',
      type: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return await this.analyzeDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar aceleradores de tempo da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Aceleradores de tempo atualizados com sucesso.',
      type: UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Body()
    dto: UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return await this.updateDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Excluir acelerador de tempo da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator/:timeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo excluído com sucesso.',
      type: DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Param(
      'timeAcceleratorId',
      new ParseValueObjectPipe(
        DisabilityRetirementPlanningRejectionTimeAcceleratorId,
      ),
    )
    disabilityRetirementPlanningRejectionTimeAcceleratorId: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
  ): Promise<DeleteDisabilityRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return await this.deleteDisabilityRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      disabilityRetirementPlanningRejectionTimeAcceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar PPP da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'ppp',
      method: RequestMethod.POST,
      type: AnalyzeDisabilityRetirementPlanningRejectionPppRequestDto,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de PPP gerada com sucesso.',
      type: AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePpp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeDisabilityRetirementPlanningRejectionPppRequestDto,
  ): Promise<AnalyzeDisabilityRetirementPlanningRejectionPppResponseDto> {
    return await this.analyzeDisabilityRetirementPlanningRejectionPppUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateDisabilityRetirementPlanningRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): Promise<CreateDisabilityRetirementPlanningRejectionResultResponseDto> {
    return await this.createDisabilityRetirementPlanningRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise completa disponibilizada para download com sucesso.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityRetirementPlanningRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de indeferimento de aposentadoria da pessoa com deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-pessoa-com-deficiencia'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise simplificada disponibilizada para download com sucesso.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(DisabilityRetirementPlanningRejectionId),
    )
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityRetirementPlanningRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityRetirementPlanningRejectionId,
      format,
    );
  }
}
