import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/create-legal-pleading.request.dto';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { CreateLegalPleadingDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-document-analysis.response.dto';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-result.response.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading.response.dto';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { GetLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/get-legal-pleading.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { ListAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-record.response.dto';
import { ListCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/list-cnis-fast-analysis.response.dto';
import { ListLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/list-legal-pleading.response.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/list-cnis-fast-analysis.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool')
export class AnalysisToolController {
  protected readonly _type = AnalysisToolController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
    private readonly listCnisFastAnalysisUseCase: ListCnisFastAnalysisUseCase,
    private readonly listAnalysisToolClientUseCase: ListAnalysisToolClientUseCase,
    private readonly createAnalysisToolClientUseCase: CreateAnalysisToolClientUseCase,
    private readonly deleteAnalysisToolClientUseCase: DeleteAnalysisToolClientUseCase,
    private readonly createLegalPleadingUseCase: CreateLegalPleadingUseCase,
    private readonly downloadCnisCompleteAnalysisUseCase: DownloadCnisCompleteAnalysisUseCase,
    private readonly downloadCnisSimplifiedAnalysisUseCase: DownloadCnisSimplifiedAnalysisUseCase,
    private readonly createLegalPleadingResultUseCase: CreateLegalPleadingResultUseCase,
    private readonly listAnalysisToolRecordUseCase: ListAnalysisToolRecordUseCase,
    private readonly getLegalPleadingUseCase: GetLegalPleadingUseCase,
    private readonly listLegalPleadingUseCase: ListLegalPleadingUseCase,
    private readonly createLegalPleadingDocumentAnalysisUseCase: CreateLegalPleadingDocumentAnalysisUseCase,
    private readonly downloadLegalPleadingSimplifiedAnalysisUseCase: DownloadLegalPleadingSimplifiedAnalysisUseCase,
    private readonly downloadLegalPleadingCompleteAnalysisUseCase: DownloadLegalPleadingCompleteAnalysisUseCase,
    private readonly updateLegalPleadingCompleteAnalysisUseCase: UpdateLegalPleadingCompleteAnalysisUseCase,
    private readonly updateAnalysisToolClientUseCase: UpdateAnalysisToolClientUseCase,
    private readonly getAnalysisToolClientUseCase: GetAnalysisToolClientUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros de análises',
    http: {
      path: 'analysis-tool-record',
      method: RequestMethod.GET,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de registros de análises retornada com sucesso.',
      type: ListAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListAnalysisToolRecordRequestDto,
  ): Promise<ListAnalysisToolRecordResponseDto> {
    return await this.listAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar clientes da análise',
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de clientes da análise retornada com sucesso.',
      type: ListAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    return await this.listAnalysisToolClientUseCase.execute(
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar cliente da análise',
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.POST,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente da análise criado com sucesso.',
      type: CreateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAnalysisToolClientRequestDto,
  ): Promise<CreateAnalysisToolClientResponseDto> {
    return await this.createAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar cliente da análise',
    http: {
      path: ':analysisToolClientId',
      method: RequestMethod.PATCH,
      type: UpdateAnalysisToolClientRequestDto,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente atualizado com sucesso.',
      type: UpdateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
    @Body() dto: UpdateAnalysisToolClientRequestDto,
  ): Promise<UpdateAnalysisToolClientResponseDto> {
    return await this.updateAnalysisToolClientUseCase.execute(
      analysisToolClientId,
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter cliente da análise por ID',
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do cliente da análise retornados com sucesso.',
      type: GetAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientResponseDto> {
    return await this.getAnalysisToolClientUseCase.execute(
      organizationSessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar peças processuais',
    http: {
      path: 'legal-pleading',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de peças processuais retornada com sucesso.',
      type: ListLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalPleadingRequestDto,
  ): Promise<ListLegalPleadingResponseDto> {
    return await this.listLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar peça processual',
    http: {
      path: 'legal-pleading',
      method: RequestMethod.POST,
      type: CreateLegalPleadingRequestDto,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Peça processual criada com sucesso.',
      type: CreateLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateLegalPleadingRequestDto,
  ): Promise<CreateLegalPleadingResponseDto> {
    return await this.createLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da peça processual',
    http: {
      path: 'legal-pleading/:legalPleadingId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdateLegalPleadingCompleteAnalysisRequestDto,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise completa da peça processual atualizada com sucesso.',
      type: UpdateLegalPleadingCompleteAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalPleadingCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Body() dto: UpdateLegalPleadingCompleteAnalysisRequestDto,
  ): Promise<UpdateLegalPleadingCompleteAnalysisResponseDto> {
    return await this.updateLegalPleadingCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da peça processual',
    http: {
      path: 'legal-pleading/:legalPleadingId/result',
      method: RequestMethod.POST,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da peça processual criado com sucesso.',
      type: CreateLegalPleadingResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleadingResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingResultResponseDto> {
    return await this.createLegalPleadingResultUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de documento da peça processual',
    http: {
      path: 'legal-pleading/:legalPleadingId/document-analysis',
      method: RequestMethod.POST,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de documento da peça processual criada com sucesso.',
      type: CreateLegalPleadingDocumentAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleadingDocumentAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingDocumentAnalysisResponseDto> {
    return await this.createLegalPleadingDocumentAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter peça processual por ID',
    http: {
      path: 'legal-pleading/:legalPleadingId',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da peça processual retornados com sucesso.',
      type: GetLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalPleading(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<GetLegalPleadingResponseDto> {
    return await this.getLegalPleadingUseCase.execute(
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise rápida de CNIS',
    http: {
      path: 'cnis-fast-analysis',
      method: RequestMethod.POST,
      type: CreateCnisFastAnalysisRequestDto,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise rápida de CNIS criada com sucesso.',
      type: CreateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    return await this.createCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise rápida de CNIS',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateCnisFastAnalysisRequestDto,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise rápida de CNIS atualizada com sucesso.',
      type: UpdateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Body()
    dto: UpdateCnisFastAnalysisRequestDto,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
    return await this.updateCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover cliente da análise',
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.DELETE,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cliente da análise removido com sucesso.',
      type: DeleteAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async removeAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    return await this.deleteAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise rápida de CNIS por ID',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da análise rápida de CNIS retornados com sucesso.',
      type: GetCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<GetCnisFastAnalysisResponseDto> {
    return await this.getCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de CNIS simplificada',
    http: {
      path: '/cnis-fast-analysis/:cnisFastAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de CNIS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCnisSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadCnisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de CNIS completa',
    http: {
      path: '/cnis-fast-analysis/:cnisFastAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de CNIS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCnisCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadCnisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de Peça Processual simplificada',
    http: {
      path: 'legal-pleading/:legalPleadingId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de peça processual retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadLegalPleadingSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadLegalPleadingSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de Peça Processual completa',
    http: {
      path: 'legal-pleading/:legalPleadingId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de peça processual retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadLegalPleadingCompleteAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadLegalPleadingCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar análises rápidas de CNIS',
    http: {
      path: 'cnis-fast-analysis',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de análises rápidas de CNIS retornada com sucesso.',
      type: ListCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCnisFastAnalysisResponseDto> {
    return await this.listCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise rápida de CNIS',
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise rápida de CNIS criado com sucesso.',
      type: CreateCnisFastAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    return await this.createCnisFastAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }
}
