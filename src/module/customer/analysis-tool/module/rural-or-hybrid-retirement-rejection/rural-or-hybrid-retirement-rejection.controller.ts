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
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.request.dto';
import { AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/analyze-rural-or-hybrid-retirement-rejection-work-period-documents.request.dto';
import { CreateRuralOrHybridRetirementRejectionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-period.request.dto';
import { CreateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-testimonial-witness.request.dto';
import { CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-time-accelerator.request.dto';
import { CreateRuralOrHybridRetirementRejectionWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection-work-period.request.dto';
import { CreateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/create-rural-or-hybrid-retirement-rejection.request.dto';
import { UpdateRuralOrHybridRetirementRejectionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-period.request.dto';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-testimonial-witness.request.dto';
import { UpdateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-time-accelerator.request.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection-work-period.request.dto';
import { UpdateRuralOrHybridRetirementRejectionRequestDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/request/update-rural-or-hybrid-retirement-rejection.request.dto';
import { AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/analyze-rural-or-hybrid-retirement-rejection-work-period-documents.response.dto';
import { CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-first-analysis.response.dto';
import { CreateRuralOrHybridRetirementRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-period.response.dto';
import { CreateRuralOrHybridRetirementRejectionResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-result.response.dto';
import { CreateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-testimonial-witness.response.dto';
import { CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { CreateRuralOrHybridRetirementRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection-work-period.response.dto';
import { CreateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/create-rural-or-hybrid-retirement-rejection.response.dto';
import { GetRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/get-rural-or-hybrid-retirement-rejection.response.dto';
import { UpdateRuralOrHybridRetirementRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-period.response.dto';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-testimonial-witness.response.dto';
import { UpdateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-time-accelerator.response.dto';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection-work-period.response.dto';
import { UpdateRuralOrHybridRetirementRejectionResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/update-rural-or-hybrid-retirement-rejection.response.dto';
import { AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/analyze-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/analyze-rural-or-hybrid-retirement-rejection-work-period-documents.use-case';
import { CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-first-analysis.use-case';
import { CreateRuralOrHybridRetirementRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-period.use-case';
import { CreateRuralOrHybridRetirementRejectionResultUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-result.use-case';
import { CreateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-testimonial-witness.use-case';
import { CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { CreateRuralOrHybridRetirementRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection-work-period.use-case';
import { CreateRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/create-rural-or-hybrid-retirement-rejection.use-case';
import { DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/download-rural-or-hybrid-retirement-rejection-complete-analysis.use-case';
import { DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/download-rural-or-hybrid-retirement-rejection-simplified-analysis.use-case';
import { GetRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/get-rural-or-hybrid-retirement-rejection.use-case';
import { UpdateRuralOrHybridRetirementRejectionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-period.use-case';
import { UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-testimonial-witness.use-case';
import { UpdateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-time-accelerator.use-case';
import { UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection-work-period.use-case';
import { UpdateRuralOrHybridRetirementRejectionUseCase } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/use-case/update-rural-or-hybrid-retirement-rejection.use-case';
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

@CustomerControllerRoute('analysis-tool/rural-or-hybrid-retirement-rejection')
export class RuralOrHybridRetirementRejectionController {
  protected readonly _type = RuralOrHybridRetirementRejectionController.name;

  public constructor(
    private readonly createRuralOrHybridRetirementRejectionUseCase: CreateRuralOrHybridRetirementRejectionUseCase,
    private readonly updateRuralOrHybridRetirementRejectionUseCase: UpdateRuralOrHybridRetirementRejectionUseCase,
    private readonly getRuralOrHybridRetirementRejectionUseCase: GetRuralOrHybridRetirementRejectionUseCase,
    private readonly createRuralOrHybridRetirementRejectionFirstAnalysisUseCase: CreateRuralOrHybridRetirementRejectionFirstAnalysisUseCase,
    private readonly createRuralOrHybridRetirementRejectionResultUseCase: CreateRuralOrHybridRetirementRejectionResultUseCase,
    private readonly createRuralOrHybridRetirementRejectionPeriodUseCase: CreateRuralOrHybridRetirementRejectionPeriodUseCase,
    private readonly updateRuralOrHybridRetirementRejectionPeriodUseCase: UpdateRuralOrHybridRetirementRejectionPeriodUseCase,
    private readonly createRuralOrHybridRetirementRejectionTestimonialWitnessUseCase: CreateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase,
    private readonly updateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase: UpdateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase,
    private readonly createRuralOrHybridRetirementRejectionWorkPeriodUseCase: CreateRuralOrHybridRetirementRejectionWorkPeriodUseCase,
    private readonly updateRuralOrHybridRetirementRejectionWorkPeriodUseCase: UpdateRuralOrHybridRetirementRejectionWorkPeriodUseCase,
    private readonly analyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase,
    private readonly createRuralOrHybridRetirementRejectionTimeAcceleratorUseCase: CreateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    private readonly updateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase: UpdateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    private readonly analyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase,
    private readonly downloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase: DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase,
    private readonly downloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase: DownloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida criada com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionResponseDto> {
    return this.createRuralOrHybridRetirementRejectionUseCase.execute(
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
      path: ':ruralOrHybridRetirementRejectionId',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementRejectionRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida atualizada com sucesso.',
      type: UpdateRuralOrHybridRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async update(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body() dto: UpdateRuralOrHybridRetirementRejectionRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionResponseDto> {
    return this.updateRuralOrHybridRetirementRejectionUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter análise de indeferimento de aposentadoria rural ou híbrida por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise de indeferimento de aposentadoria rural ou híbrida retornada com sucesso.',
      type: GetRuralOrHybridRetirementRejectionResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getById(
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionResponseDto> {
    return this.getRuralOrHybridRetirementRejectionUseCase.execute(
      ruralOrHybridRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis criada com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<CreateRuralOrHybridRetirementRejectionFirstAnalysisResponseDto> {
    return this.createRuralOrHybridRetirementRejectionFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/result',
      method: RequestMethod.POST,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado criado com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<CreateRuralOrHybridRetirementRejectionResultResponseDto> {
    return this.createRuralOrHybridRetirementRejectionResultUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/period',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementRejectionPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body() dto: CreateRuralOrHybridRetirementRejectionPeriodRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionPeriodResponseDto> {
    return this.createRuralOrHybridRetirementRejectionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/period',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementRejectionPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementRejectionPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body() dto: UpdateRuralOrHybridRetirementRejectionPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionPeriodResponseDto> {
    return this.updateRuralOrHybridRetirementRejectionPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar testemunha da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/testimonial-witness',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Testemunha criada com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTestimonialWitness(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body()
    dto: CreateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto> {
    return this.createRuralOrHybridRetirementRejectionTestimonialWitnessUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar testemunha da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/testimonial-witness',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Testemunha atualizada com sucesso.',
      type: UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTestimonialWitness(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body()
    dto: UpdateRuralOrHybridRetirementRejectionTestimonialWitnessRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto> {
    return this.updateRuralOrHybridRetirementRejectionTestimonialWitnessUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/work-period',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementRejectionWorkPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período de trabalho criado com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body() dto: CreateRuralOrHybridRetirementRejectionWorkPeriodRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionWorkPeriodResponseDto> {
    return this.createRuralOrHybridRetirementRejectionWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/work-period',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período de trabalho atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateWorkPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body() dto: UpdateRuralOrHybridRetirementRejectionWorkPeriodRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionWorkPeriodResponseDto> {
    return this.updateRuralOrHybridRetirementRejectionWorkPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do período de trabalho da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':analysisToolClientId/analyze-work-period-documents',
      method: RequestMethod.POST,
      type: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do período de trabalho analisados com sucesso.',
      type: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto,
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
    dto: AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsRequestDto,
  ): Promise<
    AnalyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisItemResponseDto[]
  > {
    return this.analyzeRuralOrHybridRetirementRejectionWorkPeriodDocumentsUseCase.execute(
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
      path: ':ruralOrHybridRetirementRejectionId/time-accelerator',
      method: RequestMethod.POST,
      type: CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Acelerador de tempo criado com sucesso.',
      type: CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body()
    dto: CreateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  ): Promise<CreateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    return this.createRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/time-accelerator',
      method: RequestMethod.PATCH,
      type: UpdateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Acelerador de tempo atualizado com sucesso.',
      type: UpdateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Body()
    dto: UpdateRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  ): Promise<UpdateRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    return this.updateRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar documentos do acelerador de tempo da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analyze-time-accelerator-documents',
      method: RequestMethod.POST,
      type: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Documentos do acelerador de tempo analisados com sucesso.',
      type: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorRequestDto,
  ): Promise<AnalyzeRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto> {
    return this.analyzeRuralOrHybridRetirementRejectionTimeAcceleratorUseCase.execute(
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
      path: ':ruralOrHybridRetirementRejectionId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
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
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Download da análise simplificada de indeferimento de aposentadoria rural ou híbrida',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':ruralOrHybridRetirementRejectionId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['indeferimento-aposentadoria-rural-ou-hibrida'],
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
      'ruralOrHybridRetirementRejectionId',
      new ParseValueObjectPipe(RuralOrHybridRetirementRejectionId),
    )
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadRuralOrHybridRetirementRejectionSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      ruralOrHybridRetirementRejectionId,
      format,
    );
  }
}
