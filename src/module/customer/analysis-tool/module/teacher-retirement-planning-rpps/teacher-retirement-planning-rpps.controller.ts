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
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/analyze-teacher-retirement-planning-administrative-process.request.dto';
import { CreateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning-period.request.dto';
import { CreateTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning-remuneration.request.dto';
import { CreateTeacherRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/create-teacher-retirement-planning.request.dto';
import { ListTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/list-teacher-retirement-planning-remuneration.request.dto';
import { UpdateTeacherRetirementPlanningPeriodRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/update-teacher-retirement-planning-period.request.dto';
import { UpdateTeacherRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/update-teacher-retirement-planning-remuneration.request.dto';
import { UpdateTeacherRetirementPlanningRppsRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/request/update-teacher-retirement-planning.request.dto';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/analyze-teacher-retirement-planning-administrative-process.response.dto';
import { CreateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-period.response.dto';
import { CreateTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-remuneration.response.dto';
import { CreateTeacherRetirementPlanningResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-result.response.dto';
import { CreateTeacherRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning.response.dto';
import { DeleteTeacherRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/delete-teacher-retirement-planning.response.dto';
import { GetTeacherRetirementPlanningRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning-remuneration-calculation.response.dto';
import { GetTeacherRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning.response.dto';
import { ListTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/list-teacher-retirement-planning-remuneration.response.dto';
import { UpdateTeacherRetirementPlanningPeriodResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/update-teacher-retirement-planning-period.response.dto';
import { UpdateTeacherRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/update-teacher-retirement-planning-remuneration.response.dto';
import { UpdateTeacherRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/update-teacher-retirement-planning.response.dto';
import { AnalyzeTeacherRetirementPlanningAdministrativeProcessRppsUseCase } from './use-case/analyze-teacher-retirement-planning-administrative-process-rpps.use-case';
import { CreateTeacherRetirementPlanningPeriodRppsUseCase } from './use-case/create-teacher-retirement-planning-period-rpps.use-case';
import { CreateTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/create-teacher-retirement-planning-remuneration-rpps.use-case';
import { CreateTeacherRetirementPlanningResultRppsUseCase } from './use-case/create-teacher-retirement-planning-result-rpps.use-case';
import { CreateTeacherRetirementPlanningRppsUseCase } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/use-case/create-teacher-retirement-planning-rpps.use-case';
import { DeleteTeacherRetirementPlanningRppsUseCase } from './use-case/delete-teacher-retirement-planning-rpps.use-case';
import { DownloadTeacherRetirementPlanningCompleteAnalysisRppsUseCase } from './use-case/download-teacher-retirement-planning-complete-analysis-rpps.use-case';
import { DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase } from './use-case/download-teacher-retirement-planning-simplified-analysis-rpps.use-case';
import { GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase } from './use-case/get-teacher-retirement-planning-remuneration-calculation-rpps.use-case';
import { GetTeacherRetirementPlanningRppsUseCase } from './use-case/get-teacher-retirement-planning-rpps.use-case';
import { ListTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/list-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningPeriodRppsUseCase } from './use-case/update-teacher-retirement-planning-period-rpps.use-case';
import { UpdateTeacherRetirementPlanningRemunerationRppsUseCase } from './use-case/update-teacher-retirement-planning-remuneration-rpps.use-case';
import { UpdateTeacherRetirementPlanningRppsUseCase } from './use-case/update-teacher-retirement-planning-rpps.use-case';
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
    private readonly createTeacherRetirementPlanningUseCase: CreateTeacherRetirementPlanningRppsUseCase,
    private readonly updateTeacherRetirementPlanningUseCase: UpdateTeacherRetirementPlanningRppsUseCase,
    private readonly getTeacherRetirementPlanningRppsUseCase: GetTeacherRetirementPlanningRppsUseCase,
    private readonly deleteTeacherRetirementPlanningUseCase: DeleteTeacherRetirementPlanningRppsUseCase,
    private readonly createTeacherRetirementPlanningRppsResultUseCase: CreateTeacherRetirementPlanningResultRppsUseCase,
    private readonly downloadTeacherRetirementPlanningRppsCompleteAnalysisUseCase: DownloadTeacherRetirementPlanningCompleteAnalysisRppsUseCase,
    private readonly downloadTeacherRetirementPlanningRppsSimplifiedAnalysisUseCase: DownloadTeacherRetirementPlanningSimplifiedAnalysisRppsUseCase,
    private readonly createTeacherRetirementPlanningRppsPeriodUseCase: CreateTeacherRetirementPlanningPeriodRppsUseCase,
    private readonly createTeacherRetirementPlanningRppsRemunerationUseCase: CreateTeacherRetirementPlanningRemunerationRppsUseCase,
    private readonly updateTeacherRetirementPlanningRppsPeriodUseCase: UpdateTeacherRetirementPlanningPeriodRppsUseCase,
    private readonly updateTeacherRetirementPlanningRppsRemunerationUseCase: UpdateTeacherRetirementPlanningRemunerationRppsUseCase,
    private readonly listTeacherRetirementPlanningRppsRemunerationUseCase: ListTeacherRetirementPlanningRemunerationRppsUseCase,
    private readonly getTeacherRetirementPlanningRppsRemunerationCalculationUseCase: GetTeacherRetirementPlanningRemunerationCalculationRppsUseCase,
    private readonly analyzeTeacherRetirementPlanningRppsAdministrativeProcessUseCase: AnalyzeTeacherRetirementPlanningAdministrativeProcessRppsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTeacherRetirementPlanningRppsRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Planejamento de aposentadoria de professor (RPPS) criado com sucesso.',
      type: CreateTeacherRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateTeacherRetirementPlanningRppsRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRppsResponseDto> {
    return this.createTeacherRetirementPlanningUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar planejamento de aposentadoria de professor (RPPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':teacherRetirementPlanningId',
      method: RequestMethod.PATCH,
      type: UpdateTeacherRetirementPlanningRppsRequestDto,
    },
    tag: ['planejamento-aposentadoria-professor-rpps'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Planejamento de aposentadoria de professor (RPPS) atualizado com sucesso.',
      type: UpdateTeacherRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Body() dto: UpdateTeacherRetirementPlanningRppsRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRppsResponseDto> {
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
      type: GetTeacherRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsResponseDto> {
    return this.getTeacherRetirementPlanningRppsUseCase.execute(
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
      type: DeleteTeacherRetirementPlanningRppsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async delete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'teacherRetirementPlanningId',
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<DeleteTeacherRetirementPlanningRppsResponseDto> {
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<CreateTeacherRetirementPlanningResultResponseDto> {
    return this.createTeacherRetirementPlanningRppsResultUseCase.execute(
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
    return this.createTeacherRetirementPlanningRppsPeriodUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Body() dto: UpdateTeacherRetirementPlanningPeriodRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningPeriodResponseDto> {
    return this.updateTeacherRetirementPlanningRppsPeriodUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Body() dto: CreateTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<CreateTeacherRetirementPlanningRemunerationResponseDto> {
    return this.createTeacherRetirementPlanningRppsRemunerationUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Body() dto: UpdateTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<UpdateTeacherRetirementPlanningRemunerationResponseDto> {
    return this.updateTeacherRetirementPlanningRppsRemunerationUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Query() dto: ListTeacherRetirementPlanningRemunerationRequestDto,
  ): Promise<ListTeacherRetirementPlanningRemunerationResponseDto> {
    return this.listTeacherRetirementPlanningRppsRemunerationUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRemunerationCalculationResponseDto> {
    return this.getTeacherRetirementPlanningRppsRemunerationCalculationUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningRppsCompleteAnalysisUseCase.execute(
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
      new ParseValueObjectPipe(TeacherRetirementPlanningRppsId),
    )
    teacherRetirementPlanningId: TeacherRetirementPlanningRppsId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadTeacherRetirementPlanningRppsSimplifiedAnalysisUseCase.execute(
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
    return this.analyzeTeacherRetirementPlanningRppsAdministrativeProcessUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
