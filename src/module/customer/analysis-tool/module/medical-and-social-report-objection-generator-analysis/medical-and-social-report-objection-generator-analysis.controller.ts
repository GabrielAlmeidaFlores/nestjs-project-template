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
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/request/create-medical-and-social-report-objection-generator-analysis.request.dto';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/request/update-medical-and-social-report-objection-generator-analysis.request.dto';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/create-medical-and-social-report-objection-generator-analysis-result.response.dto';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/create-medical-and-social-report-objection-generator-analysis.response.dto';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/get-medical-and-social-report-objection-generator-analysis.response.dto';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/dto/response/update-medical-and-social-report-objection-generator-analysis.response.dto';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/create-medical-and-social-report-objection-generator-analysis-result.use-case';
import { CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/create-medical-and-social-report-objection-generator-analysis.use-case';
import { DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/download-medical-and-social-report-objection-generator-complete-analysis.use-case';
import { DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/download-medical-and-social-report-objection-generator-simplified-analysis.use-case';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/get-medical-and-social-report-objection-generator-analysis.use-case';
import { UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/use-case/update-medical-and-social-report-objection-generator-analysis.use-case';
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
  'analysis-tool/medical-and-social-report-objection-generator-analysis',
)
export class MedicalAndSocialReportObjectionGeneratorAnalysisController {
  protected readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisController.name;

  public constructor(
    private readonly createMedicalAndSocialReportObjectionGeneratorAnalysisUseCase: CreateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
    private readonly createMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase: CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase,
    private readonly getMedicalAndSocialReportObjectionGeneratorAnalysisUseCase: GetMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
    private readonly downloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase: DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase,
    private readonly downloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase: DownloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase,
    private readonly updateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise geradora de objeção de laudo médico e social',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise geradora de objeção de laudo médico e social criada com sucesso.',
      type: CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createMedicalAndSocialReportObjectionGeneratorAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
  ): Promise<CreateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    return await this.createMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise geradora de objeção de laudo médico e social por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalAndSocialReportObjectionGeneratorAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da análise geradora de objeção de laudo médico e social retornados com sucesso.',
      type: GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getMedicalAndSocialReportObjectionGeneratorAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalAndSocialReportObjectionGeneratorAnalysisId',
      new ParseValueObjectPipe(
        MedicalAndSocialReportObjectionGeneratorAnalysisId,
      ),
    )
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<GetMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    return await this.getMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalAndSocialReportObjectionGeneratorAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise geradora de objeção de laudo médico e social',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalAndSocialReportObjectionGeneratorAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise geradora de objeção de laudo médico e social atualizada com sucesso.',
      type: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateMedicalAndSocialReportObjectionGeneratorAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: UpdateMedicalAndSocialReportObjectionGeneratorAnalysisRequestDto,
    @Param(
      'medicalAndSocialReportObjectionGeneratorAnalysisId',
      new ParseValueObjectPipe(
        MedicalAndSocialReportObjectionGeneratorAnalysisId,
      ),
    )
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<UpdateMedicalAndSocialReportObjectionGeneratorAnalysisResponseDto> {
    return await this.updateMedicalAndSocialReportObjectionGeneratorAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalAndSocialReportObjectionGeneratorAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise geradora de objeção de laudo médico e social simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalAndSocialReportObjectionGeneratorAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada geradora de objeção de laudo médico e social retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalAndSocialReportObjectionGeneratorAnalysisId',
      new ParseValueObjectPipe(
        MedicalAndSocialReportObjectionGeneratorAnalysisId,
      ),
    )
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadMedicalAndSocialReportObjectionGeneratorSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalAndSocialReportObjectionGeneratorAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise geradora de objeção de laudo médico e social completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalAndSocialReportObjectionGeneratorAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa geradora de objeção de laudo médico e social retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadMedicalAndSocialReportObjectionGeneratorCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalAndSocialReportObjectionGeneratorAnalysisId',
      new ParseValueObjectPipe(
        MedicalAndSocialReportObjectionGeneratorAnalysisId,
      ),
    )
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalAndSocialReportObjectionGeneratorAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise geradora de objeção de laudo médico e social',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':medicalAndSocialReportObjectionGeneratorAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-geradora-objeção-laudo-medico-social'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise geradora de objeção de laudo médico e social criado com sucesso.',
      type: CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createMedicalAndSocialReportObjectionGeneratorAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'medicalAndSocialReportObjectionGeneratorAnalysisId',
      new ParseValueObjectPipe(
        MedicalAndSocialReportObjectionGeneratorAnalysisId,
      ),
    )
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
  ): Promise<CreateMedicalAndSocialReportObjectionGeneratorAnalysisResultResponseDto> {
    return await this.createMedicalAndSocialReportObjectionGeneratorAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      medicalAndSocialReportObjectionGeneratorAnalysisId,
    );
  }
}
