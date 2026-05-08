import {
  Body,
  HttpStatus,
  Param,
  Query,
  RequestMethod,
  StreamableFile,
  ParseEnumPipe,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/analyze-teacher-retirement-planning-administrative-process.request.dto';
import { CreateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning-period.request.dto';
import { CreateTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning-remuneration.request.dto';
import { CreateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/create-teacher-retirement-planning.request.dto';
import { ListTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/list-teacher-retirement-planning-remuneration.request.dto';
import { UpdateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/update-teacher-retirement-planning-period.request.dto';
import { UpdateTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/update-teacher-retirement-planning-remuneration.request.dto';
import { UpdateTeacherRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/update-teacher-retirement-planning.request.dto';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/analyze-teacher-retirement-planning-administrative-process.response.dto';
import { CreateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-period.response.dto';
import { CreateTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-remuneration.response.dto';
import { CreateTeacherRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning-result.response.dto';
import { CreateTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/create-teacher-retirement-planning.response.dto';
import { DeleteTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/delete-teacher-retirement-planning.response.dto';
import { GetTeacherRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/get-teacher-retirement-planning-remuneration-calculation.response.dto';
import { GetTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/get-teacher-retirement-planning.response.dto';
import { ListTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/list-teacher-retirement-planning-remuneration.response.dto';
import { UpdateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/update-teacher-retirement-planning-period.response.dto';
import { UpdateTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/update-teacher-retirement-planning-remuneration.response.dto';
import { UpdateTeacherRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/update-teacher-retirement-planning.response.dto';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/analyze-teacher-retirement-planning-administrative-process.use-case';
import { CreateTeacherRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-period.use-case';
import { CreateTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-remuneration.use-case';
import { CreateTeacherRetirementPlanningResultUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning-result.use-case';
import { CreateTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/create-teacher-retirement-planning.use-case';
import { DeleteTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/delete-teacher-retirement-planning.use-case';
import { DownloadTeacherRetirementPlanningCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/download-teacher-retirement-planning-complete-analysis.use-case';
import { DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/download-teacher-retirement-planning-simplified-analysis.use-case';
import { GetTeacherRetirementPlanningRemunerationCalculationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/get-teacher-retirement-planning-remuneration-calculation.use-case';
import { GetTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/get-teacher-retirement-planning.use-case';
import { ListTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/list-teacher-retirement-planning-remuneration.use-case';
import { UpdateTeacherRetirementPlanningPeriodUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning-period.use-case';
import { UpdateTeacherRetirementPlanningRemunerationUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning-remuneration.use-case';
import { UpdateTeacherRetirementPlanningUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning/use-case/update-teacher-retirement-planning.use-case';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
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

@CustomerControllerRoute('analysis-tool/teacher-retirement-planning-rpps')
export class TeacherRetirementPlanningRppsController {
  protected readonly _type = TeacherRetirementPlanningRppsController.name;

  public constructor(
    private readonly createTeacherRetirementPlanningUseCase: CreateTeacherRetirementPlanningUseCase,
    private readonly updateTeacherRetirementPlanningUseCase: UpdateTeacherRetirementPlanningUseCase,
    private readonly getTeacherRetirementPlanningUseCase: GetTeacherRetirementPlanningUseCase,
    private readonly deleteTeacherRetirementPlanningUseCase: DeleteTeacherRetirementPlanningUseCase,
    private readonly createTeacherRetirementPlanningResultUseCase: CreateTeacherRetirementPlanningResultUseCase,
    private readonly downloadTeacherRetirementPlanningCompleteAnalysisUseCase: DownloadTeacherRetirementPlanningCompleteAnalysisUseCase,
    private readonly downloadTeacherRetirementPlanningSimplifiedAnalysisUseCase: DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase,
    private readonly createTeacherRetirementPlanningPeriodUseCase: CreateTeacherRetirementPlanningPeriodUseCase,
    private readonly createTeacherRetirementPlanningRemunerationUseCase: CreateTeacherRetirementPlanningRemunerationUseCase,
    private readonly updateTeacherRetirementPlanningPeriodUseCase: UpdateTeacherRetirementPlanningPeriodUseCase,
    private readonly updateTeacherRetirementPlanningRemunerationUseCase: UpdateTeacherRetirementPlanningRemunerationUseCase,
    private readonly listTeacherRetirementPlanningRemunerationUseCase: ListTeacherRetirementPlanningRemunerationUseCase,
    private readonly getTeacherRetirementPlanningRemunerationCalculationUseCase: GetTeacherRetirementPlanningRemunerationCalculationUseCase,
    private readonly analyzeTeacherRetirementPlanningAdministrativeProcessUseCase: AnalyzeTeacherRetirementPlanningAdministrativeProcessUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Planejamento de aposentadoria de professor (RPPS) criado com sucesso.',
      type: CreateTeacherRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTeacherRetirementPlanningRequestDto,
  ): Promise<CreateTeacherRetirementPlanningResponseDto> {
    return this.createTeacherRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
      AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING_RPPS,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId',
      method: RequestMethod.PATCH,
      type: UpdateTeacherRetirementPlanningRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria de professor (RPPS) atualizado com sucesso.',
      type: UpdateTeacherRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Body() dto: UpdateTeacherRetirementPlanningRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningResponseDto> {
    return this.updateTeacherRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter planejamento de aposentadoria de professor (RPPS) por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria de professor (RPPS) retornado com sucesso.',
      type: GetTeacherRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningResponseDto> {
    return this.getTeacherRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId',
      method: RequestMethod.DELETE,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria de professor (RPPS) excluído com sucesso.',
      type: DeleteTeacherRetirementPlanningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async delete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<DeleteTeacherRetirementPlanningResponseDto> {
    return this.deleteTeacherRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar resultado do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/result',
      method: RequestMethod.POST,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado do planejamento de aposentadoria de professor (RPPS) criado com sucesso.',
      type: CreateTeacherRetirementPlanningResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<CreateTeacherRetirementPlanningResultResponseDto> {
    return this.createTeacherRetirementPlanningResultUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar período do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningPeriodRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateTeacherRetirementPlanningPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTeacherRetirementPlanningPeriodRequestDto,
  ): Promise<CreateTeacherRetirementPlanningPeriodResponseDto> {
    return this.createTeacherRetirementPlanningPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar períodos do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/period',
      method: RequestMethod.PATCH,
      type: UpdateTeacherRetirementPlanningPeriodRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos atualizados com sucesso.',
      type: UpdateTeacherRetirementPlanningPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Body() dto: UpdateTeacherRetirementPlanningPeriodRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningPeriodResponseDto> {
    return this.updateTeacherRetirementPlanningPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar remunerações do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/remuneration',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Remunerações criadas com sucesso.',
      type: CreateTeacherRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Body() dto: CreateTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRemunerationResponseDto> {
    return this.createTeacherRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar remunerações do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/remuneration',
      method: RequestMethod.PATCH,
      type: UpdateTeacherRetirementPlanningRemunerationRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações atualizadas com sucesso.',
      type: UpdateTeacherRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Body() dto: UpdateTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRemunerationResponseDto> {
    return this.updateTeacherRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar remunerações do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/remuneration',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações listadas com sucesso.',
      type: ListTeacherRetirementPlanningRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Query() dto: ListTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<ListTeacherRetirementPlanningRemunerationResponseDto> {
    return this.listTeacherRetirementPlanningRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter cálculo de remunerações do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/remuneration-calculation',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cálculo de remunerações retornado com sucesso.',
      type: GetTeacherRetirementPlanningRemunerationCalculationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRemunerationCalculation(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningRemunerationCalculationResponseDto> {
    return this.getTeacherRetirementPlanningRemunerationCalculationUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise completa do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
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
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise simplificada do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
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
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      teacherRetirementPlanningId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar processo administrativo do planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-administrative-process',
      method: RequestMethod.POST,
      type: AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise do processo administrativo realizada com sucesso.',
      type: AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeAdministrativeProcess(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto> {
    return this.analyzeTeacherRetirementPlanningAdministrativeProcessUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
