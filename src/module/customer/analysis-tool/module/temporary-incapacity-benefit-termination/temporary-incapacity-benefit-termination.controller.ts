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
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/create-temporary-incapacity-benefit-termination-disability-analysis.request.dto';
import { CreateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/create-temporary-incapacity-benefit-termination-insured-status.request.dto';
import { CreateTemporaryIncapacityBenefitTerminationRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/create-temporary-incapacity-benefit-termination.request.dto';
import { SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/save-temporary-incapacity-benefit-termination-periods.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination-disability-analysis.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination-insured-status.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination.request.dto';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/upload-temporary-incapacity-benefit-termination-documents.request.dto';
import { CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-disability-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-first-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-inss-decision-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-insured-status.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationResultResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination-result.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/create-temporary-incapacity-benefit-termination.response.dto';
import { GetTemporaryIncapacityBenefitTerminationResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/get-temporary-incapacity-benefit-termination.response.dto';
import { SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/save-temporary-incapacity-benefit-termination-periods.response.dto';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination-disability-analysis.response.dto';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination-insured-status.response.dto';
import { UpdateTemporaryIncapacityBenefitTerminationResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination.response.dto';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/upload-temporary-incapacity-benefit-termination-documents.response.dto';
import { CreateTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-complete-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-disability-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-first-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-inss-decision-analysis.use-case';
import { CreateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-insured-status.use-case';
import { CreateTemporaryIncapacityBenefitTerminationResultUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-result.use-case';
import { CreateTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination-simplified-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/create-temporary-incapacity-benefit-termination.use-case';
import { GetTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/get-temporary-incapacity-benefit-termination.use-case';
import { SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/save-temporary-incapacity-benefit-termination-periods.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination-disability-analysis.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination-insured-status.use-case';
import { UpdateTemporaryIncapacityBenefitTerminationUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/update-temporary-incapacity-benefit-termination.use-case';
import { UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/use-case/upload-temporary-incapacity-benefit-termination-documents.use-case';
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
  'analysis-tool/temporary-incapacity-benefit-termination',
)
export class TemporaryIncapacityBenefitTerminationController {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationController.name;

  public constructor(
    private readonly createTemporaryIncapacityBenefitTerminationUseCase: CreateTemporaryIncapacityBenefitTerminationUseCase,
    private readonly getTemporaryIncapacityBenefitTerminationUseCase: GetTemporaryIncapacityBenefitTerminationUseCase,
    private readonly updateTemporaryIncapacityBenefitTerminationUseCase: UpdateTemporaryIncapacityBenefitTerminationUseCase,
    private readonly uploadTemporaryIncapacityBenefitTerminationDocumentsUseCase: UploadTemporaryIncapacityBenefitTerminationDocumentsUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase: CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase: CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase,
    private readonly updateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase: UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationInsuredStatusUseCase: CreateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase,
    private readonly updateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase: UpdateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase,
    private readonly saveTemporaryIncapacityBenefitTerminationPeriodsUseCase: SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase: CreateTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationResultUseCase: CreateTemporaryIncapacityBenefitTerminationResultUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase: CreateTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase,
    private readonly createTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase: CreateTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitTerminationRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTemporaryIncapacityBenefitTerminationRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetTemporaryIncapacityBenefitTerminationResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getById(
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<GetTemporaryIncapacityBenefitTerminationResponseDto> {
    return await this.getTemporaryIncapacityBenefitTerminationUseCase.execute(
      temporaryIncapacityBenefitTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitTerminationRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitTerminationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body() dto: UpdateTemporaryIncapacityBenefitTerminationRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationResponseDto> {
    return await this.updateTemporaryIncapacityBenefitTerminationUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/document',
      method: RequestMethod.POST,
      type: UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body() dto: UploadTemporaryIncapacityBenefitTerminationDocumentsRequestDto,
  ): Promise<UploadTemporaryIncapacityBenefitTerminationDocumentsResponseDto> {
    return await this.uploadTemporaryIncapacityBenefitTerminationDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationInssDecisionAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar análise de incapacidade da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/disability-analysis',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de incapacidade criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body()
    dto: CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de incapacidade da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/disability-analysis',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de incapacidade atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body()
    dto: UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto> {
    return await this.updateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar situação do segurado da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/insured-status',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Situação do segurado criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body()
    dto: CreateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar situação do segurado da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/insured-status',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Situação do segurado atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body()
    dto: UpdateTemporaryIncapacityBenefitTerminationInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationInsuredStatusResponseDto> {
    return await this.updateTemporaryIncapacityBenefitTerminationInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar vínculos empregatícios da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/work-periods',
      method: RequestMethod.POST,
      type: SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Vínculos empregatícios salvos com sucesso.',
      type: SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Body()
    dto: SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto,
  ): Promise<SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto> {
    return await this.saveTemporaryIncapacityBenefitTerminationPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar pré-análise da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationFirstAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/result',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreateTemporaryIncapacityBenefitTerminationResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): Promise<CreateTemporaryIncapacityBenefitTerminationResultResponseDto> {
    return await this.createTemporaryIncapacityBenefitTerminationResultUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/complete-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
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
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de cessação de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitTerminationId/simplified-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-cessacao'],
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
      'temporaryIncapacityBenefitTerminationId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitTerminationId),
    )
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryIncapacityBenefitTerminationSimplifiedAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitTerminationId,
      format,
    );
  }
}
