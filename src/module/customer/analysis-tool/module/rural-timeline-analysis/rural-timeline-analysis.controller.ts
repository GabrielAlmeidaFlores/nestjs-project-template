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
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import { AddRuralTimelineAnalysisCnisDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-cnis-document.request.dto';
import { AddRuralTimelineAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/add-rural-timeline-analysis-period-document.request.dto';
import { CreateRuralTimelineAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis.request.dto';
import { GetRuralTimelineCnisAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/get-rural-timeline-cnis-analysis.request.dto';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { AddRuralTimelineAnalysisCnisDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-cnis-document.response.dto';
import { AddRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/add-rural-timeline-analysis-period-document.response.dto';
import { AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/analyze-rural-timeline-analysis-period-document.response.dto';
import { CreateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis.response.dto';
import { DeleteRuralTimelineAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/delete-rural-timeline-analysis-period-document.response.dto';
import { GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-analysis-period-document-analysis.response.dto';
import { GenerateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-analysis.response.dto';
import { GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/generate-rural-timeline-consolidated-document-analysis.response.dto';
import { GetRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-analysis.response.dto';
import { GetRuralTimelineCnisAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-cnis-analysis.response.dto';
import { ListRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/list-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { AddRuralTimelineAnalysisCnisDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-cnis-document.use-case';
import { AddRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/add-rural-timeline-analysis-period-document.use-case';
import { AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/analyze-rural-timeline-analysis-period-document.use-case';
import { CreateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/create-rural-timeline-analysis.use-case';
import { DeleteRuralTimelineAnalysisPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/delete-rural-timeline-analysis-period-document.use-case';
import { DownloadRuralTimelineCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/download-rural-timeline-complete-analysis.use-case';
import { DownloadRuralTimelineSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/download-rural-timeline-simplified-analysis.use-case';
import { GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-analysis-period-document-analysis.use-case';
import { GenerateRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-analysis.use-case';
import { GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/generate-rural-timeline-consolidated-document-analysis.use-case';
import { GetRuralTimelineAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-analysis.use-case';
import { GetRuralTimelineCnisAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/get-rural-timeline-cnis-analysis.use-case';
import { ListRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/list-rural-timeline-analysis-cnis-contribution-period.use-case';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/update-rural-timeline-analysis-cnis-contribution-period.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool/rural-timeline-analysis')
export class RuralTimelineAnalysisController {
  protected readonly _type = RuralTimelineAnalysisController.name;

  public constructor(
    private readonly createRuralTimelineAnalysisUseCase: CreateRuralTimelineAnalysisUseCase,
    private readonly getRuralTimelineAnalysisUseCase: GetRuralTimelineAnalysisUseCase,
    private readonly getRuralTimelineCnisAnalysisUseCase: GetRuralTimelineCnisAnalysisUseCase,
    private readonly generateRuralTimelineAnalysisUseCase: GenerateRuralTimelineAnalysisUseCase,
    private readonly downloadRuralTimelineCompleteAnalysisUseCase: DownloadRuralTimelineCompleteAnalysisUseCase,
    private readonly downloadRuralTimelineSimplifiedAnalysisUseCase: DownloadRuralTimelineSimplifiedAnalysisUseCase,
    private readonly addRuralTimelineAnalysisCnisDocumentUseCase: AddRuralTimelineAnalysisCnisDocumentUseCase,
    private readonly addRuralTimelineAnalysisPeriodDocumentUseCase: AddRuralTimelineAnalysisPeriodDocumentUseCase,
    private readonly analyzeRuralTimelineAnalysisPeriodDocumentUseCase: AnalyzeRuralTimelineAnalysisPeriodDocumentUseCase,
    private readonly generateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase: GenerateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase,
    private readonly generateRuralTimelineConsolidatedDocumentAnalysisUseCase: GenerateRuralTimelineConsolidatedDocumentAnalysisUseCase,
    private readonly deleteRuralTimelineAnalysisPeriodDocumentUseCase: DeleteRuralTimelineAnalysisPeriodDocumentUseCase,
    private readonly listRuralTimelineAnalysisCnisContributionPeriodUseCase: ListRuralTimelineAnalysisCnisContributionPeriodUseCase,
    private readonly updateRuralTimelineAnalysisCnisContributionPeriodUseCase: UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRuralTimelineAnalysisRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de linha do tempo rural criada com sucesso.',
      type: CreateRuralTimelineAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRuralTimelineAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRuralTimelineAnalysisRequestDto,
  ): Promise<CreateRuralTimelineAnalysisResponseDto> {
    return await this.createRuralTimelineAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes da análise de linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Detalhes da análise de linha do tempo rural obtidos com sucesso.',
      type: GetRuralTimelineAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRuralTimelineAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisResponseDto> {
    return await this.getRuralTimelineAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise CNIS da linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/cnis-analysis',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise CNIS da linha do tempo rural obtida com sucesso.',
      type: GetRuralTimelineCnisAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRuralTimelineCnisAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Query() dto: GetRuralTimelineCnisAnalysisRequestDto,
  ): Promise<GetRuralTimelineCnisAnalysisResponseDto> {
    return await this.getRuralTimelineCnisAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise de IA da linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/generate-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de IA da linha do tempo rural gerada com sucesso.',
      type: GenerateRuralTimelineAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async generateRuralTimelineAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GenerateRuralTimelineAnalysisResponseDto> {
    return await this.generateRuralTimelineAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise consolidada de todos os documentos dos períodos',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/generate-consolidated-document-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise consolidada de todos os documentos dos períodos gerada com sucesso.',
      type: GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async generateRuralTimelineConsolidatedDocumentAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
  ): Promise<GenerateRuralTimelineConsolidatedDocumentAnalysisResponseDto> {
    return await this.generateRuralTimelineConsolidatedDocumentAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa da linha do tempo rural retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadRuralTimelineCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadRuralTimelineCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada da linha do tempo rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada da linha do tempo rural retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadRuralTimelineSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadRuralTimelineSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Anexar documento CNIS à análise rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/cnis-document',
      method: RequestMethod.POST,
      type: AddRuralTimelineAnalysisCnisDocumentRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documento CNIS anexado com sucesso.',
      type: AddRuralTimelineAnalysisCnisDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async addRuralTimelineAnalysisCnisDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Body() dto: AddRuralTimelineAnalysisCnisDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisCnisDocumentResponseDto> {
    return await this.addRuralTimelineAnalysisCnisDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar períodos de contribuição CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/cnis-contribution-period',
      method: RequestMethod.GET,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de períodos de contribuição CNIS retornada com sucesso.',
      type: ListRuralTimelineAnalysisCnisContributionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRuralTimelineAnalysisCnisContributionPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    return await this.listRuralTimelineAnalysisCnisContributionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de contribuição CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/cnis-contribution-period/:contributionPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de contribuição CNIS atualizado com sucesso.',
      type: UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRuralTimelineAnalysisCnisContributionPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'contributionPeriodId',
      new ParseValueObjectPipe(RuralTimelineAnalysisCnisContributionPeriodId),
    )
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    @Body() dto: UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    return await this.updateRuralTimelineAnalysisCnisContributionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      contributionPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar documento a um período rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/document',
      method: RequestMethod.POST,
      type: AddRuralTimelineAnalysisPeriodDocumentRequestDto,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documento adicionado ao período rural com sucesso.',
      type: AddRuralTimelineAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async addRuralTimelineAnalysisPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodId),
    )
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
    @Body() dto: AddRuralTimelineAnalysisPeriodDocumentRequestDto,
  ): Promise<AddRuralTimelineAnalysisPeriodDocumentResponseDto> {
    return await this.addRuralTimelineAnalysisPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos não analisados de um período rural com IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/analyze',
      method: RequestMethod.POST,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos analisados com sucesso pela IA.',
      type: AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeRuralTimelineAnalysisPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodId),
    )
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
  ): Promise<AnalyzeRuralTimelineAnalysisPeriodDocumentResponseDto> {
    return await this.analyzeRuralTimelineAnalysisPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise consolidada dos documentos do período rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/generate-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise consolidada dos documentos do período gerada com sucesso.',
      type: GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async generateRuralTimelineAnalysisPeriodDocumentAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodId),
    )
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
  ): Promise<GenerateRuralTimelineAnalysisPeriodDocumentAnalysisResponseDto> {
    return await this.generateRuralTimelineAnalysisPeriodDocumentAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar documento de um período rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralTimelineAnalysisId/period/:ruralTimelineAnalysisPeriodId/document/:ruralTimelineAnalysisPeriodDocumentId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-linha-tempo-rural'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documento deletado do período rural com sucesso.',
      type: DeleteRuralTimelineAnalysisPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteRuralTimelineAnalysisPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralTimelineAnalysisId',
      new ParseValueObjectPipe(RuralTimelineAnalysisId),
    )
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    @Param(
      'ruralTimelineAnalysisPeriodDocumentId',
      new ParseValueObjectPipe(RuralTimelineAnalysisPeriodDocumentId),
    )
    ruralTimelineAnalysisPeriodDocumentId: RuralTimelineAnalysisPeriodDocumentId,
  ): Promise<DeleteRuralTimelineAnalysisPeriodDocumentResponseDto> {
    return await this.deleteRuralTimelineAnalysisPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralTimelineAnalysisId,
      ruralTimelineAnalysisPeriodDocumentId,
    );
  }
}
