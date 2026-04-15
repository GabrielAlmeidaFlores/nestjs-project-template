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
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';
import { AnalyzeGeneralUrbanRetirementDenialPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/analyze-general-urban-retirement-denial-ppp.request.dto';
import { AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/analyze-general-urban-retirement-denial-time-accelerator.request.dto';
import { CompareGeneralUrbanRetirementDenialCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/compare-general-urban-retirement-denial-cnis-ctps.request.dto';
import { CreateGeneralUrbanRetirementDenialRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/create-general-urban-retirement-denial.request.dto';
import { SaveGeneralUrbanRetirementDenialPeriodsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/save-general-urban-retirement-denial-periods.request.dto';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/update-general-urban-retirement-denial-time-accelerator.request.dto';
import { UpdateGeneralUrbanRetirementDenialRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/update-general-urban-retirement-denial.request.dto';
import { UploadGeneralUrbanRetirementDenialDocumentsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/upload-general-urban-retirement-denial-documents.request.dto';
import { AnalyzeGeneralUrbanRetirementDenialPppResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/analyze-general-urban-retirement-denial-ppp.response.dto';
import { AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/analyze-general-urban-retirement-denial-time-accelerator.response.dto';
import { CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/compare-general-urban-retirement-denial-cnis-ctps.response.dto';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-first-analysis.response.dto';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-inss-decision-analysis.response.dto';
import { CreateGeneralUrbanRetirementDenialResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-result.response.dto';
import { CreateGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial.response.dto';
import { DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/delete-general-urban-retirement-denial-time-accelerator.response.dto';
import { GetGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/get-general-urban-retirement-denial.response.dto';
import { SaveGeneralUrbanRetirementDenialPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/save-general-urban-retirement-denial-periods.response.dto';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/update-general-urban-retirement-denial-time-accelerator.response.dto';
import { UpdateGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/update-general-urban-retirement-denial.response.dto';
import { UploadGeneralUrbanRetirementDenialDocumentsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/upload-general-urban-retirement-denial-documents.response.dto';
import { AnalyzeGeneralUrbanRetirementDenialPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/analyze-general-urban-retirement-denial-ppp.use-case';
import { AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/analyze-general-urban-retirement-denial-time-accelerator.use-case';
import { CompareGeneralUrbanRetirementDenialCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/compare-general-urban-retirement-denial-cnis-ctps.use-case';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-first-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-inss-decision-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-result.use-case';
import { CreateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial.use-case';
import { DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/delete-general-urban-retirement-denial-time-accelerator.use-case';
import { DownloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/download-general-urban-retirement-denial-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/download-general-urban-retirement-denial-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/get-general-urban-retirement-denial.use-case';
import { SaveGeneralUrbanRetirementDenialPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/save-general-urban-retirement-denial-periods.use-case';
import { UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/update-general-urban-retirement-denial-time-accelerator.use-case';
import { UpdateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/update-general-urban-retirement-denial.use-case';
import { UploadGeneralUrbanRetirementDenialDocumentsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/upload-general-urban-retirement-denial-documents.use-case';
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

@CustomerControllerRoute('analysis-tool/general-urban-retirement-denial')
export class GeneralUrbanRetirementDenialController {
  protected readonly _type = GeneralUrbanRetirementDenialController.name;

  public constructor(
    private readonly createGeneralUrbanRetirementDenialUseCase: CreateGeneralUrbanRetirementDenialUseCase,
    private readonly getGeneralUrbanRetirementDenialUseCase: GetGeneralUrbanRetirementDenialUseCase,
    private readonly uploadGeneralUrbanRetirementDenialDocumentsUseCase: UploadGeneralUrbanRetirementDenialDocumentsUseCase,
    private readonly createGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase: CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase,
    private readonly createGeneralUrbanRetirementDenialFirstAnalysisUseCase: CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase,
    private readonly saveGeneralUrbanRetirementDenialPeriodsUseCase: SaveGeneralUrbanRetirementDenialPeriodsUseCase,
    private readonly updateGeneralUrbanRetirementDenialUseCase: UpdateGeneralUrbanRetirementDenialUseCase,
    private readonly analyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase: AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    private readonly updateGeneralUrbanRetirementDenialTimeAcceleratorUseCase: UpdateGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    private readonly deleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase: DeleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase,
    private readonly analyzeGeneralUrbanRetirementDenialPppUseCase: AnalyzeGeneralUrbanRetirementDenialPppUseCase,
    private readonly compareGeneralUrbanRetirementDenialCnisCtpsUseCase: CompareGeneralUrbanRetirementDenialCnisCtpsUseCase,
    private readonly createGeneralUrbanRetirementDenialResultUseCase: CreateGeneralUrbanRetirementDenialResultUseCase,
    private readonly downloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase: DownloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase,
    private readonly downloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase: DownloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementDenialRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateGeneralUrbanRetirementDenialRequestDto,
  ): Promise<CreateGeneralUrbanRetirementDenialResponseDto> {
    return await this.createGeneralUrbanRetirementDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<GetGeneralUrbanRetirementDenialResponseDto> {
    return await this.getGeneralUrbanRetirementDenialUseCase.execute(
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/documents',
      method: RequestMethod.POST,
      type: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadGeneralUrbanRetirementDenialDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
  ): Promise<UploadGeneralUrbanRetirementDenialDocumentsResponseDto> {
    return await this.uploadGeneralUrbanRetirementDenialDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar first analysis da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis gerada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementDenialFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementDenialRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: UpdateGeneralUrbanRetirementDenialRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementDenialResponseDto> {
    return await this.updateGeneralUrbanRetirementDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar períodos da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: SaveGeneralUrbanRetirementDenialPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos salvos com sucesso.',
      type: SaveGeneralUrbanRetirementDenialPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async savePeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: SaveGeneralUrbanRetirementDenialPeriodsRequestDto,
  ): Promise<SaveGeneralUrbanRetirementDenialPeriodsResponseDto> {
    return await this.saveGeneralUrbanRetirementDenialPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar documentos de acelerador de tempo de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de acelerador de tempo gerada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
    return await this.analyzeGeneralUrbanRetirementDenialTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar aceleradores de tempo da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Aceleradores de tempo atualizados com sucesso.',
      type: UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: UpdateGeneralUrbanRetirementDenialTimeAcceleratorRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
    return await this.updateGeneralUrbanRetirementDenialTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Excluir acelerador de tempo da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/time-accelerator/:timeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo excluído com sucesso.',
      type: DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Param(
      'timeAcceleratorId',
      new ParseValueObjectPipe(GeneralUrbanRetirementDenialTimeAcceleratorId),
    )
    generalUrbanRetirementDenialTimeAcceleratorId: GeneralUrbanRetirementDenialTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementDenialTimeAcceleratorResponseDto> {
    return await this.deleteGeneralUrbanRetirementDenialTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      generalUrbanRetirementDenialTimeAcceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar PPP da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'ppp',
      method: RequestMethod.POST,
      type: AnalyzeGeneralUrbanRetirementDenialPppRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de PPP gerada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementDenialPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePpp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementDenialPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDenialPppResponseDto> {
    return await this.analyzeGeneralUrbanRetirementDenialPppUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Comparar CNIS e CTPS da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/compare-cnis-ctps',
      method: RequestMethod.POST,
      type: CompareGeneralUrbanRetirementDenialCnisCtpsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Comparação CNIS x CTPS gerada com sucesso.',
      type: CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async compareCnisCtps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: CompareGeneralUrbanRetirementDenialCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto> {
    return await this.compareGeneralUrbanRetirementDenialCnisCtpsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateGeneralUrbanRetirementDenialResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialResultResponseDto> {
    return await this.createGeneralUrbanRetirementDenialResultUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
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
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementDenialCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
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
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementDenialSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      format,
    );
  }
}
