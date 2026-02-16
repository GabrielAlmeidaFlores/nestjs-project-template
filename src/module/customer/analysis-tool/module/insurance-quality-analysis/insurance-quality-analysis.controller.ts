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
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { CreateInsuranceQualityAnalysisRequestDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/request/create-insurance-quality-analysis.request.dto';
import { UpdateInsuranceQualityAnalysisRequestDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/request/update-insurance-quality-analysis.request.dto';
import { CreateInsuranceQualityAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/create-insurance-quality-analysis-result.response.dto';
import { CreateInsuranceQualityAnalysisResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/create-insurance-quality-analysis.response.dto';
import { GetInsuranceQualityAnalysisResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/get-insurance-quality-analysis.response.dto';
import { UpdateInsuranceQualityAnalysisResponseDto } from '@module/customer/analysis-tool/module/insurance-quality-analysis/dto/response/update-insurance-quality-analysis.response.dto';
import { CreateInsuranceQualityAnalysisResultUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/create-insurance-quality-analysis-result.use-case';
import { CreateInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/create-insurance-quality-analysis.use-case';
import { DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/download-insurance-quality-analysis-complete-analysis.use-case';
import { DownloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/download-insurance-quality-analysis-simplified-analysis.use-case';
import { GetInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/get-insurance-quality-analysis.use-case';
import { UpdateInsuranceQualityAnalysisUseCase } from '@module/customer/analysis-tool/module/insurance-quality-analysis/use-case/update-insurance-quality-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/insurance-quality-analysis')
export class InsuranceQualityAnalysisController {
  protected readonly _type = InsuranceQualityAnalysisController.name;

  public constructor(
    private readonly createInsuranceQualityAnalysisUseCase: CreateInsuranceQualityAnalysisUseCase,
    private readonly updateInsuranceQualityAnalysisUseCase: UpdateInsuranceQualityAnalysisUseCase,
    private readonly getInsuranceQualityAnalysisUseCase: GetInsuranceQualityAnalysisUseCase,
    private readonly createInsuranceQualityAnalysisResultUseCase: CreateInsuranceQualityAnalysisResultUseCase,
    private readonly downloadInsuranceQualityAnalysisCompleteAnalysisUseCase: DownloadInsuranceQualityAnalysisCompleteAnalysisUseCase,
    private readonly downloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase: DownloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de qualidade de segurado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateInsuranceQualityAnalysisRequestDto,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de qualidade de segurado criada com sucesso.',
      type: CreateInsuranceQualityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuranceQualityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateInsuranceQualityAnalysisRequestDto,
  ): Promise<CreateInsuranceQualityAnalysisResponseDto> {
    return await this.createInsuranceQualityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de qualidade de segurado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':insuranceQualityAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateInsuranceQualityAnalysisRequestDto,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de qualidade de segurado atualizada com sucesso.',
      type: UpdateInsuranceQualityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuranceQualityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateInsuranceQualityAnalysisRequestDto,
    @Param(
      'insuranceQualityAnalysisId',
      new ParseValueObjectPipe(InsuranceQualityAnalysisId),
    )
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
  ): Promise<UpdateInsuranceQualityAnalysisResponseDto> {
    return await this.updateInsuranceQualityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      insuranceQualityAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de qualidade de segurado por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':insuranceQualityAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da análise retornados com sucesso.',
      type: GetInsuranceQualityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getInsuranceQualityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'insuranceQualityAnalysisId',
      new ParseValueObjectPipe(InsuranceQualityAnalysisId),
    )
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
  ): Promise<GetInsuranceQualityAnalysisResponseDto> {
    return await this.getInsuranceQualityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      insuranceQualityAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de qualidade de segurado simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':insuranceQualityAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadInsuranceQualityAnalysisSimplifiedById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'insuranceQualityAnalysisId',
      new ParseValueObjectPipe(InsuranceQualityAnalysisId),
    )
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadInsuranceQualityAnalysisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      insuranceQualityAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de qualidade de segurado completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':insuranceQualityAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadInsuranceQualityAnalysisCompletedById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'insuranceQualityAnalysisId',
      new ParseValueObjectPipe(InsuranceQualityAnalysisId),
    )
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadInsuranceQualityAnalysisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      insuranceQualityAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de qualidade de segurado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':insuranceQualityAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-qualidade-segurado'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise criado com sucesso.',
      type: CreateInsuranceQualityAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuranceQualityAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'insuranceQualityAnalysisId',
      new ParseValueObjectPipe(InsuranceQualityAnalysisId),
    )
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
  ): Promise<CreateInsuranceQualityAnalysisResultResponseDto> {
    return await this.createInsuranceQualityAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      insuranceQualityAnalysisId,
    );
  }
}
