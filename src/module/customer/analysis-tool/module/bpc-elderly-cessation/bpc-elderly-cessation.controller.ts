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
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { CreateBpcElderlyCessationDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/create-bpc-elderly-cessation-document.request.dto';
import { CreateBpcElderlyCessationFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/create-bpc-elderly-cessation-family-member.request.dto';
import { CreateBpcElderlyCessationRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/create-bpc-elderly-cessation.request.dto';
import { UpdateBpcElderlyCessationFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/update-bpc-elderly-cessation-family-member.request.dto';
import { UpdateBpcElderlyCessationRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/update-bpc-elderly-cessation.request.dto';
import { CreateBpcElderlyCessationDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-document.response.dto';
import { CreateBpcElderlyCessationFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-family-member.response.dto';
import { CreateBpcElderlyCessationFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-first-analysis.response.dto';
import { CreateBpcElderlyCessationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-inss-decision-analysis.response.dto';
import { CreateBpcElderlyCessationResultResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-result.response.dto';
import { CreateBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation.response.dto';
import { GetBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/get-bpc-elderly-cessation.response.dto';
import { UpdateBpcElderlyCessationResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/update-bpc-elderly-cessation.response.dto';
import { CreateBpcElderlyCessationDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-document.use-case';
import { CreateBpcElderlyCessationFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-family-member.use-case';
import { CreateBpcElderlyCessationFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-first-analysis.use-case';
import { CreateBpcElderlyCessationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-inss-decision-analysis.use-case';
import { CreateBpcElderlyCessationResultUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation-result.use-case';
import { CreateBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/create-bpc-elderly-cessation.use-case';
import { DownloadBpcElderlyCessationCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/download-bpc-elderly-cessation-complete-analysis.use-case';
import { DownloadBpcElderlyCessationSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/download-bpc-elderly-cessation-simplified-analysis.use-case';
import { GetBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/get-bpc-elderly-cessation.use-case';
import { UpdateBpcElderlyCessationFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/update-bpc-elderly-cessation-family-member.use-case';
import { UpdateBpcElderlyCessationUseCase } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/use-case/update-bpc-elderly-cessation.use-case';
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

@CustomerControllerRoute('analysis-tool/bpc-elderly-cessation')
export class BpcElderlyCessationController {
  protected readonly _type = BpcElderlyCessationController.name;

  public constructor(
    private readonly createBpcElderlyCessationUseCase: CreateBpcElderlyCessationUseCase,
    private readonly createBpcElderlyCessationDocumentUseCase: CreateBpcElderlyCessationDocumentUseCase,
    private readonly createBpcElderlyCessationFamilyMemberUseCase: CreateBpcElderlyCessationFamilyMemberUseCase,
    private readonly updateBpcElderlyCessationFamilyMemberUseCase: UpdateBpcElderlyCessationFamilyMemberUseCase,
    private readonly createBpcElderlyCessationInssDecisionAnalysisUseCase: CreateBpcElderlyCessationInssDecisionAnalysisUseCase,
    private readonly createBpcElderlyCessationFirstAnalysisUseCase: CreateBpcElderlyCessationFirstAnalysisUseCase,
    private readonly createBpcElderlyCessationResultUseCase: CreateBpcElderlyCessationResultUseCase,
    private readonly downloadBpcElderlyCessationCompleteAnalysisUseCase: DownloadBpcElderlyCessationCompleteAnalysisUseCase,
    private readonly downloadBpcElderlyCessationSimplifiedAnalysisUseCase: DownloadBpcElderlyCessationSimplifiedAnalysisUseCase,
    private readonly getBpcElderlyCessationUseCase: GetBpcElderlyCessationUseCase,
    private readonly updateBpcElderlyCessationUseCase: UpdateBpcElderlyCessationUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de cessação de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateBpcElderlyCessationRequestDto,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateBpcElderlyCessationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateBpcElderlyCessationRequestDto,
  ): Promise<CreateBpcElderlyCessationResponseDto> {
    return this.createBpcElderlyCessationUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos da análise de cessação de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/documents',
      method: RequestMethod.POST,
      type: CreateBpcElderlyCessationDocumentRequestDto,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: CreateBpcElderlyCessationDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessationDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Body() dto: CreateBpcElderlyCessationDocumentRequestDto,
  ): Promise<CreateBpcElderlyCessationDocumentResponseDto> {
    return this.createBpcElderlyCessationDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cadastrar membros do grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/family-member',
      method: RequestMethod.POST,
      type: CreateBpcElderlyCessationFamilyMemberRequestDto,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Grupo familiar cadastrado com sucesso.',
      type: CreateBpcElderlyCessationFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessationFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Body() dto: CreateBpcElderlyCessationFamilyMemberRequestDto,
  ): Promise<CreateBpcElderlyCessationFamilyMemberResponseDto> {
    return this.createBpcElderlyCessationFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/family-member',
      method: RequestMethod.PATCH,
      type: UpdateBpcElderlyCessationFamilyMemberRequestDto,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Grupo familiar atualizado com sucesso.',
      type: UpdateBpcElderlyCessationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcElderlyCessationFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Body() dto: UpdateBpcElderlyCessationFamilyMemberRequestDto,
  ): Promise<UpdateBpcElderlyCessationResponseDto> {
    return this.updateBpcElderlyCessationFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise da decisão do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateBpcElderlyCessationInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessationInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<CreateBpcElderlyCessationInssDecisionAnalysisResponseDto> {
    return this.createBpcElderlyCessationInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar primeira análise da cessação do BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Primeira análise gerada com sucesso.',
      type: CreateBpcElderlyCessationFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessationFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<CreateBpcElderlyCessationFirstAnalysisResponseDto> {
    return this.createBpcElderlyCessationFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado final da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':bpcElderlyCessationId/result', method: RequestMethod.POST },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateBpcElderlyCessationResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcElderlyCessationResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<CreateBpcElderlyCessationResultResponseDto> {
    return this.createBpcElderlyCessationResultUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de cessação de BPC ao Idoso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':bpcElderlyCessationId', method: RequestMethod.GET },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise encontrada com sucesso.',
      type: GetBpcElderlyCessationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBpcElderlyCessation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): Promise<GetBpcElderlyCessationResponseDto> {
    return this.getBpcElderlyCessationUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados gerais da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId',
      method: RequestMethod.PATCH,
      type: UpdateBpcElderlyCessationRequestDto,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateBpcElderlyCessationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcElderlyCessation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Body() dto: UpdateBpcElderlyCessationRequestDto,
  ): Promise<UpdateBpcElderlyCessationResponseDto> {
    return this.updateBpcElderlyCessationUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcElderlyCessationCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcElderlyCessationCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcElderlyCessationId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-cessacao-bpc-idoso'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcElderlyCessationSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcElderlyCessationId',
      new ParseValueObjectPipe(BpcElderlyCessationId),
    )
    bpcElderlyCessationId: BpcElderlyCessationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcElderlyCessationSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcElderlyCessationId,
      format,
    );
  }
}
