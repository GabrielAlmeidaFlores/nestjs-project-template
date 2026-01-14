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
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AnalyzeCnisDocumentRequestDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/request/analyze-cnis-document.request.dto';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/request/create-cnis-fast-analysis.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/request/update-cnis-fast-analysis.request.dto';
import { AnalyzeCnisDocumentResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/analyze-cnis-document.response.dto';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/create-cnis-fast-analysis.response.dto';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/get-cnis-fast-analysis.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/module/cnis-fast-analysis/dto/response/update-cnis-fast-analysis.response.dto';
import { AnalyzeCnisDocumentUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/analyze-cnis-document.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/create-cnis-fast-analysis.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/download-cnis-simplified-analysis.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/get-cnis-fast-analysis.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/module/cnis-fast-analysis/use-case/update-cnis-fast-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/cnis-fast-analysis')
export class CnisFastAnalysisController {
  protected readonly _type = CnisFastAnalysisController.name;

  public constructor(
    private readonly analyzeCnisDocumentUseCase: AnalyzeCnisDocumentUseCase,
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
    private readonly downloadCnisCompleteAnalysisUseCase: DownloadCnisCompleteAnalysisUseCase,
    private readonly downloadCnisSimplifiedAnalysisUseCase: DownloadCnisSimplifiedAnalysisUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':cnisFastAnalysisId',
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
    summary: 'Analisar documento CNIS sem salvar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze',
      method: RequestMethod.POST,
      type: AnalyzeCnisDocumentRequestDto,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise do CNIS realizada com sucesso.',
      type: AnalyzeCnisDocumentResponseDto,
    },
  })
  public async analyzeCnisDocument(
    @Body() dto: AnalyzeCnisDocumentRequestDto,
  ): Promise<AnalyzeCnisDocumentResponseDto> {
    return await this.analyzeCnisDocumentUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
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
    summary: 'Obter análise rápida de CNIS por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':cnisFastAnalysisId',
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
      path: ':cnisFastAnalysisId/download/simplified-version',
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
      path: ':cnisFastAnalysisId/download/complete-version',
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
    summary: 'Criar resultado da análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':cnisFastAnalysisId/result',
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
