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
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import { CreateRetirementPermanentDisabilityRejectionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/create-retirement-permanent-disability-rejection.request.dto';
import { SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-incapacity.request.dto';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-insured-quality.request.dto';
import { SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/save-retirement-permanent-disability-rejection-periods.request.dto';
import { UpdateRetirementPermanentDisabilityRejectionRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/update-retirement-permanent-disability-rejection.request.dto';
import { UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/request/upload-retirement-permanent-disability-rejection-documents.request.dto';
import { CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection-first-analysis.response.dto';
import { CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection-inss-decision-analysis.response.dto';
import { CreateRetirementPermanentDisabilityRejectionResultResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection-result.response.dto';
import { CreateRetirementPermanentDisabilityRejectionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/create-retirement-permanent-disability-rejection.response.dto';
import { GetRetirementPermanentDisabilityRejectionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/get-retirement-permanent-disability-rejection.response.dto';
import { SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-incapacity.response.dto';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-insured-quality.response.dto';
import { SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/save-retirement-permanent-disability-rejection-periods.response.dto';
import { UpdateRetirementPermanentDisabilityRejectionResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/update-retirement-permanent-disability-rejection.response.dto';
import { UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/dto/response/upload-retirement-permanent-disability-rejection-documents.response.dto';
import { CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-first-analysis.use-case';
import { CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-inss-decision-analysis.use-case';
import { CreateRetirementPermanentDisabilityRejectionResultUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection-result.use-case';
import { CreateRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/create-retirement-permanent-disability-rejection.use-case';
import { DownloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/download-retirement-permanent-disability-rejection-complete-analysis.use-case';
import { DownloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/download-retirement-permanent-disability-rejection-simplified-analysis.use-case';
import { GetRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/get-retirement-permanent-disability-rejection.use-case';
import { SaveRetirementPermanentDisabilityRejectionIncapacityUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-incapacity.use-case';
import { SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-insured-quality.use-case';
import { SaveRetirementPermanentDisabilityRejectionPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/save-retirement-permanent-disability-rejection-periods.use-case';
import { UpdateRetirementPermanentDisabilityRejectionUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/update-retirement-permanent-disability-rejection.use-case';
import { UploadRetirementPermanentDisabilityRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/use-case/upload-retirement-permanent-disability-rejection-documents.use-case';
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
  'analysis-tool/retirement-permanent-disability-rejection',
)
export class RetirementPermanentDisabilityRejectionController {
  protected readonly _type =
    RetirementPermanentDisabilityRejectionController.name;

  public constructor(
    private readonly createRetirementPermanentDisabilityRejectionUseCase: CreateRetirementPermanentDisabilityRejectionUseCase,
    private readonly getRetirementPermanentDisabilityRejectionUseCase: GetRetirementPermanentDisabilityRejectionUseCase,
    private readonly uploadRetirementPermanentDisabilityRejectionDocumentsUseCase: UploadRetirementPermanentDisabilityRejectionDocumentsUseCase,
    private readonly createRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase: CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase,
    private readonly saveRetirementPermanentDisabilityRejectionIncapacityUseCase: SaveRetirementPermanentDisabilityRejectionIncapacityUseCase,
    private readonly saveRetirementPermanentDisabilityRejectionInsuredQualityUseCase: SaveRetirementPermanentDisabilityRejectionInsuredQualityUseCase,
    private readonly createRetirementPermanentDisabilityRejectionFirstAnalysisUseCase: CreateRetirementPermanentDisabilityRejectionFirstAnalysisUseCase,
    private readonly saveRetirementPermanentDisabilityRejectionPeriodsUseCase: SaveRetirementPermanentDisabilityRejectionPeriodsUseCase,
    private readonly updateRetirementPermanentDisabilityRejectionUseCase: UpdateRetirementPermanentDisabilityRejectionUseCase,
    private readonly createRetirementPermanentDisabilityRejectionResultUseCase: CreateRetirementPermanentDisabilityRejectionResultUseCase,
    private readonly downloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase: DownloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase,
    private readonly downloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase: DownloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar análise de indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRetirementPermanentDisabilityRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateRetirementPermanentDisabilityRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRetirementPermanentDisabilityRejectionRequestDto,
  ): Promise<CreateRetirementPermanentDisabilityRejectionResponseDto> {
    return await this.createRetirementPermanentDisabilityRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetRetirementPermanentDisabilityRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<GetRetirementPermanentDisabilityRejectionResponseDto> {
    return await this.getRetirementPermanentDisabilityRejectionUseCase.execute(
      retirementPermanentDisabilityRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPermanentDisabilityRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateRetirementPermanentDisabilityRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Body() dto: UpdateRetirementPermanentDisabilityRejectionRequestDto,
  ): Promise<UpdateRetirementPermanentDisabilityRejectionResponseDto> {
    return await this.updateRetirementPermanentDisabilityRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/documents',
      method: RequestMethod.PATCH,
      type: UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos enviados com sucesso.',
      type: UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Body()
    dto: UploadRetirementPermanentDisabilityRejectionDocumentsRequestDto,
  ): Promise<UploadRetirementPermanentDisabilityRejectionDocumentsResponseDto> {
    return await this.uploadRetirementPermanentDisabilityRejectionDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<CreateRetirementPermanentDisabilityRejectionInssDecisionAnalysisResponseDto> {
    return await this.createRetirementPermanentDisabilityRejectionInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar dados de incapacidade do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/incapacity',
      method: RequestMethod.PATCH,
      type: SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados de incapacidade salvos com sucesso.',
      type: SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveIncapacity(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Body() dto: SaveRetirementPermanentDisabilityRejectionIncapacityRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionIncapacityResponseDto> {
    return await this.saveRetirementPermanentDisabilityRejectionIncapacityUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar dados de qualidade de segurado do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/insured-quality',
      method: RequestMethod.PATCH,
      type: SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados de qualidade de segurado salvos com sucesso.',
      type: SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveInsuredQuality(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Body()
    dto: SaveRetirementPermanentDisabilityRejectionInsuredQualityRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionInsuredQualityResponseDto> {
    return await this.saveRetirementPermanentDisabilityRejectionInsuredQualityUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar primeira análise do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Primeira análise gerada com sucesso.',
      type: CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<CreateRetirementPermanentDisabilityRejectionFirstAnalysisResponseDto> {
    return await this.createRetirementPermanentDisabilityRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar resultado completo do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado gerado com sucesso.',
      type: CreateRetirementPermanentDisabilityRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
  ): Promise<CreateRetirementPermanentDisabilityRejectionResultResponseDto> {
    return await this.createRetirementPermanentDisabilityRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar períodos do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/periods',
      method: RequestMethod.PATCH,
      type: SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos salvos com sucesso.',
      type: SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async savePeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Body() dto: SaveRetirementPermanentDisabilityRejectionPeriodsRequestDto,
  ): Promise<SaveRetirementPermanentDisabilityRejectionPeriodsResponseDto> {
    return await this.saveRetirementPermanentDisabilityRejectionPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise completa do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/complete',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadRetirementPermanentDisabilityRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada do indeferimento de aposentadoria por incapacidade permanente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/download/simplified',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-incapacidade-permanente'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo gerado com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'id',
      new ParseValueObjectPipe(RetirementPermanentDisabilityRejectionId),
    )
    retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return await this.downloadRetirementPermanentDisabilityRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPermanentDisabilityRejectionId,
      format,
    );
  }
}
