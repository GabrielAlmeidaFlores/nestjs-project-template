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
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { CreateDisabilityAssessmentForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/request/create-disability-assessment-for-bpc-analysis.request.dto';
import { UpdateDisabilityAssessmentForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/request/update-disability-assessment-for-bpc-analysis.request.dto';
import { CreateDisabilityAssessmentForBpcAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/create-disability-assessment-for-bpc-analysis-result.response.dto';
import { CreateDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/create-disability-assessment-for-bpc-analysis.response.dto';
import { GetDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/get-disability-assessment-for-bpc-analysis.response.dto';
import { UpdateDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/update-disability-assessment-for-bpc-analysis.response.dto';
import { CreateDisabilityAssessmentForBpcAnalysisResultUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/create-disability-assessment-for-bpc-analysis-result.use-case';
import { CreateDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/create-disability-assessment-for-bpc-analysis.use-case';
import { DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/download-disability-assessment-for-bpc-complete-analysis.use-case';
import { DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/download-disability-assessment-for-bpc-simplified-analysis.use-case';
import { GetDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/get-disability-assessment-for-bpc-analysis.use-case';
import { UpdateDisabilityAssessmentForBpcAnalysisUseCase } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/use-case/update-disability-assessment-for-bpc-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/disability-assessment-for-bpc-analysis')
export class DisabilityAssessmentForBpcAnalysisController {
  protected readonly _type = DisabilityAssessmentForBpcAnalysisController.name;

  public constructor(
    private readonly createDisabilityAssessmentForBpcAnalysisUseCase: CreateDisabilityAssessmentForBpcAnalysisUseCase,
    private readonly createDisabilityAssessmentForBpcAnalysisResultUseCase: CreateDisabilityAssessmentForBpcAnalysisResultUseCase,
    private readonly getDisabilityAssessmentForBpcAnalysisUseCase: GetDisabilityAssessmentForBpcAnalysisUseCase,
    private readonly downloadDisabilityAssessmentForBpcCompleteAnalysisUseCase: DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase,
    private readonly downloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase: DownloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase,
    private readonly updateDisabilityAssessmentForBpcAnalysisUseCase: UpdateDisabilityAssessmentForBpcAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de avaliação de deficiência para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityAssessmentForBpcAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateDisabilityAssessmentForBpcAnalysisRequestDto,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de avaliação de deficiência para BPC atualizada com sucesso.',
      type: UpdateDisabilityAssessmentForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityAssessmentForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateDisabilityAssessmentForBpcAnalysisRequestDto,
    @Param(
      'disabilityAssessmentForBpcAnalysisId',
      new ParseValueObjectPipe(DisabilityAssessmentForBpcAnalysisId),
    )
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<UpdateDisabilityAssessmentForBpcAnalysisResponseDto> {
    return await this.updateDisabilityAssessmentForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityAssessmentForBpcAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de avaliação de deficiência para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateDisabilityAssessmentForBpcAnalysisRequestDto,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de avaliação de deficiência para BPC criada com sucesso.',
      type: CreateDisabilityAssessmentForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAssessmentForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateDisabilityAssessmentForBpcAnalysisRequestDto,
  ): Promise<CreateDisabilityAssessmentForBpcAnalysisResponseDto> {
    return await this.createDisabilityAssessmentForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de avaliação de deficiência para BPC por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityAssessmentForBpcAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da análise de avaliação de deficiência para BPC retornados com sucesso.',
      type: GetDisabilityAssessmentForBpcAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDisabilityAssessmentForBpcAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityAssessmentForBpcAnalysisId',
      new ParseValueObjectPipe(DisabilityAssessmentForBpcAnalysisId),
    )
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<GetDisabilityAssessmentForBpcAnalysisResponseDto> {
    return await this.getDisabilityAssessmentForBpcAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityAssessmentForBpcAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de avaliação de deficiência para BPC simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityAssessmentForBpcAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de avaliação de deficiência para BPC retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadDisabilityAssessmentForBpcSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityAssessmentForBpcAnalysisId',
      new ParseValueObjectPipe(DisabilityAssessmentForBpcAnalysisId),
    )
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityAssessmentForBpcSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityAssessmentForBpcAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de avaliação de deficiência para BPC completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityAssessmentForBpcAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de avaliação de deficiência para BPC retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadDisabilityAssessmentForBpcCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityAssessmentForBpcAnalysisId',
      new ParseValueObjectPipe(DisabilityAssessmentForBpcAnalysisId),
    )
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadDisabilityAssessmentForBpcCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityAssessmentForBpcAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de avaliação de deficiência para BPC',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':disabilityAssessmentForBpcAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-avaliacao-deficiencia-para-bpc'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise de avaliação de deficiência para BPC criado com sucesso.',
      type: CreateDisabilityAssessmentForBpcAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAssessmentForBpcAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'disabilityAssessmentForBpcAnalysisId',
      new ParseValueObjectPipe(DisabilityAssessmentForBpcAnalysisId),
    )
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<CreateDisabilityAssessmentForBpcAnalysisResultResponseDto> {
    return await this.createDisabilityAssessmentForBpcAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      disabilityAssessmentForBpcAnalysisId,
    );
  }
}
