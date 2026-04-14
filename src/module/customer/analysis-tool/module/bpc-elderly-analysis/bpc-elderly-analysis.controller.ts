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
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { CreateBpcElderlyAnalysisDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis-document.request.dto';
import { CreateBpcElderlyAnalysisFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis-family-member.request.dto';
import { CreateBpcElderlyAnalysisRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/request/create-bpc-elderly-analysis.request.dto';
import { CreateBpcElderlyAnalysisDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-document.response.dto';
import { CreateBpcElderlyAnalysisFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-family-member.response.dto';
import { CreateBpcElderlyAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis-result.response.dto';
import { CreateBpcElderlyAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/create-bpc-elderly-analysis.response.dto';
import { GetBpcElderlyAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/dto/response/get-bpc-elderly-analysis.response.dto';
import { CreateBpcElderlyAnalysisDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-document.use-case';
import { CreateBpcElderlyAnalysisFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-family-member.use-case';
import { CreateBpcElderlyAnalysisResultUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis-result.use-case';
import { CreateBpcElderlyAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/create-bpc-elderly-analysis.use-case';
import { DownloadBpcElderlyAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/download-bpc-elderly-analysis-complete-analysis.use-case';
import { DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/download-bpc-elderly-analysis-simplified-analysis.use-case';
import { GetBpcElderlyAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/use-case/get-bpc-elderly-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/bpc-elderly-analysis')
export class BpcElderlyAnalysisController {
  protected readonly _type = BpcElderlyAnalysisController.name;

  public constructor(
    private readonly createBpcElderlyAnalysisUseCase: CreateBpcElderlyAnalysisUseCase,
    private readonly createBpcElderlyAnalysisDocumentUseCase: CreateBpcElderlyAnalysisDocumentUseCase,
    private readonly createBpcElderlyAnalysisFamilyMemberUseCase: CreateBpcElderlyAnalysisFamilyMemberUseCase,
    private readonly downloadBpcElderlyAnalysisCompleteAnalysisUseCase: DownloadBpcElderlyAnalysisCompleteAnalysisUseCase,
    private readonly downloadBpcElderlyAnalysisSimplifiedAnalysisUseCase: DownloadBpcElderlyAnalysisSimplifiedAnalysisUseCase,
    private readonly createBpcElderlyAnalysisResultUseCase: CreateBpcElderlyAnalysisResultUseCase,
    private readonly getBpcElderlyAnalysisUseCase: GetBpcElderlyAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateBpcElderlyAnalysisRequestDto,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de BPC ao Idoso criada com sucesso.',
      type: CreateBpcElderlyAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateBpcElderlyAnalysisRequestDto,
  ): Promise<CreateBpcElderlyAnalysisResponseDto> {
    return await this.createBpcElderlyAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos para análise de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId/document',
      method: RequestMethod.POST,
      type: CreateBpcElderlyAnalysisDocumentRequestDto,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Documentos da análise de BPC ao Idoso enviados com sucesso.',
      type: CreateBpcElderlyAnalysisDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyAnalysisDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    @Body() dto: CreateBpcElderlyAnalysisDocumentRequestDto,
  ): Promise<CreateBpcElderlyAnalysisDocumentResponseDto> {
    return await this.createBpcElderlyAnalysisDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cadastrar membros da família para análise de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId/family-member',
      method: RequestMethod.POST,
      type: CreateBpcElderlyAnalysisFamilyMemberRequestDto,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Membros da família da análise de BPC ao Idoso cadastrados com sucesso.',
      type: CreateBpcElderlyAnalysisFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyAnalysisFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    @Body() dto: CreateBpcElderlyAnalysisFamilyMemberRequestDto,
  ): Promise<CreateBpcElderlyAnalysisFamilyMemberResponseDto> {
    return await this.createBpcElderlyAnalysisFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado da análise de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise de BPC ao Idoso gerado com sucesso.',
      type: CreateBpcElderlyAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): Promise<CreateBpcElderlyAnalysisResultResponseDto> {
    return await this.createBpcElderlyAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de BPC ao Idoso encontrada com sucesso.',
      type: GetBpcElderlyAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBpcElderlyAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): Promise<GetBpcElderlyAnalysisResponseDto> {
    return await this.getBpcElderlyAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de BPC ao Idoso retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcElderlyAnalysisCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadBpcElderlyAnalysisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-bpc-ao-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de BPC ao Idoso retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcElderlyAnalysisSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyAnalysisId',
      new ParseValueObjectPipe(BpcElderlyAnalysisId),
    )
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadBpcElderlyAnalysisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyAnalysisId,
      format,
    );
  }
}
