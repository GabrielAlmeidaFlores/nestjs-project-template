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
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { CreateAdministrativeProcedureInssAnalysisRequestDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/request/create-administrative-procedure-inss-analysis.request.dto';
import { UpdateAdministrativeProcedureInssAnalysisRequestDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/request/update-administrative-procedure-inss-analysis.request.dto';
import { CreateAdministrativeProcedureInssAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/create-administrative-procedure-inss-analysis-result.response.dto';
import { CreateAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/create-administrative-procedure-inss-analysis.response.dto';
import { GetAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/get-administrative-procedure-inss-analysis.response.dto';
import { UpdateAdministrativeProcedureInssAnalysisResponseDto } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/dto/response/update-administrative-procedure-inss-analysis.response.dto';
import { CreateAdministrativeProcedureInssAnalysisResultUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/create-administrative-procedure-inss-analysis-result.use-case';
import { CreateAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/create-administrative-procedure-inss-analysis.use-case';
import { DownloadAdministrativeProcedureInssCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/download-administrative-procedure-inss-complete-analysis.use-case';
import { DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/download-administrative-procedure-inss-simplified-analysis.use-case';
import { GetAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/get-administrative-procedure-inss-analysis.use-case';
import { UpdateAdministrativeProcedureInssAnalysisUseCase } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/use-case/update-administrative-procedure-inss-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/administrative-procedure-inss-analysis')
export class AdministrativeProcedureInssAnalysisController {
  protected readonly _type = AdministrativeProcedureInssAnalysisController.name;

  public constructor(
    private readonly createAdministrativeProcedureInssAnalysisUseCase: CreateAdministrativeProcedureInssAnalysisUseCase,
    private readonly createAdministrativeProcedureInssAnalysisResultUseCase: CreateAdministrativeProcedureInssAnalysisResultUseCase,
    private readonly getAdministrativeProcedureInssAnalysisUseCase: GetAdministrativeProcedureInssAnalysisUseCase,
    private readonly downloadAdministrativeProcedureInssCompleteAnalysisUseCase: DownloadAdministrativeProcedureInssCompleteAnalysisUseCase,
    private readonly downloadAdministrativeProcedureInssSimplifiedAnalysisUseCase: DownloadAdministrativeProcedureInssSimplifiedAnalysisUseCase,
    private readonly updateAdministrativeProcedureInssAnalysisUseCase: UpdateAdministrativeProcedureInssAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de procedimento administrativo do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeProcedureInssAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateAdministrativeProcedureInssAnalysisRequestDto,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de procedimento administrativo do INSS atualizada com sucesso.',
      type: UpdateAdministrativeProcedureInssAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAdministrativeProcedureInssAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateAdministrativeProcedureInssAnalysisRequestDto,
    @Param(
      'administrativeProcedureInssAnalysisId',
      new ParseValueObjectPipe(AdministrativeProcedureInssAnalysisId),
    )
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<UpdateAdministrativeProcedureInssAnalysisResponseDto> {
    return await this.updateAdministrativeProcedureInssAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      administrativeProcedureInssAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de procedimento administrativo do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateAdministrativeProcedureInssAnalysisRequestDto,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de procedimento administrativo do INSS criada com sucesso.',
      type: CreateAdministrativeProcedureInssAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAdministrativeProcedureInssAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAdministrativeProcedureInssAnalysisRequestDto,
  ): Promise<CreateAdministrativeProcedureInssAnalysisResponseDto> {
    return await this.createAdministrativeProcedureInssAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de procedimento administrativo do INSS por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeProcedureInssAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da análise de procedimento administrativo do INSS retornados com sucesso.',
      type: GetAdministrativeProcedureInssAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAdministrativeProcedureInssAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'administrativeProcedureInssAnalysisId',
      new ParseValueObjectPipe(AdministrativeProcedureInssAnalysisId),
    )
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<GetAdministrativeProcedureInssAnalysisResponseDto> {
    return await this.getAdministrativeProcedureInssAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      administrativeProcedureInssAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise de procedimento administrativo do INSS simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeProcedureInssAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de procedimento administrativo do INSS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAdministrativeProcedureInssSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'administrativeProcedureInssAnalysisId',
      new ParseValueObjectPipe(AdministrativeProcedureInssAnalysisId),
    )
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAdministrativeProcedureInssSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      administrativeProcedureInssAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de procedimento administrativo do INSS completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeProcedureInssAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de procedimento administrativo do INSS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadAdministrativeProcedureInssCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'administrativeProcedureInssAnalysisId',
      new ParseValueObjectPipe(AdministrativeProcedureInssAnalysisId),
    )
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadAdministrativeProcedureInssCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      administrativeProcedureInssAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de procedimento administrativo do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':administrativeProcedureInssAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-procedimento-administrativo-inss'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise de procedimento administrativo do INSS criado com sucesso.',
      type: CreateAdministrativeProcedureInssAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAdministrativeProcedureInssAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'administrativeProcedureInssAnalysisId',
      new ParseValueObjectPipe(AdministrativeProcedureInssAnalysisId),
    )
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
  ): Promise<CreateAdministrativeProcedureInssAnalysisResultResponseDto> {
    return await this.createAdministrativeProcedureInssAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      administrativeProcedureInssAnalysisId,
    );
  }
}
