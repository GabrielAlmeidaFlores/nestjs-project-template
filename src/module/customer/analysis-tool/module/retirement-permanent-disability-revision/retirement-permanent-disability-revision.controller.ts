import {
  RequestMethod,
  HttpStatus,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/create-retirement-permanent-disability-revision-work-periods.request.dto';
import { CreateRetirementPermanentDisabilityRevisionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/create-retirement-permanent-disability-revision.request.dto';
import { ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/resolve-retirement-permanent-disability-revision-concession-letter-breakdown-pendency.request.dto';
import { ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/resolve-retirement-permanent-disability-revision-work-periods-pendency.request.dto';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/retirement-permanent-disability-revision-disability-analysis.request.dto';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/update-retirement-permanent-disability-revision-work-periods.request.dto';
import { UpdateRetirementPermanentDisabilityRevisionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/update-retirement-permanent-disability-revision.request.dto';
import { UploadRetirementPermanentDisabilityRevisionDocumentsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/upload-retirement-permanent-disability-revision-document.request.dto';
import { CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-first-analysis.response.dto';
import { CreateRetirementPermanentDisabilityRevisionResultResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-result.response.dto';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision-work-periods.response.dto';
import { CreateRetirementPermanentDisabilityRevisionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/create-retirement-permanent-disability-revision.response.dto';
import { GetRetirementPermanentDisabilityRevisionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/get-retirement-permanent-disability-revision.response.dto';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/retirement-permanent-disability-revision-disability-analysis.response.dto';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/update-retirement-permanent-disability-revision-work-periods.response.dto';
import { UpdateRetirementPermanentDisabilityRevisionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/update-retirement-permanent-disability-revision.response.dto';
import { UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/upload-retirement-permanent-disability-revision-document.response.dto';
import { CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-first-analysis.use-case';
import { CreateRetirementPermanentDisabilityRevisionResultUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-result.use-case';
import { CreateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision-work-periods.use-case';
import { CreateRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/create-retirement-permanent-disability-revision.use-case';
import { DisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/disability-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/download-retirement-permanent-disability-revision-complete-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/download-retirement-permanent-disability-revision-simplified-analysis.use-case';
import { GetRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/get-retirement-permanent-disability-revision.use-case';
import { ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/resolve-retirement-permanent-disability-revision-concession-letter-breakdown-pendency.use-case';
import { ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/resolve-retirement-permanent-disability-revision-work-periods-pendency.use-case';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/update-retirement-permanent-disability-revision-work-periods.use-case';
import { UpdateRetirementPermanentDisabilityRevisionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/update-retirement-permanent-disability-revision.use-case';
import { UploadRetirementPermanentDisabilityRevisionDocumentsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/use-case/upload-retirement-permanent-disability-revision-documents.use-case';
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
  'analysis-tool/retirement-permanent-disability-revision',
)
export class RetirementPermanentDisabilityRevisionController {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionController.name;

  public constructor(
    private readonly createRetirementPermanentDisabilityRevisionUseCase: CreateRetirementPermanentDisabilityRevisionUseCase,
    private readonly createRetirementPermanentDisabilityRevisionResultUseCase: CreateRetirementPermanentDisabilityRevisionResultUseCase,
    private readonly createRetirementPermanentDisabilityRevisionFirstAnalysisUseCase: CreateRetirementPermanentDisabilityRevisionFirstAnalysisUseCase,
    private readonly getRetirementPermanentDisabilityRevisionUseCase: GetRetirementPermanentDisabilityRevisionUseCase,
    private readonly updateRetirementPermanentDisabilityRevisionUseCase: UpdateRetirementPermanentDisabilityRevisionUseCase,
    private readonly downloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase: DownloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase,
    private readonly downloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase: DownloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase,
    private readonly uploadRetirementPermanentDisabilityRevisionDocumentsUseCase: UploadRetirementPermanentDisabilityRevisionDocumentsUseCase,
    private readonly disabilityAnalysisUseCase: DisabilityAnalysisUseCase,
    private readonly createRetirementPermanentDisabilityRevisionWorkPeriodsUseCase: CreateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase,
    private readonly updateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase: UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase,
    private readonly resolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase: ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase,
    private readonly resolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase: ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRetirementPermanentDisabilityRevisionRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Revisão de aposentadoria por invalidez permanente criada com sucesso.',
      type: CreateRetirementPermanentDisabilityRevisionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPermanentDisabilityRevision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRetirementPermanentDisabilityRevisionRequestDto,
  ): Promise<CreateRetirementPermanentDisabilityRevisionResponseDto> {
    return await this.createRetirementPermanentDisabilityRevisionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter revisão de aposentadoria por invalidez permanente por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da revisão de aposentadoria por invalidez permanente retornados com sucesso.',
      type: GetRetirementPermanentDisabilityRevisionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPermanentDisabilityRevision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<GetRetirementPermanentDisabilityRevisionResponseDto> {
    return await this.getRetirementPermanentDisabilityRevisionUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Upload de documentos (CNIS e cartas de concessão) para revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/document',
      method: RequestMethod.POST,
      type: UploadRetirementPermanentDisabilityRevisionDocumentsRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadRetirementPermanentDisabilityRevisionDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Body() dto: UploadRetirementPermanentDisabilityRevisionDocumentsRequestDto,
  ): Promise<UploadRetirementPermanentDisabilityRevisionDocumentsResponseDto> {
    return await this.uploadRetirementPermanentDisabilityRevisionDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPermanentDisabilityRevisionRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Revisão de aposentadoria por invalidez permanente atualizada com sucesso.',
      type: UpdateRetirementPermanentDisabilityRevisionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPermanentDisabilityRevision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateRetirementPermanentDisabilityRevisionRequestDto,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<UpdateRetirementPermanentDisabilityRevisionResponseDto> {
    return await this.updateRetirementPermanentDisabilityRevisionUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/result',
      method: RequestMethod.POST,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da revisão de aposentadoria por invalidez permanente criado com sucesso.',
      type: CreateRetirementPermanentDisabilityRevisionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPermanentDisabilityRevisionResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<CreateRetirementPermanentDisabilityRevisionResultResponseDto> {
    return await this.createRetirementPermanentDisabilityRevisionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada da revisão de aposentadoria por invalidez permanente retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadRetirementPermanentDisabilityRevisionSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadRetirementPermanentDisabilityRevisionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/download-complete',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa da revisão de aposentadoria por invalidez permanente retornado para download.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadRetirementPermanentDisabilityRevisionCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadRetirementPermanentDisabilityRevisionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Registrar análise de incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/disability-analysis',
      method: RequestMethod.POST,
      type: RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Dados de incapacidade registrados com sucesso.',
      type: RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async disabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Body()
    dto: RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto,
  ): Promise<RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto> {
    return await this.disabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Executar primeira análise da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Primeira análise da revisão de aposentadoria por invalidez permanente executada com sucesso.',
      type: CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPermanentDisabilityRevisionFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): Promise<CreateRetirementPermanentDisabilityRevisionFirstAnalysisResponseDto> {
    return await this.createRetirementPermanentDisabilityRevisionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar períodos trabalhados da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/work-periods',
      method: RequestMethod.POST,
      type: CreateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Períodos trabalhados da revisão de aposentadoria por invalidez permanente criados com sucesso.',
      type: CreateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPermanentDisabilityRevisionWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Body()
    dto: CreateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto,
  ): Promise<CreateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto> {
    return await this.createRetirementPermanentDisabilityRevisionWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar períodos trabalhados da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/work-periods',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Períodos trabalhados da revisão de aposentadoria por invalidez permanente atualizados com sucesso.',
      type: UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPermanentDisabilityRevisionWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Body()
    dto: UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto,
  ): Promise<UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto> {
    return await this.updateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRevisionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Resolver pendência do detalhamento da carta de concessão da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/concession-letter-breakdown/:retirementPermanentDisabilityRevisionConcessionLetterBreakdownId/resolve-pendency',
      method: RequestMethod.PATCH,
      type: ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description:
        'Pendência do detalhamento da carta de concessão resolvida com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async resolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendency(
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    _retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Param(
      'retirementPermanentDisabilityRevisionConcessionLetterBreakdownId',
      new ParseValueObjectPipe(
        RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
      ),
    )
    retirementPermanentDisabilityRevisionConcessionLetterBreakdownId: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    @Body()
    dto: ResolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyRequestDto,
  ): Promise<void> {
    await this.resolveRetirementPermanentDisabilityRevisionConcessionLetterBreakdownPendencyUseCase.execute(
      retirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Resolver pendência de um período trabalhado da revisão de aposentadoria por invalidez permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPermanentDisabilityRevisionId/work-periods/:retirementPermanentDisabilityRevisionWorkPeriodsId/resolve-pendency',
      method: RequestMethod.PATCH,
      type: ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto,
    },
    tag: ['revisao-aposentadoria-invalidez-permanente'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Pendência do período trabalhado resolvida com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async resolveRetirementPermanentDisabilityRevisionWorkPeriodsPendency(
    @Param(
      'retirementPermanentDisabilityRevisionId',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRevisionId),
    )
    _retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    @Param(
      'retirementPermanentDisabilityRevisionWorkPeriodsId',
      new ParseValueObjectPipe(
        RetirementPermanentDisabilityRevisionWorkPeriodsId,
      ),
    )
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    @Body()
    dto: ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto,
  ): Promise<void> {
    await this.resolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase.execute(
      _retirementPermanentDisabilityRevisionId,
      retirementPermanentDisabilityRevisionWorkPeriodsId,
      dto,
    );
  }
}
