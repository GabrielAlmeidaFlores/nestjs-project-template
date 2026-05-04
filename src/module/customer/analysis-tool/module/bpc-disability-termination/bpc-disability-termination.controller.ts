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
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { CreateBpcDisabilityTerminationDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/create-bpc-disability-termination-document.request.dto';
import { CreateBpcDisabilityTerminationRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/create-bpc-disability-termination.request.dto';
import { SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/save-bpc-disability-termination-disability-assessment.request.dto';
import { SaveBpcDisabilityTerminationFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/save-bpc-disability-termination-family-member.request.dto';
import { UpdateBpcDisabilityTerminationRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/update-bpc-disability-termination.request.dto';
import { CreateBpcDisabilityTerminationDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-document.response.dto';
import { CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-inss-decision-analysis.response.dto';
import { CreateBpcDisabilityTerminationResultResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-result.response.dto';
import { CreateBpcDisabilityTerminationResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination.response.dto';
import { GetBpcDisabilityTerminationResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/get-bpc-disability-termination.response.dto';
import { SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/save-bpc-disability-termination-disability-assessment.response.dto';
import { SaveBpcDisabilityTerminationFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/save-bpc-disability-termination-family-member.response.dto';
import { UpdateBpcDisabilityTerminationResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/update-bpc-disability-termination.response.dto';
import { CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination-inss-decision-analysis.use-case';
import { CreateBpcDisabilityTerminationResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination-result.use-case';
import { CreateBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/create-bpc-disability-termination.use-case';
import { DownloadBpcDisabilityTerminationCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/download-bpc-disability-termination-complete-analysis.use-case';
import { DownloadBpcDisabilityTerminationSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/download-bpc-disability-termination-simplified-analysis.use-case';
import { GetBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/get-bpc-disability-termination.use-case';
import { SaveBpcDisabilityTerminationDisabilityAssessmentUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-disability-assessment.use-case';
import { SaveBpcDisabilityTerminationDocumentsUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-documents.use-case';
import { SaveBpcDisabilityTerminationFamilyMembersUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/save-bpc-disability-termination-family-members.use-case';
import { UpdateBpcDisabilityTerminationUseCase } from '@module/customer/analysis-tool/module/bpc-disability-termination/use-case/update-bpc-disability-termination.use-case';
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

@CustomerControllerRoute('analysis-tool/bpc-disability-termination')
export class BpcDisabilityTerminationController {
  protected readonly _type = BpcDisabilityTerminationController.name;

  public constructor(
    private readonly createBpcDisabilityTerminationUseCase: CreateBpcDisabilityTerminationUseCase,
    private readonly saveBpcDisabilityTerminationDocumentsUseCase: SaveBpcDisabilityTerminationDocumentsUseCase,
    private readonly saveBpcDisabilityTerminationFamilyMembersUseCase: SaveBpcDisabilityTerminationFamilyMembersUseCase,
    private readonly saveBpcDisabilityTerminationDisabilityAssessmentUseCase: SaveBpcDisabilityTerminationDisabilityAssessmentUseCase,
    private readonly createBpcDisabilityTerminationInssDecisionAnalysisUseCase: CreateBpcDisabilityTerminationInssDecisionAnalysisUseCase,
    private readonly createBpcDisabilityTerminationResultUseCase: CreateBpcDisabilityTerminationResultUseCase,
    private readonly downloadBpcDisabilityTerminationCompleteAnalysisUseCase: DownloadBpcDisabilityTerminationCompleteAnalysisUseCase,
    private readonly downloadBpcDisabilityTerminationSimplifiedAnalysisUseCase: DownloadBpcDisabilityTerminationSimplifiedAnalysisUseCase,
    private readonly getBpcDisabilityTerminationUseCase: GetBpcDisabilityTerminationUseCase,
    private readonly updateBpcDisabilityTerminationUseCase: UpdateBpcDisabilityTerminationUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de cessação de BPC Pessoa com Deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityTerminationRequestDto,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateBpcDisabilityTerminationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityTermination(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateBpcDisabilityTerminationRequestDto,
  ): Promise<CreateBpcDisabilityTerminationResponseDto> {
    return this.createBpcDisabilityTerminationUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados gerais da análise de cessação de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId',
      method: RequestMethod.PATCH,
      type: UpdateBpcDisabilityTerminationRequestDto,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateBpcDisabilityTerminationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcDisabilityTermination(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Body() dto: UpdateBpcDisabilityTerminationRequestDto,
  ): Promise<UpdateBpcDisabilityTerminationResponseDto> {
    return this.updateBpcDisabilityTerminationUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos da análise de cessação de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/documents',
      method: RequestMethod.PATCH,
      type: CreateBpcDisabilityTerminationDocumentRequestDto,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos enviados com sucesso.',
      type: CreateBpcDisabilityTerminationDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveBpcDisabilityTerminationDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Body() dto: CreateBpcDisabilityTerminationDocumentRequestDto,
  ): Promise<CreateBpcDisabilityTerminationDocumentResponseDto> {
    return this.saveBpcDisabilityTerminationDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Salvar membros do grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/family-member',
      method: RequestMethod.PATCH,
      type: SaveBpcDisabilityTerminationFamilyMemberRequestDto,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Grupo familiar salvo com sucesso.',
      type: SaveBpcDisabilityTerminationFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveBpcDisabilityTerminationFamilyMembers(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Body() dto: SaveBpcDisabilityTerminationFamilyMemberRequestDto,
  ): Promise<SaveBpcDisabilityTerminationFamilyMemberResponseDto> {
    return this.saveBpcDisabilityTerminationFamilyMembersUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Salvar avaliação de deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/disability-assessment',
      method: RequestMethod.PATCH,
      type: SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Avaliação de deficiência salva com sucesso.',
      type: SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveBpcDisabilityTerminationDisabilityAssessment(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Body() dto: SaveBpcDisabilityTerminationDisabilityAssessmentRequestDto,
  ): Promise<SaveBpcDisabilityTerminationDisabilityAssessmentResponseDto> {
    return this.saveBpcDisabilityTerminationDisabilityAssessmentUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise da decisão do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityTerminationInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<CreateBpcDisabilityTerminationInssDecisionAnalysisResponseDto> {
    return this.createBpcDisabilityTerminationInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado final da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateBpcDisabilityTerminationResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityTerminationResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<CreateBpcDisabilityTerminationResultResponseDto> {
    return this.createBpcDisabilityTerminationResultUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de cessação de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId',
      method: RequestMethod.GET,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise encontrada com sucesso.',
      type: GetBpcDisabilityTerminationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBpcDisabilityTermination(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): Promise<GetBpcDisabilityTerminationResponseDto> {
    return this.getBpcDisabilityTerminationUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityTerminationCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityTerminationCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityTerminationId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-cessacao-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityTerminationSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityTerminationId',
      new ParseValueObjectPipe(BpcDisabilityTerminationId),
    )
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityTerminationSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityTerminationId,
      format,
    );
  }
}
