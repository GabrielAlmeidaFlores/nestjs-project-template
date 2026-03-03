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
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { CreateLegalPleadingRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/create-legal-pleading.request.dto';
import { GetLegalPleadingStatisticsRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/get-legal-pleading-statistics.request.dto';
import { ListLegalPleadingHistoryRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/list-legal-pleading-history.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/list-legal-pleading.request.dto';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { UpdateLegalPleadingRequestDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/request/update-legal-pleading.request.dto';
import { CreateLegalPleadingDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/create-legal-pleading-document-analysis.response.dto';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/create-legal-pleading-result.response.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/create-legal-pleading.response.dto';
import { DeleteLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/delete-legal-pleading.response';
import { GetLegalPleadingStatisticsResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/get-legal-pleading-statistics.response.dto';
import { GetLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/get-legal-pleading.response.dto';
import { ListLegalPleadingHistoryResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/list-legal-pleading-history.response.dto';
import { ListLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/list-legal-pleading.response.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { UpdateLegalPleadingStatusToCompleteResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading-to-complete-status.response.dto';
import { UpdateLegalPleadingResponseDto } from '@module/customer/analysis-tool/module/legal-pleading/dto/response/update-legal-pleading.response.dto';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/create-legal-pleading.use-case';
import { DeleteLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/delete-legal-pleading.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetLegalPleadingStatisticsUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/get-legal-pleading-statistics.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/get-legal-pleading.use-case';
import { ListLegalPleadingHistoryUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/list-legal-pleading-history.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/list-legal-pleading.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateLegalPleadingUseCase } from '@module/customer/analysis-tool/module/legal-pleading/use-case/update-legal-pleading.use-case';
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

@CustomerControllerRoute('analysis-tool/legal-pleading')
export class LegalPleadingController {
  protected readonly _type = LegalPleadingController.name;

  public constructor(
    private readonly createLegalPleadingUseCase: CreateLegalPleadingUseCase,
    private readonly updateLegalPleadingUseCase: UpdateLegalPleadingUseCase,
    private readonly createLegalPleadingResultUseCase: CreateLegalPleadingResultUseCase,
    private readonly getLegalPleadingUseCase: GetLegalPleadingUseCase,
    private readonly listLegalPleadingUseCase: ListLegalPleadingUseCase,
    private readonly createLegalPleadingDocumentAnalysisUseCase: CreateLegalPleadingDocumentAnalysisUseCase,
    private readonly downloadLegalPleadingSimplifiedAnalysisUseCase: DownloadLegalPleadingSimplifiedAnalysisUseCase,
    private readonly downloadLegalPleadingCompleteAnalysisUseCase: DownloadLegalPleadingCompleteAnalysisUseCase,
    private readonly updateLegalPleadingCompleteAnalysisUseCase: UpdateLegalPleadingCompleteAnalysisUseCase,
    private readonly updateLegalPleadingToCompleteStatusUseCase: UpdateLegalPleadingStatusToCompleteUseCase,
    private readonly getLegalPleadingStatisticsUseCase: GetLegalPleadingStatisticsUseCase,
    private readonly deleteLegalPleadingUseCase: DeleteLegalPleadingUseCase,
    private readonly listLegalPleadingHistoryUseCase: ListLegalPleadingHistoryUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar peças processuais',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
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
      path: 'statistics',
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
      path: '',
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
    summary: 'Atualizar peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':legalPleadingId',
      method: RequestMethod.PATCH,
      type: UpdateLegalPleadingRequestDto,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Peça processual atualizada com sucesso.',
      type: UpdateLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Body() dto: UpdateLegalPleadingRequestDto,
  ): Promise<UpdateLegalPleadingResponseDto> {
    return await this.updateLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':legalPleadingId/complete-analysis',
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
      path: ':legalPleadingId/complete',
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
      path: ':legalPleadingId/result',
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
      path: ':legalPleadingId/document-analysis',
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
      path: ':legalPleadingId',
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
      path: ':legalPleadingId',
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
    summary: 'Listar histórico da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':legalPleadingId/history',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Histórico da peça processual retornado com sucesso.',
      type: ListLegalPleadingHistoryResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalPleadingHistory(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Query() dto: ListLegalPleadingHistoryRequestDto,
  ): Promise<ListLegalPleadingHistoryResponseDto> {
    return await this.listLegalPleadingHistoryUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de Peça Processual simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':legalPleadingId/download/simplified-version',
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
      path: ':legalPleadingId/download/complete-version',
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
}
