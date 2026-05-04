import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';
import { ParseEnumPipe } from '@nestjs/common/pipes';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated-disability-analysis.request.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated-insured-status.request.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated.request.dto';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/save-temporary-disability-benefits-terminated-periods.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated-disability-analysis.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated-insured-status.request.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/update-temporary-disability-benefits-terminated.request.dto';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/upload-temporary-disability-benefits-terminated-documents.request.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-disability-analysis.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-first-analysis.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-inss-decision-analysis.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-insured-status.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-result.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated.response.dto';
import { GetTemporaryDisabilityBenefitsTerminatedResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/get-temporary-disability-benefits-terminated.response.dto';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/save-temporary-disability-benefits-terminated-periods.response.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated-disability-analysis.response.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated-insured-status.response.dto';
import { UpdateTemporaryDisabilityBenefitsTerminatedResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/update-temporary-disability-benefits-terminated.response.dto';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/upload-temporary-disability-benefits-terminated-documents.response.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-complete-analysis-download.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-disability-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-first-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-inss-decision-analysis.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-insured-status.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedResultUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-result.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated-simplified-analysis-download.use-case';
import { CreateTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/create-temporary-disability-benefits-terminated.use-case';
import { GetTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/get-temporary-disability-benefits-terminated.use-case';
import { SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/save-temporary-disability-benefits-terminated-periods.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated-disability-analysis.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated-insured-status.use-case';
import { UpdateTemporaryDisabilityBenefitsTerminatedUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/update-temporary-disability-benefits-terminated.use-case';
import { UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/use-case/upload-temporary-disability-benefits-terminated-documents.use-case';
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
  'analysis-tool/temporary-disability-benefits-terminated',
)
export class TemporaryDisabilityBenefitsTerminatedController {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedController.name;

  public constructor(
    private readonly createTemporaryDisabilityBenefitsTerminatedUseCase: CreateTemporaryDisabilityBenefitsTerminatedUseCase,
    private readonly getTemporaryDisabilityBenefitsTerminatedUseCase: GetTemporaryDisabilityBenefitsTerminatedUseCase,
    private readonly updateTemporaryDisabilityBenefitsTerminatedUseCase: UpdateTemporaryDisabilityBenefitsTerminatedUseCase,
    private readonly uploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase: UploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase: CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase,
    private readonly updateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase: UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase: CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase,
    private readonly updateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase: UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase,
    private readonly saveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase: SaveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase: CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedResultUseCase: CreateTemporaryDisabilityBenefitsTerminatedResultUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase: CreateTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase,
    private readonly createTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase: CreateTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de cessação ou suspensão de auxílio por incapacidade temporária a partir de um cliente previamente cadastrado',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsTerminatedRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTemporaryDisabilityBenefitsTerminatedRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetTemporaryDisabilityBenefitsTerminatedResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getById(
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<GetTemporaryDisabilityBenefitsTerminatedResponseDto> {
    return await this.getTemporaryDisabilityBenefitsTerminatedUseCase.execute(
      temporaryDisabilityBenefitsTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsTerminatedRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body() dto: UpdateTemporaryDisabilityBenefitsTerminatedRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/document',
      method: RequestMethod.POST,
      type: UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body() dto: UploadTemporaryDisabilityBenefitsTerminatedDocumentsRequestDto,
  ): Promise<UploadTemporaryDisabilityBenefitsTerminatedDocumentsResponseDto> {
    return await this.uploadTemporaryDisabilityBenefitsTerminatedDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar análise de incapacidade da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/disability-analysis',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de incapacidade criada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body()
    dto: CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de incapacidade da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/disability-analysis',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de incapacidade atualizada com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body()
    dto: UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsTerminatedDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar situação do segurado da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/insured-status',
      method: RequestMethod.POST,
      type: CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Situação do segurado criada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body()
    dto: CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar situação do segurado da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/insured-status',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Situação do segurado atualizada com sucesso.',
      type: UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body()
    dto: UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsTerminatedInsuredStatusResponseDto> {
    return await this.updateTemporaryDisabilityBenefitsTerminatedInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar vínculos empregatícios da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/work-periods',
      method: RequestMethod.POST,
      type: SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Vínculos empregatícios salvos com sucesso.',
      type: SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Body()
    dto: SaveTemporaryDisabilityBenefitsTerminatedPeriodsRequestDto,
  ): Promise<SaveTemporaryDisabilityBenefitsTerminatedPeriodsResponseDto> {
    return await this.saveTemporaryDisabilityBenefitsTerminatedPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar pré-análise da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedFirstAnalysisResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/result',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedResultResponseDto> {
    return await this.createTemporaryDisabilityBenefitsTerminatedResultUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/complete-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise completa disponibilizada para download com sucesso.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de cessação ou suspensão de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryDisabilityBenefitsTerminatedId/simplified-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao-suspensao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise simplificada disponibilizada para download com sucesso.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryDisabilityBenefitsTerminatedId',
      new ParseValueObjectPipe(TemporaryDisabilityBenefitsTerminatedId),
    )
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryDisabilityBenefitsTerminatedId,
      format,
    );
  }
}
