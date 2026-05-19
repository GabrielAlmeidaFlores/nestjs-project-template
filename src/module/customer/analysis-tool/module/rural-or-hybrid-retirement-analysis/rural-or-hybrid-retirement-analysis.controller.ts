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
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';
import { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';
import { AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/analyze-rural-or-hybrid-retirement-analysis-time-accelerator.request.dto';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.request.dto';
import { CreateRuralOrHybridRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-period.request.dto';
import { CreateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-testimonial-witness.request.dto';
import { CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-time-accelerator.request.dto';
import { CreateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { CreateRuralOrHybridRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/create-rural-or-hybrid-retirement-analysis.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-time-accelerator.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis-work-period.request.dto';
import { UpdateRuralOrHybridRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/request/update-rural-or-hybrid-retirement-analysis.request.dto';
import { AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/analyze-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.response.dto';
import { CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-first-analysis.response.dto';
import { CreateRuralOrHybridRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-period.response.dto';
import { CreateRuralOrHybridRetirementAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-result.response.dto';
import { CreateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-testimonial-witness.response.dto';
import { CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { CreateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis-work-period.response.dto';
import { CreateRuralOrHybridRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/create-rural-or-hybrid-retirement-analysis.response.dto';
import { DeleteRuralOrHybridRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-period.response.dto';
import { DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-testimonial-witness.response.dto';
import { DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { DeleteRuralOrHybridRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis-work-period.response.dto';
import { DeleteRuralOrHybridRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/delete-rural-or-hybrid-retirement-analysis.response.dto';
import {
  GetRuralOrHybridRetirementAnalysisResponseDto,
  GetRuralOrHybridRetirementAnalysisResultResponseDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/get-rural-or-hybrid-retirement-analysis.response.dto';
import { UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-period.response.dto';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-testimonial-witness.response.dto';
import { UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-time-accelerator.response.dto';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis-work-period.response.dto';
import { UpdateRuralOrHybridRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/update-rural-or-hybrid-retirement-analysis.response.dto';
import { AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/analyze-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/analyze-rural-or-hybrid-retirement-analysis-work-period-documents.use-case';
import { CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-first-analysis.use-case';
import { CreateRuralOrHybridRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-period.use-case';
import { CreateRuralOrHybridRetirementAnalysisResultUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-result.use-case';
import { CreateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-testimonial-witness.use-case';
import { CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { CreateRuralOrHybridRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis-work-period.use-case';
import { CreateRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/create-rural-or-hybrid-retirement-analysis.use-case';
import { DeleteRuralOrHybridRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/delete-rural-or-hybrid-retirement-analysis-period.use-case';
import { DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/delete-rural-or-hybrid-retirement-analysis-testimonial-witness.use-case';
import { DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/delete-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { DeleteRuralOrHybridRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/delete-rural-or-hybrid-retirement-analysis-work-period.use-case';
import { DeleteRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/delete-rural-or-hybrid-retirement-analysis.use-case';
import { DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/download-rural-or-hybrid-retirement-analysis-complete-analysis.use-case';
import { DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/download-rural-or-hybrid-retirement-analysis-simplified-analysis.use-case';
import { GetRuralOrHybridRetirementAnalysisResultUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/get-rural-or-hybrid-retirement-analysis-result.use-case';
import { GetRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/get-rural-or-hybrid-retirement-analysis.use-case';
import { UpdateRuralOrHybridRetirementAnalysisPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-period.use-case';
import { UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-testimonial-witness.use-case';
import { UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-time-accelerator.use-case';
import { UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis-work-period.use-case';
import { UpdateRuralOrHybridRetirementAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/use-case/update-rural-or-hybrid-retirement-analysis.use-case';
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

@CustomerControllerRoute('analysis-tool/rural-or-hybrid-retirement-analysis')
export class RuralOrHybridRetirementAnalysisController {
  protected readonly _type = RuralOrHybridRetirementAnalysisController.name;

  public constructor(
    private readonly createRuralOrHybridRetirementAnalysisUseCase: CreateRuralOrHybridRetirementAnalysisUseCase,
    private readonly updateRuralOrHybridRetirementAnalysisUseCase: UpdateRuralOrHybridRetirementAnalysisUseCase,
    private readonly getRuralOrHybridRetirementAnalysisUseCase: GetRuralOrHybridRetirementAnalysisUseCase,
    private readonly getRuralOrHybridRetirementAnalysisResultUseCase: GetRuralOrHybridRetirementAnalysisResultUseCase,
    private readonly createRuralOrHybridRetirementAnalysisFirstAnalysisUseCase: CreateRuralOrHybridRetirementAnalysisFirstAnalysisUseCase,
    private readonly createRuralOrHybridRetirementAnalysisResultUseCase: CreateRuralOrHybridRetirementAnalysisResultUseCase,
    private readonly createRuralOrHybridRetirementAnalysisPeriodUseCase: CreateRuralOrHybridRetirementAnalysisPeriodUseCase,
    private readonly updateRuralOrHybridRetirementAnalysisPeriodUseCase: UpdateRuralOrHybridRetirementAnalysisPeriodUseCase,
    private readonly createRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase: CreateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase,
    private readonly updateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase: UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase,
    private readonly createRuralOrHybridRetirementAnalysisWorkPeriodUseCase: CreateRuralOrHybridRetirementAnalysisWorkPeriodUseCase,
    private readonly updateRuralOrHybridRetirementAnalysisWorkPeriodUseCase: UpdateRuralOrHybridRetirementAnalysisWorkPeriodUseCase,
    private readonly analyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase,
    private readonly createRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase: CreateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    private readonly updateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase: UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    private readonly analyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase: AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
    private readonly downloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase: DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase,
    private readonly downloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase: DownloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase,
    private readonly deleteRuralOrHybridRetirementAnalysisUseCase: DeleteRuralOrHybridRetirementAnalysisUseCase,
    private readonly deleteRuralOrHybridRetirementAnalysisPeriodUseCase: DeleteRuralOrHybridRetirementAnalysisPeriodUseCase,
    private readonly deleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase: DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase,
    private readonly deleteRuralOrHybridRetirementAnalysisWorkPeriodUseCase: DeleteRuralOrHybridRetirementAnalysisWorkPeriodUseCase,
    private readonly deleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase: DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementAnalysisRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida criada com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRuralOrHybridRetirementAnalysisRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar análise de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementAnalysisRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida atualizada com sucesso.',
      type: UpdateRuralOrHybridRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body() dto: UpdateRuralOrHybridRetirementAnalysisRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisResponseDto> {
    return this.updateRuralOrHybridRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de aposentadoria rural ou híbrida por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida retornada com sucesso.',
      type: GetRuralOrHybridRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<GetRuralOrHybridRetirementAnalysisResponseDto> {
    return this.getRuralOrHybridRetirementAnalysisUseCase.execute(
      ruralOrHybridRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter resultado da análise de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/result',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado da análise retornado com sucesso.',
      type: GetRuralOrHybridRetirementAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getResult(
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<GetRuralOrHybridRetirementAnalysisResultResponseDto> {
    return this.getRuralOrHybridRetirementAnalysisResultUseCase.execute(
      ruralOrHybridRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'First analysis criada com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<CreateRuralOrHybridRetirementAnalysisFirstAnalysisResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado criado com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<CreateRuralOrHybridRetirementAnalysisResultResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/period',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementAnalysisPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body() dto: CreateRuralOrHybridRetirementAnalysisPeriodRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisPeriodResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/period',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body() dto: UpdateRuralOrHybridRetirementAnalysisPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisPeriodResponseDto> {
    return this.updateRuralOrHybridRetirementAnalysisPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar testemunha da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/testimonial-witness',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Testemunha criada com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTestimonialWitness(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body()
    dto: CreateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar testemunha da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/testimonial-witness',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Testemunha atualizada com sucesso.',
      type: UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTestimonialWitness(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body()
    dto: UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto> {
    return this.updateRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/work-period',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período de trabalho criado com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body() dto: CreateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/work-period',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body() dto: UpdateRuralOrHybridRetirementAnalysisWorkPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisWorkPeriodResponseDto> {
    return this.updateRuralOrHybridRetirementAnalysisWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':analysisToolClientId/analyze-work-period-documents',
      method: RequestMethod.POST,
      type: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do período de trabalho analisados com sucesso.',
      type: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto,
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
    dto: AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisItemResponseDto[]
  > {
    return this.analyzeRuralOrHybridRetirementAnalysisWorkPeriodDocumentsUseCase.execute(
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
      path: ':ruralOrHybridRetirementAnalysisId/time-accelerator',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Acelerador de tempo criado com sucesso.',
      type: CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body()
    dto: CreateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
  ): Promise<CreateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    return this.createRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Body()
    dto: UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    return this.updateRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do acelerador de tempo analisados com sucesso.',
      type: AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorRequestDto,
  ): Promise<AnalyzeRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    return this.analyzeRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise completa de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
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
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise simplificada de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
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
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadRuralOrHybridRetirementAnalysisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Deletar análise de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida deletada com sucesso.',
      type: DeleteRuralOrHybridRetirementAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async delete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisResponseDto> {
    return this.deleteRuralOrHybridRetirementAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/period/:ruralOrHybridRetirementAnalysisPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período deletado com sucesso.',
      type: DeleteRuralOrHybridRetirementAnalysisPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deletePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Param(
      'ruralOrHybridRetirementAnalysisPeriodId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisPeriodId),
    )
    ruralOrHybridRetirementAnalysisPeriodId: RuralOrHybridRetirementAnalysisPeriodId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisPeriodResponseDto> {
    return this.deleteRuralOrHybridRetirementAnalysisPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      ruralOrHybridRetirementAnalysisPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar testemunha da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/testimonial-witness/:ruralOrHybridRetirementAnalysisTestimonialWitnessId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Testemunha deletada com sucesso.',
      type: DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTestimonialWitness(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Param(
      'ruralOrHybridRetirementAnalysisTestimonialWitnessId',
      new ParseValueObjectPipe(
        RuralOrHybridRetirementAnalysisTestimonialWitnessId,
      ),
    )
    ruralOrHybridRetirementAnalysisTestimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto> {
    return this.deleteRuralOrHybridRetirementAnalysisTestimonialWitnessUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      ruralOrHybridRetirementAnalysisTestimonialWitnessId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/work-period/:ruralOrHybridRetirementAnalysisWorkPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho deletado com sucesso.',
      type: DeleteRuralOrHybridRetirementAnalysisWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Param(
      'ruralOrHybridRetirementAnalysisWorkPeriodId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisWorkPeriodId),
    )
    ruralOrHybridRetirementAnalysisWorkPeriodId: RuralOrHybridRetirementAnalysisWorkPeriodId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisWorkPeriodResponseDto> {
    return this.deleteRuralOrHybridRetirementAnalysisWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      ruralOrHybridRetirementAnalysisWorkPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementAnalysisId/time-accelerator/:ruralOrHybridRetirementAnalysisTimeAcceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['analise-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo deletado com sucesso.',
      type: DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementAnalysisId',
      new ParseValueObjectPipe(RuralOrHybridRetirementAnalysisId),
    )
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
    @Param(
      'ruralOrHybridRetirementAnalysisTimeAcceleratorId',
      new ParseValueObjectPipe(
        RuralOrHybridRetirementAnalysisTimeAcceleratorId,
      ),
    )
    ruralOrHybridRetirementAnalysisTimeAcceleratorId: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
  ): Promise<DeleteRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto> {
    return this.deleteRuralOrHybridRetirementAnalysisTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementAnalysisId,
      ruralOrHybridRetirementAnalysisTimeAcceleratorId,
    );
  }
}
