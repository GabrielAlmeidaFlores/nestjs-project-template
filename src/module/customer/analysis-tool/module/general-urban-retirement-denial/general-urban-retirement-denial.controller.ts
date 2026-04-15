import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { CreateGeneralUrbanRetirementDenialRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/create-general-urban-retirement-denial.request.dto';
import { SaveGeneralUrbanRetirementDenialPeriodsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/save-general-urban-retirement-denial-periods.request.dto';
import { UpdateGeneralUrbanRetirementDenialRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/update-general-urban-retirement-denial.request.dto';
import { UploadGeneralUrbanRetirementDenialDocumentsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/upload-general-urban-retirement-denial-documents.request.dto';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-first-analysis.response.dto';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial-inss-decision-analysis.response.dto';
import { CreateGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/create-general-urban-retirement-denial.response.dto';
import { GetGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/get-general-urban-retirement-denial.response.dto';
import { SaveGeneralUrbanRetirementDenialPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/save-general-urban-retirement-denial-periods.response.dto';
import { UpdateGeneralUrbanRetirementDenialResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/update-general-urban-retirement-denial.response.dto';
import { UploadGeneralUrbanRetirementDenialDocumentsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/upload-general-urban-retirement-denial-documents.response.dto';
import { CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-first-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial-inss-decision-analysis.use-case';
import { CreateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/create-general-urban-retirement-denial.use-case';
import { GetGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/get-general-urban-retirement-denial.use-case';
import { SaveGeneralUrbanRetirementDenialPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/save-general-urban-retirement-denial-periods.use-case';
import { UpdateGeneralUrbanRetirementDenialUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/update-general-urban-retirement-denial.use-case';
import { UploadGeneralUrbanRetirementDenialDocumentsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/use-case/upload-general-urban-retirement-denial-documents.use-case';
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

@CustomerControllerRoute('analysis-tool/general-urban-retirement-denial')
export class GeneralUrbanRetirementDenialController {
  protected readonly _type = GeneralUrbanRetirementDenialController.name;

  public constructor(
    private readonly createGeneralUrbanRetirementDenialUseCase: CreateGeneralUrbanRetirementDenialUseCase,
    private readonly getGeneralUrbanRetirementDenialUseCase: GetGeneralUrbanRetirementDenialUseCase,
    private readonly uploadGeneralUrbanRetirementDenialDocumentsUseCase: UploadGeneralUrbanRetirementDenialDocumentsUseCase,
    private readonly createGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase: CreateGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase,
    private readonly createGeneralUrbanRetirementDenialFirstAnalysisUseCase: CreateGeneralUrbanRetirementDenialFirstAnalysisUseCase,
    private readonly saveGeneralUrbanRetirementDenialPeriodsUseCase: SaveGeneralUrbanRetirementDenialPeriodsUseCase,
    private readonly updateGeneralUrbanRetirementDenialUseCase: UpdateGeneralUrbanRetirementDenialUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementDenialRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise criada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateGeneralUrbanRetirementDenialRequestDto,
  ): Promise<CreateGeneralUrbanRetirementDenialResponseDto> {
    return await this.createGeneralUrbanRetirementDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise obtida com sucesso.',
      type: GetGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<GetGeneralUrbanRetirementDenialResponseDto> {
    return await this.getGeneralUrbanRetirementDenialUseCase.execute(
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Enviar documentos da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/documents',
      method: RequestMethod.POST,
      type: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadGeneralUrbanRetirementDenialDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: UploadGeneralUrbanRetirementDenialDocumentsRequestDto,
  ): Promise<UploadGeneralUrbanRetirementDenialDocumentsResponseDto> {
    return await this.uploadGeneralUrbanRetirementDenialDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar análise da decisão do INSS da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise da decisão do INSS gerada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialInssDecisionAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementDenialInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Gerar first analysis da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis gerada com sucesso.',
      type: CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
  ): Promise<CreateGeneralUrbanRetirementDenialFirstAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementDenialFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementDenialRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise atualizada com sucesso.',
      type: UpdateGeneralUrbanRetirementDenialResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: UpdateGeneralUrbanRetirementDenialRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementDenialResponseDto> {
    return await this.updateGeneralUrbanRetirementDenialUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Salvar períodos da análise de indeferimento de aposentadoria urbana comum',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':id/period',
      method: RequestMethod.PATCH,
      type: SaveGeneralUrbanRetirementDenialPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos salvos com sucesso.',
      type: SaveGeneralUrbanRetirementDenialPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async savePeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('id', new ParseValueObjectPipe(GeneralUrbanRetirementDenialId))
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    @Body() dto: SaveGeneralUrbanRetirementDenialPeriodsRequestDto,
  ): Promise<SaveGeneralUrbanRetirementDenialPeriodsResponseDto> {
    return await this.saveGeneralUrbanRetirementDenialPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementDenialId,
      dto,
    );
  }
}
