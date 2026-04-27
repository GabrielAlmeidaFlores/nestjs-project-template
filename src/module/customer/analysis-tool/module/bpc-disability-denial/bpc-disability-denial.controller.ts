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
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { CreateBpcDisabilityDenialDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/create-bpc-disability-denial-document.request.dto';
import { CreateBpcDisabilityDenialFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/create-bpc-disability-denial-family-member.request.dto';
import { CreateBpcDisabilityDenialRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/create-bpc-disability-denial.request.dto';
import { UpdateBpcDisabilityDenialFamilyMemberRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/update-bpc-disability-denial-family-member.request.dto';
import { UpdateBpcDisabilityDenialRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/update-bpc-disability-denial.request.dto';
import { CreateBpcDisabilityDenialDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-document.response.dto';
import { CreateBpcDisabilityDenialFamilyMemberResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-family-member.response.dto';
import { CreateBpcDisabilityDenialFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-first-analysis.response.dto';
import { CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-inss-decision-analysis.response.dto';
import { CreateBpcDisabilityDenialResultResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-result.response.dto';
import { CreateBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial.response.dto';
import { GetBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/get-bpc-disability-denial.response.dto';
import { UpdateBpcDisabilityDenialResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/update-bpc-disability-denial.response.dto';
import { CreateBpcDisabilityDenialDocumentUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-document.use-case';
import { CreateBpcDisabilityDenialFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-family-member.use-case';
import { CreateBpcDisabilityDenialFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-first-analysis.use-case';
import { CreateBpcDisabilityDenialInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-inss-decision-analysis.use-case';
import { CreateBpcDisabilityDenialResultUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial-result.use-case';
import { CreateBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/create-bpc-disability-denial.use-case';
import { DownloadBpcDisabilityDenialCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/download-bpc-disability-denial-complete-analysis.use-case';
import { DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/download-bpc-disability-denial-simplified-analysis.use-case';
import { GetBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/get-bpc-disability-denial.use-case';
import { UpdateBpcDisabilityDenialFamilyMemberUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/update-bpc-disability-denial-family-member.use-case';
import { UpdateBpcDisabilityDenialUseCase } from '@module/customer/analysis-tool/module/bpc-disability-denial/use-case/update-bpc-disability-denial.use-case';
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

@CustomerControllerRoute('analysis-tool/bpc-disability-denial')
export class BpcDisabilityDenialController {
  protected readonly _type = BpcDisabilityDenialController.name;

  public constructor(
    private readonly createBpcDisabilityDenialUseCase: CreateBpcDisabilityDenialUseCase,
    private readonly createBpcDisabilityDenialDocumentUseCase: CreateBpcDisabilityDenialDocumentUseCase,
    private readonly createBpcDisabilityDenialFamilyMemberUseCase: CreateBpcDisabilityDenialFamilyMemberUseCase,
    private readonly updateBpcDisabilityDenialFamilyMemberUseCase: UpdateBpcDisabilityDenialFamilyMemberUseCase,
    private readonly createBpcDisabilityDenialInssDecisionAnalysisUseCase: CreateBpcDisabilityDenialInssDecisionAnalysisUseCase,
    private readonly createBpcDisabilityDenialFirstAnalysisUseCase: CreateBpcDisabilityDenialFirstAnalysisUseCase,
    private readonly createBpcDisabilityDenialResultUseCase: CreateBpcDisabilityDenialResultUseCase,
    private readonly downloadBpcDisabilityDenialCompleteAnalysisUseCase: DownloadBpcDisabilityDenialCompleteAnalysisUseCase,
    private readonly downloadBpcDisabilityDenialSimplifiedAnalysisUseCase: DownloadBpcDisabilityDenialSimplifiedAnalysisUseCase,
    private readonly getBpcDisabilityDenialUseCase: GetBpcDisabilityDenialUseCase,
    private readonly updateBpcDisabilityDenialUseCase: UpdateBpcDisabilityDenialUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de BPC Pessoa com Deficiência',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityDenialRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateBpcDisabilityDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenial(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateBpcDisabilityDenialRequestDto,
  ): Promise<CreateBpcDisabilityDenialResponseDto> {
    return this.createBpcDisabilityDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar documentos da análise de indeferimento de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/documents',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityDenialDocumentRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: CreateBpcDisabilityDenialDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenialDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Body() dto: CreateBpcDisabilityDenialDocumentRequestDto,
  ): Promise<CreateBpcDisabilityDenialDocumentResponseDto> {
    return this.createBpcDisabilityDenialDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cadastrar membros do grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/family-member',
      method: RequestMethod.POST,
      type: CreateBpcDisabilityDenialFamilyMemberRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Grupo familiar cadastrado com sucesso.',
      type: CreateBpcDisabilityDenialFamilyMemberResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenialFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Body() dto: CreateBpcDisabilityDenialFamilyMemberRequestDto,
  ): Promise<CreateBpcDisabilityDenialFamilyMemberResponseDto> {
    return this.createBpcDisabilityDenialFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar grupo familiar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/family-member',
      method: RequestMethod.PATCH,
      type: UpdateBpcDisabilityDenialFamilyMemberRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Grupo familiar atualizado com sucesso.',
      type: UpdateBpcDisabilityDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcDisabilityDenialFamilyMember(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Body() dto: UpdateBpcDisabilityDenialFamilyMemberRequestDto,
  ): Promise<UpdateBpcDisabilityDenialResponseDto> {
    return this.updateBpcDisabilityDenialFamilyMemberUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise da decisão do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenialInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<CreateBpcDisabilityDenialInssDecisionAnalysisResponseDto> {
    return this.createBpcDisabilityDenialInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar primeira análise do indeferimento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Primeira análise gerada com sucesso.',
      type: CreateBpcDisabilityDenialFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenialFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<CreateBpcDisabilityDenialFirstAnalysisResponseDto> {
    return this.createBpcDisabilityDenialFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado final da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':bpcDisabilityDenialId/result', method: RequestMethod.POST },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado gerado com sucesso.',
      type: CreateBpcDisabilityDenialResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBpcDisabilityDenialResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<CreateBpcDisabilityDenialResultResponseDto> {
    return this.createBpcDisabilityDenialResultUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de BPC PcD',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':bpcDisabilityDenialId', method: RequestMethod.GET },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise encontrada com sucesso.',
      type: GetBpcDisabilityDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBpcDisabilityDenial(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): Promise<GetBpcDisabilityDenialResponseDto> {
    return this.getBpcDisabilityDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados gerais da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId',
      method: RequestMethod.PATCH,
      type: UpdateBpcDisabilityDenialRequestDto,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateBpcDisabilityDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBpcDisabilityDenial(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Body() dto: UpdateBpcDisabilityDenialRequestDto,
  ): Promise<UpdateBpcDisabilityDenialResponseDto> {
    return this.updateBpcDisabilityDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityDenialCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityDenialCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':bpcDisabilityDenialId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-indeferimento-bpc-pcd'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadBpcDisabilityDenialSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'bpcDisabilityDenialId',
      new ParseValueObjectPipe(BpcDisabilityDenialId),
    )
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadBpcDisabilityDenialSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      bpcDisabilityDenialId,
      format,
    );
  }
}
