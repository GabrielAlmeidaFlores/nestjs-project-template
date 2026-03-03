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
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { CreateJudicialCaseAnalysisRequestDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/request/create-judicial-case-analysis.request.dto';
import { UpdateJudicialCaseAnalysisRequestDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/request/update-judicial-case-analysis.request.dto';
import { CreateJudicialCaseAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/create-judicial-case-analysis-result.response.dto';
import { CreateJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/create-judicial-case-analysis.response.dto';
import { GetJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/get-judicial-case-analysis.response.dto';
import { UpdateJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/update-judicial-case-analysis.response.dto';
import { CreateJudicialCaseAnalysisResultUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/create-judicial-case-analysis-result.use-case';
import { CreateJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/create-judicial-case-analysis.use-case';
import { DownloadJudicialCaseAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/download-judicial-case-analysis-complete-analysis.use-case';
import { DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/download-judicial-case-analysis-simplified-analysis.use-case';
import { GetJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/get-judicial-case-analysis.use-case';
import { UpdateJudicialCaseAnalysisUseCase } from '@module/customer/analysis-tool/module/judicial-case-analysis/use-case/update-judicial-case-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/judicial-case-analysis')
export class JudicialCaseAnalysisController {
  protected readonly _type = JudicialCaseAnalysisController.name;

  public constructor(
    private readonly createJudicialCaseAnalysisUseCase: CreateJudicialCaseAnalysisUseCase,
    private readonly createJudicialCaseAnalysisResultUseCase: CreateJudicialCaseAnalysisResultUseCase,
    private readonly getJudicialCaseAnalysisUseCase: GetJudicialCaseAnalysisUseCase,
    private readonly downloadJudicialCaseAnalysisCompleteAnalysisUseCase: DownloadJudicialCaseAnalysisCompleteAnalysisUseCase,
    private readonly downloadJudicialCaseAnalysisSimplifiedAnalysisUseCase: DownloadJudicialCaseAnalysisSimplifiedAnalysisUseCase,
    private readonly updateJudicialCaseAnalysisUseCase: UpdateJudicialCaseAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de caso judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':judicialCaseAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateJudicialCaseAnalysisRequestDto,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de caso judicial atualizada com sucesso.',
      type: UpdateJudicialCaseAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateJudicialCaseAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateJudicialCaseAnalysisRequestDto,
    @Param(
      'judicialCaseAnalysisId',
      new ParseValueObjectPipe(JudicialCaseAnalysisId),
    )
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<UpdateJudicialCaseAnalysisResponseDto> {
    return await this.updateJudicialCaseAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      judicialCaseAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de caso judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateJudicialCaseAnalysisRequestDto,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de caso judicial criada com sucesso.',
      type: CreateJudicialCaseAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createJudicialCaseAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateJudicialCaseAnalysisRequestDto,
  ): Promise<CreateJudicialCaseAnalysisResponseDto> {
    return await this.createJudicialCaseAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de caso judicial por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':judicialCaseAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da análise de caso judicial retornados com sucesso.',
      type: GetJudicialCaseAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getJudicialCaseAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'judicialCaseAnalysisId',
      new ParseValueObjectPipe(JudicialCaseAnalysisId),
    )
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<GetJudicialCaseAnalysisResponseDto> {
    return await this.getJudicialCaseAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      judicialCaseAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de caso judicial simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':judicialCaseAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de caso judicial retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadJudicialCaseAnalysisSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'judicialCaseAnalysisId',
      new ParseValueObjectPipe(JudicialCaseAnalysisId),
    )
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadJudicialCaseAnalysisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      judicialCaseAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de caso judicial completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':judicialCaseAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de caso judicial retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadJudicialCaseAnalysisCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'judicialCaseAnalysisId',
      new ParseValueObjectPipe(JudicialCaseAnalysisId),
    )
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadJudicialCaseAnalysisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      judicialCaseAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise de caso judicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':judicialCaseAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-caso-judicial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise de caso judicial criado com sucesso.',
      type: CreateJudicialCaseAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createJudicialCaseAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'judicialCaseAnalysisId',
      new ParseValueObjectPipe(JudicialCaseAnalysisId),
    )
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<CreateJudicialCaseAnalysisResultResponseDto> {
    return await this.createJudicialCaseAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      judicialCaseAnalysisId,
    );
  }
}
