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
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-disability-analysis.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-insured-status.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated.request.dto';
import { SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/save-permanent-incapacity-benefit-terminated-periods.request.dto';
import { UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/update-permanent-incapacity-benefit-terminated-disability-analysis.request.dto';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/update-permanent-incapacity-benefit-terminated-insured-status.request.dto';
import { UpdatePermanentIncapacityBenefitTerminatedRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/update-permanent-incapacity-benefit-terminated.request.dto';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/upload-permanent-incapacity-benefit-terminated-documents.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-disability-analysis.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-first-analysis.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-inss-decision-analysis.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-insured-status.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedResultResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-result.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated.response.dto';
import { GetPermanentIncapacityBenefitTerminatedResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/get-permanent-incapacity-benefit-terminated.response.dto';
import { SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/save-permanent-incapacity-benefit-terminated-periods.response.dto';
import { UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/update-permanent-incapacity-benefit-terminated-disability-analysis.response.dto';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/update-permanent-incapacity-benefit-terminated-insured-status.response.dto';
import { UpdatePermanentIncapacityBenefitTerminatedResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/update-permanent-incapacity-benefit-terminated.response.dto';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/upload-permanent-incapacity-benefit-terminated-documents.response.dto';
import { CreatePermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-complete-analysis-download.use-case';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-disability-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-first-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-inss-decision-analysis.use-case';
import { CreatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-insured-status.use-case';
import { CreatePermanentIncapacityBenefitTerminatedResultUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-result.use-case';
import { CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated-simplified-analysis-download.use-case';
import { CreatePermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/create-permanent-incapacity-benefit-terminated.use-case';
import { GetPermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/get-permanent-incapacity-benefit-terminated.use-case';
import { SavePermanentIncapacityBenefitTerminatedPeriodsUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/save-permanent-incapacity-benefit-terminated-periods.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated-disability-analysis.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated-insured-status.use-case';
import { UpdatePermanentIncapacityBenefitTerminatedUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/update-permanent-incapacity-benefit-terminated.use-case';
import { UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/use-case/upload-permanent-incapacity-benefit-terminated-documents.use-case';
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
  'analysis-tool/permanent-incapacity-benefit-terminated',
)
export class PermanentIncapacityBenefitTerminatedController {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedController.name;

  public constructor(
    private readonly createPermanentIncapacityBenefitTerminatedUseCase: CreatePermanentIncapacityBenefitTerminatedUseCase,
    private readonly getPermanentIncapacityBenefitTerminatedUseCase: GetPermanentIncapacityBenefitTerminatedUseCase,
    private readonly updatePermanentIncapacityBenefitTerminatedUseCase: UpdatePermanentIncapacityBenefitTerminatedUseCase,
    private readonly uploadPermanentIncapacityBenefitTerminatedDocumentsUseCase: UploadPermanentIncapacityBenefitTerminatedDocumentsUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase: CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase,
    private readonly updatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase: UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedInsuredStatusUseCase: CreatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase,
    private readonly updatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase: UpdatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase,
    private readonly savePermanentIncapacityBenefitTerminatedPeriodsUseCase: SavePermanentIncapacityBenefitTerminatedPeriodsUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedFirstAnalysisUseCase: CreatePermanentIncapacityBenefitTerminatedFirstAnalysisUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedResultUseCase: CreatePermanentIncapacityBenefitTerminatedResultUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase: CreatePermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase,
    private readonly createPermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase: CreatePermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreatePermanentIncapacityBenefitTerminatedRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreatePermanentIncapacityBenefitTerminatedRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId',
      method: RequestMethod.GET,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetPermanentIncapacityBenefitTerminatedResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getById(
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<GetPermanentIncapacityBenefitTerminatedResponseDto> {
    return await this.getPermanentIncapacityBenefitTerminatedUseCase.execute(
      permanentIncapacityBenefitTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId',
      method: RequestMethod.PATCH,
      type: UpdatePermanentIncapacityBenefitTerminatedRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdatePermanentIncapacityBenefitTerminatedResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body() dto: UpdatePermanentIncapacityBenefitTerminatedRequestDto,
  ): Promise<UpdatePermanentIncapacityBenefitTerminatedResponseDto> {
    return await this.updatePermanentIncapacityBenefitTerminatedUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/document',
      method: RequestMethod.POST,
      type: UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body() dto: UploadPermanentIncapacityBenefitTerminatedDocumentsRequestDto,
  ): Promise<UploadPermanentIncapacityBenefitTerminatedDocumentsResponseDto> {
    return await this.uploadPermanentIncapacityBenefitTerminatedDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedInssDecisionAnalysisResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar análise de incapacidade da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/disability-analysis',
      method: RequestMethod.POST,
      type: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de incapacidade criada com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body()
    dto: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de incapacidade da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/disability-analysis',
      method: RequestMethod.PATCH,
      type: UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de incapacidade atualizada com sucesso.',
      type: UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body()
    dto: UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto,
  ): Promise<UpdatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto> {
    return await this.updatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar situação do segurado da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/insured-status',
      method: RequestMethod.POST,
      type: CreatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Situação do segurado criada com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body()
    dto: CreatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar situação do segurado da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/insured-status',
      method: RequestMethod.PATCH,
      type: UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Situação do segurado atualizada com sucesso.',
      type: UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body()
    dto: UpdatePermanentIncapacityBenefitTerminatedInsuredStatusRequestDto,
  ): Promise<UpdatePermanentIncapacityBenefitTerminatedInsuredStatusResponseDto> {
    return await this.updatePermanentIncapacityBenefitTerminatedInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar vínculos empregatícios da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/work-periods',
      method: RequestMethod.POST,
      type: SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Vínculos empregatícios salvos com sucesso.',
      type: SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Body()
    dto: SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto,
  ): Promise<SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto> {
    return await this.savePermanentIncapacityBenefitTerminatedPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar pré-análise da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Pré-análise gerada com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedFirstAnalysisResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/result',
      method: RequestMethod.POST,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreatePermanentIncapacityBenefitTerminatedResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedResultResponseDto> {
    return await this.createPermanentIncapacityBenefitTerminatedResultUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/complete-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
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
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createPermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de cessação de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':permanentIncapacityBenefitTerminatedId/simplified-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['aposentadoria-incapacidade-permanente-cessacao'],
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
      'permanentIncapacityBenefitTerminatedId',
      new ParseValueObjectPipe(PermanentIncapacityBenefitTerminatedId),
    )
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createPermanentIncapacityBenefitTerminatedSimplifiedAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      permanentIncapacityBenefitTerminatedId,
      format,
    );
  }
}
