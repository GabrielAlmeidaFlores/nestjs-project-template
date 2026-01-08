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
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/create-legal-pleading.request.dto';
import { CreateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rpps-remuneration-request.dto';
import { CreateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rpps.request.dto';
import { GetAnalysisToolRecordStatisticsRequestDto } from '@module/customer/analysis-tool/dto/request/get-analysis-tool-record-statistics.request.dto';
import { GetLegalPleadingStatisticsRequestDto } from '@module/customer/analysis-tool/dto/request/get-legal-pleading-statistics.request.dto';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';
import { ListRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/dto/request/list-retirement-planning-rpps-remuneration.request.dto';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { UpdateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/dto/request/update-retirement-planning-rpps-remuneration.request.dto';
import { UpdateRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/dto/request/update-retirement-planning-rpps.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { CreateLegalPleadingDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-document-analysis.response.dto';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-result.response.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading.response.dto';
import { CreateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-remuneration.response.dto';
import { CreateRetirementPlanningRppsResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-result.response.dto';
import { CreateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps.response.dto';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { DeleteAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-record.response';
import { DeleteLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/delete-legal-pleading.response';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { GetAnalysisToolRecordStatisticsResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-record-statistics.response.dto';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { GetLegalPleadingStatisticsResponseDto } from '@module/customer/analysis-tool/dto/response/get-legal-pleading-statistics.response.dto';
import { GetLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/get-legal-pleading.response.dto';
import { GetRetirementPlanningRppsRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rpps-remuneration-calculation.response.dto';
import { GetRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rpps.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { ListAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-record.response.dto';
import { ListCidTenResponseDto } from '@module/customer/analysis-tool/dto/response/list-cid-ten.response.dto';
import { ListLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/list-legal-pleading.response.dto';
import { ListRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/list-retirement-planning-rpps-remuneration.response.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { UpdateLegalPleadingStatusToCompleteResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-to-complete-status.response.dto';
import { UpdateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/update-retirement-planning-rpps-remuneration.response.dto';
import { UpdateRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/dto/response/update-retirement-planning-rpps.response.dto';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { CreateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-remuneration.use-case';
import { CreateRetirementPlanningRppsResultUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps-result.use-case';
import { CreateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rpps.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/delete-legal-pleading.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetAnalysisToolRecordStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-record-statistics.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingStatisticsUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading-statistics.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { GetRetirementPlanningRppsRemunerationCalculationUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps-remuneration-calculation.use-case';
import { GetRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rpps.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/use-case/list-cid-ten.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { ListRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rpps-remuneration.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateRetirementPlanningRppsRemunerationUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps-remuneration.use-case';
import { UpdateRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rpps.use-case';
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

@CustomerControllerRoute('analysis-tool')
export class AnalysisToolController {
  protected readonly _type = AnalysisToolController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
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
    private readonly updateLegalPleadingToCompleteStatusUseCase: UpdateLegalPleadingStatusToCompleteUseCase,
    private readonly updateAnalysisToolClientUseCase: UpdateAnalysisToolClientUseCase,
    private readonly getAnalysisToolClientUseCase: GetAnalysisToolClientUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
    private readonly deleteAnalysisToolRecordUseCase: DeleteAnalysisToolRecordUseCase,
    private readonly createRetirementPlanningRppsUseCase: CreateRetirementPlanningRppsUseCase,
    private readonly createRetirementPlanningRppsRemunerationUseCase: CreateRetirementPlanningRppsRemunerationUseCase,
    private readonly createRetirementPlanningRppsResultUseCase: CreateRetirementPlanningRppsResultUseCase,
    private readonly getRetirementPlanningRppsUseCase: GetRetirementPlanningRppsUseCase,
    private readonly getRetirementPlanningRppsRemunerationCalculationUseCase: GetRetirementPlanningRppsRemunerationCalculationUseCase,
    private readonly updateRetirementPlanningRppsRemunerationUseCase: UpdateRetirementPlanningRppsRemunerationUseCase,
    private readonly listRetirementPlanningRppsRemunerationUseCase: ListRetirementPlanningRppsRemunerationUseCase,
    private readonly updateRetirementPlanningRppsUseCase: UpdateRetirementPlanningRppsUseCase,
    private readonly listCidTenUseCase: ListCidTenUseCase,
    private readonly getAnalysisToolRecordStatisticsUseCase: GetAnalysisToolRecordStatisticsUseCase,
    private readonly getLegalPleadingStatisticsUseCase: GetLegalPleadingStatisticsUseCase,
    private readonly deleteLegalPleadingUseCase: DeleteLegalPleadingUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    summary: 'Obter estatísticas de registros de análises por período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record/statistics',
      method: RequestMethod.GET,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Estatísticas retornadas com sucesso.',
      type: GetAnalysisToolRecordStatisticsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAnalysisToolRecordStatistics(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: GetAnalysisToolRecordStatisticsRequestDto,
  ): Promise<GetAnalysisToolRecordStatisticsResponseDto> {
    return await this.getAnalysisToolRecordStatisticsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record/:analysisToolRecordId',
      method: RequestMethod.DELETE,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Registro de análise deletado com sucesso.',
      type: DeleteAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolRecordId',
      new ParseValueObjectPipe(AnalysisToolRecordId),
    )
    analysisToolRecordId: AnalysisToolRecordId,
  ): Promise<DeleteAnalysisToolRecordResponseDto> {
    return await this.deleteAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolRecordId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar clientes da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    @GetSessionData()
    sessionData: SessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    return await this.listAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    @GetSessionData()
    sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientResponseDto> {
    return await this.getAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar peças processuais',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    summary: 'Obter estatísticas de peças processuais por período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/statistics',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Estatísticas retornadas com sucesso.',
      type: GetLegalPleadingStatisticsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalPleadingStatistics(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: GetLegalPleadingStatisticsRequestDto,
  ): Promise<GetLegalPleadingStatisticsResponseDto> {
    return await this.getLegalPleadingStatisticsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    summary: 'Atualizar o status da peça processual para completo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/complete',
      method: RequestMethod.PATCH,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Status de peça processual atualizado com sucesso',
      type: UpdateLegalPleadingStatusToCompleteResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalPleadingStatusToComplete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<UpdateLegalPleadingStatusToCompleteResponseDto> {
    return await this.updateLegalPleadingToCompleteStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    @GetSessionData()
    sessionData: SessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<GetLegalPleadingResponseDto> {
    return await this.getLegalPleadingUseCase.execute(
      organizationSessionData,
      legalPleadingId,
      sessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId',
      method: RequestMethod.DELETE,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Peça processual deletada com sucesso.',
      type: DeleteLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<DeleteLegalPleadingResponseDto> {
    return await this.deleteLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    @Body() dto: UpdateCnisFastAnalysisRequestDto,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
    return await this.updateCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    summary: 'Remover cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    userLevel: [UserLevelEnum.CUSTOMER],
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
    summary: 'Criar resultado da análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
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

  @BuildEndpointSpecification({
    summary: 'Criar planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rpps',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRppsRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Planejamento previdenciário RPPS criado com sucesso.',
      type: CreateRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRetirementPlanningRppsRequestDto,
  ): Promise<CreateRetirementPlanningRppsResponseDto> {
    return await this.createRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar remunerações do cliente para planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rpps/:retirementPlanningRppsId/remuneration',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRppsRemunerationRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: CreateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<CreateRetirementPlanningRppsRemunerationResponseDto> {
    return await this.createRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rpps/:retirementPlanningRppsId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPlanningRppsRemunerationRequestDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: UpdateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<UpdateRetirementPlanningRppsRemunerationResponseDto> {
    return await this.updateRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter planejamento previdenciário RPPS por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rpps/:retirementPlanningRppsId',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados do planejamento previdenciário RPPS retornados com sucesso.',
      type: GetRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsResponseDto> {
    return await this.getRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter cálculo de remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rpps/:retirementPlanningRppsId/remuneration-calculation',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cálculo de remunerações retornado com sucesso.',
      type: GetRetirementPlanningRppsRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRppsRemunerationCalculation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationCalculationResponseDto> {
    return await this.getRetirementPlanningRppsRemunerationCalculationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar remunerações do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.GET,
      path: 'retirement-planning-rpps/:retirementPlanningRppsId/remuneration',
    },
    tag: ['planejamento-previdenciario-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Remunerações do planejamento previdenciário RPPS listadas com sucesso.',
      type: ListRetirementPlanningRppsRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRetirementPlanningRppsRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Query() dto: ListRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<ListRetirementPlanningRppsRemunerationResponseDto> {
    return await this.listRetirementPlanningRppsRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.PATCH,
      path: 'retirement-planning-rpps/:retirementPlanningRppsId',
      type: UpdateRetirementPlanningRppsRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Planejamento previdenciário RPPS atualizado com sucesso.',
      type: UpdateRetirementPlanningRppsResponseDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRpps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
    @Body() dto: UpdateRetirementPlanningRppsRequestDto,
  ): Promise<UpdateRetirementPlanningRppsResponseDto> {
    return await this.updateRetirementPlanningRppsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado do planejamento previdenciário RPPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      method: RequestMethod.POST,
      path: 'retirement-planning-rpps/:retirementPlanningRppsId/result',
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do planejamento previdenciário RPPS criado com sucesso.',
      type: CreateRetirementPlanningRppsResultResponseDto,
    },
    tag: ['planejamento-previdenciario-rpps'],
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRppsResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRppsId',
      new ParseValueObjectPipe(RetirementPlanningRppsId),
    )
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<CreateRetirementPlanningRppsResultResponseDto> {
    return await this.createRetirementPlanningRppsResultUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRppsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar CID-10',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cid-ten',
      method: RequestMethod.GET,
    },
    tag: ['cid-ten'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de CID-10 retornada com sucesso.',
      type: ListCidTenResponseDto,
    },
  })
  public async listCidTen(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCidTenResponseDto> {
    return await this.listCidTenUseCase.execute(dto);
  }
}
