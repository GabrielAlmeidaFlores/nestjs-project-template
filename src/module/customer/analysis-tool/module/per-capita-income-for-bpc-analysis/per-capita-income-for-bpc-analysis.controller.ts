import {
  Body,
  HttpStatus,
  Param,
  Query,
  ParseEnumPipe,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis-family-member.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis.request.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/update-per-capita-income-for-bpc-analysis-family-member.request.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/update-per-capita-income-for-bpc-analysis.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-family-member.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis-result.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis.response.dto';
import { GetPerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/get-per-capita-income-for-bpc-analysis.response.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/update-per-capita-income-for-bpc-analysis-family-member.response.dto';
import { UpdatePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/update-per-capita-income-for-bpc-analysis.response.dto';
import { CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-family-member.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisResultUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis-result.use-case';
import { CreatePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/create-per-capita-income-for-bpc-analysis.use-case';
import { DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/download-per-capita-income-for-bpc-complete-analysis.use-case';
import { DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/download-per-capita-income-for-bpc-simplified-analysis.use-case';
import { GetPerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/get-per-capita-income-for-bpc-analysis.use-case';
import { UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/update-per-capita-income-for-bpc-analysis-family-member.use-case';
import { UpdatePerCapitaIncomeForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/use-case/update-per-capita-income-for-bpc-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/per-capita-income-for-bpc-analysis')
export class PerCapitaIncomeForBpcAnalysisController {
  protected readonly _type = PerCapitaIncomeForBpcAnalysisController.name;

  public constructor(
    private readonly createPerCapitaIncomeForBpcAnalysisUseCase: CreatePerCapitaIncomeForBpcAnalysisUseCase,
    private readonly createPerCapitaIncomeForBpcAnalysisFamilyMemberUseCase: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
    private readonly createPerCapitaIncomeForBpcAnalysisResultUseCase: CreatePerCapitaIncomeForBpcAnalysisResultUseCase,
    private readonly getPerCapitaIncomeForBpcAnalysisUseCase: GetPerCapitaIncomeForBpcAnalysisUseCase,
    private readonly updatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase,
    private readonly updatePerCapitaIncomeForBpcAnalysisUseCase: UpdatePerCapitaIncomeForBpcAnalysisUseCase,
    private readonly downloadPerCapitaIncomeForBpcCompleteAnalysisUseCase: DownloadPerCapitaIncomeForBpcCompleteAnalysisUseCase,
    private readonly downloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase: DownloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreatePerCapitaIncomeForBpcAnalysisRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de renda per capita para BPC criada com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar membros da família para análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/family-member',
      method: RequestMethod.POST,
      type: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Membros da família criados com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysisFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Body() dto: CreatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise criado com sucesso.',
      type: CreatePerCapitaIncomeForBpcAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPerCapitaIncomeForBpcAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResultResponseDto> {
    return await this.createPerCapitaIncomeForBpcAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de renda per capita para BPC simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':perCapitaIncomeForBpcAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de renda per capita para BPC retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadPerCapitaIncomeForBpcSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadPerCapitaIncomeForBpcSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de renda per capita para BPC completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':perCapitaIncomeForBpcAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de renda per capita para BPC retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadPerCapitaIncomeForBpcCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadPerCapitaIncomeForBpcCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar membros da família para análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId/family-member',
      method: RequestMethod.PATCH,
      type: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Membros da família atualizados com sucesso.',
      type: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePerCapitaIncomeForBpcAnalysisFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Body() dto: UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberRequestDto,
  ): Promise<UpdatePerCapitaIncomeForBpcAnalysisFamilyMemberResponseDto> {
    return await this.updatePerCapitaIncomeForBpcAnalysisFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de renda per capita para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdatePerCapitaIncomeForBpcAnalysisRequestDto,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de renda per capita para BPC atualizada com sucesso.',
      type: UpdatePerCapitaIncomeForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePerCapitaIncomeForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    @Body() dto: UpdatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<UpdatePerCapitaIncomeForBpcAnalysisResponseDto> {
    return await this.updatePerCapitaIncomeForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Buscar análise de renda per capita para BPC por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/:perCapitaIncomeForBpcAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-de-renda-per-capita-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de renda per capita para BPC encontrada com sucesso.',
      type: GetPerCapitaIncomeForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPerCapitaIncomeForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'perCapitaIncomeForBpcAnalysisId',
      new ParseValueObjectPipe(PerCapitaIncomeForBpcAnalysisId),
    )
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<GetPerCapitaIncomeForBpcAnalysisResponseDto> {
    return await this.getPerCapitaIncomeForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      perCapitaIncomeForBpcAnalysisId,
    );
  }
}
