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
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { AnalyzeGeneralUrbanRetirementDocumentsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/analyze-general-urban-retirement-documents.request.dto';
import { CreateGeneralUrbanRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis-period.request.dto';
import { CreateGeneralUrbanRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis-remuneration.request.dto';
import { CreateGeneralUrbanRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis.request.dto';
import { ListGeneralUrbanRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/list-general-urban-retirement-analysis-remuneration.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis-period.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis-remuneration.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis.request.dto';
import { AnalyzeGeneralUrbanRetirementDocumentsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/analyze-general-urban-retirement-documents.response.dto';
import { CreateGeneralUrbanRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis-period.response.dto';
import { CreateGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis-remuneration.response.dto';
import { CreateGeneralUrbanRetirementAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis-result.response.dto';
import { CreateGeneralUrbanRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/create-general-urban-retirement-analysis.response.dto';
import { GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration-calculation.response.dto';
import { GetGeneralUrbanRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis.response.dto';
import { ListGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/list-general-urban-retirement-analysis-remuneration.response.dto';
import { UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis-period.response.dto';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis-remuneration.response.dto';
import { UpdateGeneralUrbanRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis.response.dto';
import { AnalyzeGeneralUrbanRetirementDocumentsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/analyze-general-urban-retirement-documents.use-case';
import { CreateGeneralUrbanRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-period.use-case';
import { CreateGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-remuneration.use-case';
import { CreateGeneralUrbanRetirementAnalysisResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis-result.use-case';
import { CreateGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/create-general-urban-retirement-analysis.use-case';
import { DownloadGeneralUrbanRetirementCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/download-general-urban-retirement-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/download-general-urban-retirement-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/get-general-urban-retirement-analysis-remuneration-calculation.use-case';
import { GetGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/get-general-urban-retirement-analysis.use-case';
import { ListGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/list-general-urban-retirement-analysis-remuneration.use-case';
import { UpdateGeneralUrbanRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis-period.use-case';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis-remuneration.use-case';
import { UpdateGeneralUrbanRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement/use-case/update-general-urban-retirement-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/general-urban-retirement-analysis')
export class GeneralUrbanRetirementController {
  protected readonly _type = GeneralUrbanRetirementController.name;

  public constructor(
    private readonly createGeneralUrbanRetirementAnalysisUseCase: CreateGeneralUrbanRetirementAnalysisUseCase,
    private readonly createGeneralUrbanRetirementAnalysisPeriodUseCase: CreateGeneralUrbanRetirementAnalysisPeriodUseCase,
    private readonly createGeneralUrbanRetirementAnalysisRemunerationUseCase: CreateGeneralUrbanRetirementAnalysisRemunerationUseCase,
    private readonly updateGeneralUrbanRetirementAnalysisPeriodUseCase: UpdateGeneralUrbanRetirementAnalysisPeriodUseCase,
    private readonly updateGeneralUrbanRetirementAnalysisRemunerationUseCase: UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase,
    private readonly getGeneralUrbanRetirementAnalysisUseCase: GetGeneralUrbanRetirementAnalysisUseCase,
    private readonly getGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase: GetGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase,
    private readonly listGeneralUrbanRetirementAnalysisRemunerationUseCase: ListGeneralUrbanRetirementAnalysisRemunerationUseCase,
    private readonly updateGeneralUrbanRetirementAnalysisUseCase: UpdateGeneralUrbanRetirementAnalysisUseCase,
    private readonly createGeneralUrbanRetirementAnalysisResultUseCase: CreateGeneralUrbanRetirementAnalysisResultUseCase,
    private readonly analyzeGeneralUrbanRetirementDocumentsUseCase: AnalyzeGeneralUrbanRetirementDocumentsUseCase,
    private readonly downloadGeneralUrbanRetirementCompleteAnalysisUseCase: DownloadGeneralUrbanRetirementCompleteAnalysisUseCase,
    private readonly downloadGeneralUrbanRetirementSimplifiedAnalysisUseCase: DownloadGeneralUrbanRetirementSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementAnalysisRequestDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de aposentadoria urbana geral criada com sucesso.',
      type: CreateGeneralUrbanRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createGeneralUrbanRetirementAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateGeneralUrbanRetirementAnalysisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar períodos da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/period',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementAnalysisPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos criados com sucesso.',
      type: CreateGeneralUrbanRetirementAnalysisPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createGeneralUrbanRetirementAnalysisPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Body() dto: CreateGeneralUrbanRetirementAnalysisPeriodRequestDto,
  ): Promise<CreateGeneralUrbanRetirementAnalysisPeriodResponseDto> {
    return await this.createGeneralUrbanRetirementAnalysisPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar remunerações da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/remuneration',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementAnalysisRemunerationRequestDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateGeneralUrbanRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createGeneralUrbanRetirementAnalysisRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Body() dto: CreateGeneralUrbanRetirementAnalysisRemunerationRequestDto,
  ): Promise<CreateGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
    return await this.createGeneralUrbanRetirementAnalysisRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar períodos da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/period',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateGeneralUrbanRetirementAnalysisPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Body() dto: UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisPeriodResponseDto> {
    return await this.updateGeneralUrbanRetirementAnalysisPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar remunerações da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementAnalysisRemunerationRequestDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateGeneralUrbanRetirementAnalysisRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Body() dto: UpdateGeneralUrbanRetirementAnalysisRemunerationRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
    return await this.updateGeneralUrbanRetirementAnalysisRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de aposentadoria urbana geral por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da análise de aposentadoria urbana geral retornados com sucesso.',
      type: GetGeneralUrbanRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getGeneralUrbanRetirementAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisResponseDto> {
    return await this.getGeneralUrbanRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar remunerações da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: ':generalUrbanRetirementAnalysisId/remuneration',
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Remunerações da análise de aposentadoria urbana geral listadas com sucesso.',
      type: ListGeneralUrbanRetirementAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listGeneralUrbanRetirementAnalysisRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Query() dto: ListGeneralUrbanRetirementAnalysisRemunerationRequestDto,
  ): Promise<ListGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
    return await this.listGeneralUrbanRetirementAnalysisRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter cálculo de remunerações da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: ':generalUrbanRetirementAnalysisId/remuneration-calculation',
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Cálculo de remunerações (totais, médias, EC 103 e Pré-EC 103) retornado com sucesso.',
      type: GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getGeneralUrbanRetirementAnalysisRemunerationCalculation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto> {
    return await this.getGeneralUrbanRetirementAnalysisRemunerationCalculationUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.PATCH,
      path: ':generalUrbanRetirementAnalysisId',
      type: UpdateGeneralUrbanRetirementAnalysisRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de aposentadoria urbana geral atualizada com sucesso.',
      type: UpdateGeneralUrbanRetirementAnalysisResponseDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateGeneralUrbanRetirementAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Body() dto: UpdateGeneralUrbanRetirementAnalysisRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisResponseDto> {
    return await this.updateGeneralUrbanRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: ':generalUrbanRetirementAnalysisId/result',
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise de aposentadoria urbana geral criado com sucesso.',
      type: CreateGeneralUrbanRetirementAnalysisResultResponseDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createGeneralUrbanRetirementAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
  ): Promise<CreateGeneralUrbanRetirementAnalysisResultResponseDto> {
    return await this.createGeneralUrbanRetirementAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de aposentadoria urbana geral retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadGeneralUrbanRetirementCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de aposentadoria urbana geral retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadGeneralUrbanRetirementSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementAnalysisId',
      new ParseValueObjectPipe(GeneralUrbanRetirementAnalysisId),
    )
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar documentos PDF por IA (revisão ente federativa ou carta de concessão)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: 'document-analysis',
      type: AnalyzeGeneralUrbanRetirementDocumentsRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise dos documentos retornada com sucesso. Use benefitType FEDERATIVE_ENTITY_REVIEW para análise de indeferimento administrativo ou BENEFIT_GRANTED_REVIEW para análise de carta de concessão.',
      type: AnalyzeGeneralUrbanRetirementDocumentsResponseDto,
    },
    tag: ['analise-aposentadoria-urbana-geral'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeGeneralUrbanRetirementDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementDocumentsRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementDocumentsResponseDto> {
    return await this.analyzeGeneralUrbanRetirementDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
