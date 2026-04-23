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
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection-disability-analysis.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection-insured-status.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection.request.dto';
import { SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/save-temporary-incapacity-benefit-rejection-periods.request.dto';
import { UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/update-temporary-incapacity-benefit-rejection-disability-analysis.request.dto';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/update-temporary-incapacity-benefit-rejection-insured-status.request.dto';
import { UpdateTemporaryIncapacityBenefitRejectionRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/update-temporary-incapacity-benefit-rejection.request.dto';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/upload-temporary-incapacity-benefit-rejection-documents.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-disability-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-first-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-inss-decision-analysis.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-insured-status.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionResultResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-result.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection.response.dto';
import { GetTemporaryIncapacityBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/get-temporary-incapacity-benefit-rejection.response.dto';
import { SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/save-temporary-incapacity-benefit-rejection-periods.response.dto';
import { UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/update-temporary-incapacity-benefit-rejection-disability-analysis.response.dto';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/update-temporary-incapacity-benefit-rejection-insured-status.response.dto';
import { UpdateTemporaryIncapacityBenefitRejectionResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/update-temporary-incapacity-benefit-rejection.response.dto';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/upload-temporary-incapacity-benefit-rejection-documents.response.dto';
import { CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-complete-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-first-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-inss-decision-analysis.use-case';
import { CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { CreateTemporaryIncapacityBenefitRejectionResultUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-result.use-case';
import { CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection-simplified-analysis-download.use-case';
import { CreateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/create-temporary-incapacity-benefit-rejection.use-case';
import { GetTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/get-temporary-incapacity-benefit-rejection.use-case';
import { SaveTemporaryIncapacityBenefitRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/save-temporary-incapacity-benefit-rejection-periods.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-disability-analysis.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection-insured-status.use-case';
import { UpdateTemporaryIncapacityBenefitRejectionUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/update-temporary-incapacity-benefit-rejection.use-case';
import { UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/use-case/upload-temporary-incapacity-benefit-rejection-documents.use-case';
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

@CustomerControllerRoute('analysis-tool/temporary-incapacity-benefit-rejection')
export class TemporaryIncapacityBenefitRejectionController {
  protected readonly _type = TemporaryIncapacityBenefitRejectionController.name;

  public constructor(
    private readonly createTemporaryIncapacityBenefitRejectionUseCase: CreateTemporaryIncapacityBenefitRejectionUseCase,
    private readonly getTemporaryIncapacityBenefitRejectionUseCase: GetTemporaryIncapacityBenefitRejectionUseCase,
    private readonly updateTemporaryIncapacityBenefitRejectionUseCase: UpdateTemporaryIncapacityBenefitRejectionUseCase,
    private readonly uploadTemporaryIncapacityBenefitRejectionDocumentsUseCase: UploadTemporaryIncapacityBenefitRejectionDocumentsUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase: CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase: CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    private readonly updateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase: UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionInsuredStatusUseCase: CreateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    private readonly updateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase: UpdateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase,
    private readonly saveTemporaryIncapacityBenefitRejectionPeriodsUseCase: SaveTemporaryIncapacityBenefitRejectionPeriodsUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase: CreateTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionResultUseCase: CreateTemporaryIncapacityBenefitRejectionResultUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase: CreateTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase,
    private readonly createTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase: CreateTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitRejectionRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTemporaryIncapacityBenefitRejectionRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetTemporaryIncapacityBenefitRejectionResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getById(
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<GetTemporaryIncapacityBenefitRejectionResponseDto> {
    return await this.getTemporaryIncapacityBenefitRejectionUseCase.execute(
      temporaryIncapacityBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitRejectionRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body() dto: UpdateTemporaryIncapacityBenefitRejectionRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitRejectionResponseDto> {
    return await this.updateTemporaryIncapacityBenefitRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/document',
      method: RequestMethod.POST,
      type: UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body() dto: UploadTemporaryIncapacityBenefitRejectionDocumentsRequestDto,
  ): Promise<UploadTemporaryIncapacityBenefitRejectionDocumentsResponseDto> {
    return await this.uploadTemporaryIncapacityBenefitRejectionDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionInssDecisionAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar análise de incapacidade da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/disability-analysis',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de incapacidade criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body()
    dto: CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de incapacidade da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/disability-analysis',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de incapacidade atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDisabilityAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body()
    dto: UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto> {
    return await this.updateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar situação do segurado da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/insured-status',
      method: RequestMethod.POST,
      type: CreateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Situação do segurado criada com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body()
    dto: CreateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar situação do segurado da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/insured-status',
      method: RequestMethod.PATCH,
      type: UpdateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Situação do segurado atualizada com sucesso.',
      type: UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateInsuredStatus(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body()
    dto: UpdateTemporaryIncapacityBenefitRejectionInsuredStatusRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitRejectionInsuredStatusResponseDto> {
    return await this.updateTemporaryIncapacityBenefitRejectionInsuredStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar vínculos empregatícios da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/work-periods',
      method: RequestMethod.POST,
      type: SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Vínculos empregatícios salvos com sucesso.',
      type: SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveWorkPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Body()
    dto: SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto,
  ): Promise<SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto> {
    return await this.saveTemporaryIncapacityBenefitRejectionPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar pré-análise da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Pré-análise gerada com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionFirstAnalysisResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado da análise de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreateTemporaryIncapacityBenefitRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionResultResponseDto> {
    return await this.createTemporaryIncapacityBenefitRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/complete-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
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
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada de indeferimento de auxílio por incapacidade temporária',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: {
      path: ':temporaryIncapacityBenefitRejectionId/simplified-analysis-download',
      method: RequestMethod.POST,
    },
    tag: ['auxilio-incapacidade-temporaria-indeferimento'],
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
      'temporaryIncapacityBenefitRejectionId',
      new ParseValueObjectPipe(TemporaryIncapacityBenefitRejectionId),
    )
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.createTemporaryIncapacityBenefitRejectionSimplifiedAnalysisDownloadUseCase.execute(
      sessionData,
      organizationSessionData,
      temporaryIncapacityBenefitRejectionId,
      format,
    );
  }
}
