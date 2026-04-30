import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import { AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/analyze-teacher-retirement-planning-rejection-time-accelerator.request.dto';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/analyze-teacher-retirement-planning-rejection-work-period-documents.request.dto';
import { CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-time-accelerator.request.dto';
import { CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-work-period.request.dto';
import { CreateTeacherRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection.request.dto';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/save-teacher-retirement-planning-rejection-teaching-periods.request.dto';
import { UpdateTeacherRetirementPlanningRejectionRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/update-teacher-retirement-planning-rejection.request.dto';
import { UploadTeacherRetirementPlanningRejectionDocumentsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/upload-teacher-retirement-planning-rejection-documents.request.dto';
import { AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/analyze-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/analyze-teacher-retirement-planning-rejection-work-period-documents.response.dto';
import { CreateTeacherRetirementPlanningRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-first-analysis.response.dto';
import { CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-inss-decision-analysis.response.dto';
import { CreateTeacherRetirementPlanningRejectionResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-result.response.dto';
import { CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection-work-period.response.dto';
import { CreateTeacherRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/create-teacher-retirement-planning-rejection.response.dto';
import { DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/delete-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/delete-teacher-retirement-planning-rejection-work-period.response.dto';
import { GetTeacherRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/get-teacher-retirement-planning-rejection.response.dto';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/save-teacher-retirement-planning-rejection-teaching-periods.response.dto';
import { UpdateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/update-teacher-retirement-planning-rejection-time-accelerator.response.dto';
import { UpdateTeacherRetirementPlanningRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/update-teacher-retirement-planning-rejection-work-period.response.dto';
import { UpdateTeacherRetirementPlanningRejectionResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/update-teacher-retirement-planning-rejection.response.dto';
import { UploadTeacherRetirementPlanningRejectionDocumentsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/upload-teacher-retirement-planning-rejection-documents.response.dto';
import { AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/analyze-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/analyze-teacher-retirement-planning-rejection-work-period-documents.use-case';
import { CreateTeacherRetirementPlanningRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-first-analysis.use-case';
import { CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-inss-decision-analysis.use-case';
import { CreateTeacherRetirementPlanningRejectionResultUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-result.use-case';
import { CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection-work-period.use-case';
import { CreateTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/create-teacher-retirement-planning-rejection.use-case';
import { DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/delete-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/delete-teacher-retirement-planning-rejection-work-period.use-case';
import { DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/download-teacher-retirement-planning-rejection-complete-analysis.use-case';
import { DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/download-teacher-retirement-planning-rejection-simplified-analysis.use-case';
import { GetTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/get-teacher-retirement-planning-rejection.use-case';
import { SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/save-teacher-retirement-planning-rejection-teaching-periods.use-case';
import { UpdateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection-time-accelerator.use-case';
import { UpdateTeacherRetirementPlanningRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection-work-period.use-case';
import { UpdateTeacherRetirementPlanningRejectionUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/update-teacher-retirement-planning-rejection.use-case';
import { UploadTeacherRetirementPlanningRejectionDocumentsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/use-case/upload-teacher-retirement-planning-rejection-documents.use-case';
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

@CustomerControllerRoute('analysis-tool/teacher-retirement-planning-rejection')
export class TeacherRetirementPlanningRejectionController {
  protected readonly _type = TeacherRetirementPlanningRejectionController.name;

  public constructor(
    private readonly createTeacherRetirementPlanningRejectionUseCase: CreateTeacherRetirementPlanningRejectionUseCase,
    private readonly updateTeacherRetirementPlanningRejectionUseCase: UpdateTeacherRetirementPlanningRejectionUseCase,
    private readonly getTeacherRetirementPlanningRejectionUseCase: GetTeacherRetirementPlanningRejectionUseCase,
    private readonly saveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase: SaveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase,
    private readonly uploadTeacherRetirementPlanningRejectionDocumentsUseCase: UploadTeacherRetirementPlanningRejectionDocumentsUseCase,
    private readonly createTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase: CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase,
    private readonly createTeacherRetirementPlanningRejectionFirstAnalysisUseCase: CreateTeacherRetirementPlanningRejectionFirstAnalysisUseCase,
    private readonly createTeacherRetirementPlanningRejectionWorkPeriodUseCase: CreateTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    private readonly updateTeacherRetirementPlanningRejectionWorkPeriodUseCase: UpdateTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    private readonly deleteTeacherRetirementPlanningRejectionWorkPeriodUseCase: DeleteTeacherRetirementPlanningRejectionWorkPeriodUseCase,
    private readonly analyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase,
    private readonly createTeacherRetirementPlanningRejectionTimeAcceleratorUseCase: CreateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly updateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase: UpdateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly deleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase: DeleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly analyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase: AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase,
    private readonly createTeacherRetirementPlanningRejectionResultUseCase: CreateTeacherRetirementPlanningRejectionResultUseCase,
    private readonly downloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase: DownloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase,
    private readonly downloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase: DownloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de aposentadoria do professor',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de indeferimento de aposentadoria do professor criada com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTeacherRetirementPlanningRejectionRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionResponseDto> {
    return this.createTeacherRetirementPlanningRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de aposentadoria do professor por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria do professor retornada com sucesso.',
      type: GetTeacherRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<GetTeacherRetirementPlanningRejectionResponseDto> {
    return this.getTeacherRetirementPlanningRejectionUseCase.execute(
      teacherRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise de indeferimento de aposentadoria do professor',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateTeacherRetirementPlanningRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria do professor atualizada com sucesso.',
      type: UpdateTeacherRetirementPlanningRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body() dto: UpdateTeacherRetirementPlanningRejectionRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRejectionResponseDto> {
    return this.updateTeacherRetirementPlanningRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Salvar períodos de docência da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/teaching-period',
      method: RequestMethod.PATCH,
      type: SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos de docência salvos com sucesso.',
      type: SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async saveTeachingPeriods(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto,
  ): Promise<SaveTeacherRetirementPlanningRejectionTeachingPeriodsResponseDto> {
    return this.saveTeacherRetirementPlanningRejectionTeachingPeriodsUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Upload de documentos da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/document',
      method: RequestMethod.POST,
      type: UploadTeacherRetirementPlanningRejectionDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Documentos enviados com sucesso.',
      type: UploadTeacherRetirementPlanningRejectionDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async uploadDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: UploadTeacherRetirementPlanningRejectionDocumentsRequestDto,
  ): Promise<UploadTeacherRetirementPlanningRejectionDocumentsResponseDto> {
    return this.uploadTeacherRetirementPlanningRejectionDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar análise de decisão do INSS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/inss-decision-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de decisão do INSS criada com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createInssDecisionAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<CreateTeacherRetirementPlanningRejectionInssDecisionAnalysisResponseDto> {
    return this.createTeacherRetirementPlanningRejectionInssDecisionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'First analysis criada com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<CreateTeacherRetirementPlanningRejectionFirstAnalysisResponseDto> {
    return this.createTeacherRetirementPlanningRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/work-period',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período de trabalho criado com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionWorkPeriodResponseDto> {
    return this.createTeacherRetirementPlanningRejectionWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/work-period',
      method: RequestMethod.PATCH,
      type: CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho atualizado com sucesso.',
      type: UpdateTeacherRetirementPlanningRejectionWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: CreateTeacherRetirementPlanningRejectionWorkPeriodRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRejectionWorkPeriodResponseDto> {
    return this.updateTeacherRetirementPlanningRejectionWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/work-period/:teacherRetirementPlanningRejectionWorkPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho excluído com sucesso.',
      type: DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Param(
      'teacherRetirementPlanningRejectionWorkPeriodId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionWorkPeriodId),
    )
    teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): Promise<DeleteTeacherRetirementPlanningRejectionWorkPeriodResponseDto> {
    return this.deleteTeacherRetirementPlanningRejectionWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      teacherRetirementPlanningRejectionWorkPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':analysisToolClientId/analyze-work-period-documents',
      method: RequestMethod.POST,
      type: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do período de trabalho analisados com sucesso.',
      type: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeWorkPeriodDocuments(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
    @Body()
    dto: AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto[]
  > {
    return this.analyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolClientId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/time-accelerator',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Acelerador de tempo criado com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return this.createTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/time-accelerator',
      method: RequestMethod.PATCH,
      type: CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo atualizado com sucesso.',
      type: UpdateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Body()
    dto: CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return this.updateTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/time-accelerator/:teacherRetirementPlanningRejectionTimeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo excluído com sucesso.',
      type: DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Param(
      'teacherRetirementPlanningRejectionTimeAcceleratorId',
      new ParseValueObjectPipe(
        TeacherRetirementPlanningRejectionTimeAcceleratorId,
      ),
    )
    teacherRetirementPlanningRejectionTimeAcceleratorId: TeacherRetirementPlanningRejectionTimeAcceleratorId,
  ): Promise<DeleteTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return this.deleteTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      teacherRetirementPlanningRejectionTimeAcceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do acelerador de tempo analisados com sucesso.',
      type: AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto> {
    return this.analyzeTeacherRetirementPlanningRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreateTeacherRetirementPlanningRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<CreateTeacherRetirementPlanningRejectionResultResponseDto> {
    return this.createTeacherRetirementPlanningRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da análise de indeferimento',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise completa baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteVersion(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise simplificada de indeferimento de aposentadoria do professor',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningRejectionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-professor'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise simplificada baixada com sucesso.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedVersion(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningRejectionId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRejectionId),
    )
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningRejectionId,
      format,
    );
  }
}
