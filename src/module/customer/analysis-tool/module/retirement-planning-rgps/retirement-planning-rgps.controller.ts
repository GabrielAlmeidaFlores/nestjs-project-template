import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { PeriodConsiderationActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { PeriodLeaveDateActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/analyze-retirement-planning-rgps-cnis.request.dto';
import { AnalyzeRetirementPlanningRgpsPppRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/analyze-retirement-planning-rgps-ppp.request.dto';
import { CompareRetirementPlanningRgpsCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/compare-retirement-planning-rgps-cnis-ctps.request.dto';
import { ConvertRetirementPlanningRgpsSpecialPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/convert-retirement-planning-rgps-special-period.request.dto';
import { CreateMultipleRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-multiple-retirement-planning-rgps-period.request.dto';
import { CreateRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-cnis.request.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-period-document.request.dto';
import { CreateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-period.request.dto';
import { CreateRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-time-accelerator.request.dto';
import { CreateRetirementPlanningRgpsRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps.request.dto';
import { ListRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/list-retirement-planning-rgps-period.request.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/list-retirement-planning-rgps-time-accelerator.request.dto';
import { UpdateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/update-retirement-planning-rgps-period.request.dto';
import { UpdateRetirementPlanningRgpsResultRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/update-retirement-planning-rgps-result.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/analyze-retirement-planning-rgps-cnis.response.dto';
import { AnalyzeRetirementPlanningRgpsPppResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/analyze-retirement-planning-rgps-ppp.response.dto';
import { CompareRetirementPlanningRgpsCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/compare-retirement-planning-rgps-cnis-ctps.response.dto';
import { ConvertRetirementPlanningRgpsSpecialPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/convert-retirement-planning-rgps-special-period-response.response.dto';
import { CreateMultipleRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-multiple-retirement-planning-rgps-period.response.dto';
import { CreateRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-cnis.response.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-period-document.response.dto';
import { CreateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-period.response.dto';
import { CreateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-result.response.dto';
import { CreateRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-time-accelerator.response.dto';
import { CreateRetirementPlanningRgpsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps.response.dto';
import { DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/delete-retirement-planning-rgps-time-accelerator.response.dto';
import { GetRetirementPlanningRgpsDetailsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-details.response.dto';
import { GetRetirementPlanningRgpsPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-period-earning.response.dto';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-time-accelerator-from-analysis.response.dto';
import { GetRetirementPlanningRgpsResponse } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps.response.dto';
import { ListRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/list-retirement-planning-rgps-period.response.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/list-retirement-planning-rgps-time-accelerator.response.dto';
import { UpdateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/update-retirement-planning-rgps-period.response.dto';
import { UpdateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/update-retirement-planning-rgps-result.response.dto';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-public-service.use-case';
import { AnalyzeRetirementPlanningRgpsPppUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-retirement-planning-rgps-ppp.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/analyze-work-abroad.use-case';
import { CompareRetirementPlanningRgpsCnisCtpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/compare-retirement-planning-rgps-cnis-ctps.use-case';
import { ConvertRetirementPlanningRgpsSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/convert-retirement-planning-rgps-special-period.use-case';
import { CreateMultipleRetirementPlanningRgpsPeriodsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-multiple-retirement-planning-rgps-periods.use-case';
import { CreateRetirementPlanningRgpsCnisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-cnis.use-case';
import { CreateRetirementPlanningRgpsPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-period-document.use-case';
import { CreateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-period.use-case';
import { CreateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-result.use-case';
import { CreateRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps-time-accelerator.use-case';
import { CreateRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/create-retirement-planning-rgps.use-case';
import { DeleteRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/delete-retirement-planning-rgps-time-accelerator.use-case';
import { GetRetirementPlanningRgpsDetailsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-details.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-below-minimum.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-overdue.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-period-earnings-without-leave-date.use-case';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps-time-accelerator-from-analysis.use-case';
import { GetRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/get-retirement-planning-rgps.use-case';
import { ListRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/list-retirement-planning-rgps-period.use-case';
import { ListRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/list-retirement-planning-rgps-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/period-leave-date-action.use-case';
import { UpdateRetirementPlanningRgpsClientUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-client.use-case';
import { UpdateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-period.use-case';
import { UpdateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/module/retirement-planning-rgps/use-case/update-retirement-planning-rgps-result.use-case';
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

@CustomerControllerRoute('analysis-tool/retirement-planning-rgps')
export class RetirementPlanningRgpsController {
  protected readonly _type = RetirementPlanningRgpsController.name;

  public constructor(
    private readonly createRetirementPlanningRgpsUseCase: CreateRetirementPlanningRgpsUseCase,
    private readonly createRetirementPlanningRgpsCnisUseCase: CreateRetirementPlanningRgpsCnisUseCase,
    private readonly createRetirementPlanningRgpsPeriodUseCase: CreateRetirementPlanningRgpsPeriodUseCase,
    private readonly createMultipleRetirementPlanningRgpsPeriodsUseCase: CreateMultipleRetirementPlanningRgpsPeriodsUseCase,
    private readonly updateRetirementPlanningRgpsPeriodUseCase: UpdateRetirementPlanningRgpsPeriodUseCase,
    private readonly updateRetirementPlanningRgpsResultUseCase: UpdateRetirementPlanningRgpsResultUseCase,
    private readonly updateRetirementPlanningRgpsClientUseCase: UpdateRetirementPlanningRgpsClientUseCase,
    private readonly compareRetirementPlanningRgpsCnisCtpsUseCase: CompareRetirementPlanningRgpsCnisCtpsUseCase,
    private readonly analyzeRuralTimeUseCase: AnalyzeRuralTimeUseCase,
    private readonly analyzeApprenticeStudentUseCase: AnalyzeApprenticeStudentUseCase,
    private readonly analyzeWorkAbroadUseCase: AnalyzeWorkAbroadUseCase,
    private readonly analyzeRetirementPlanningRgpsPppUseCase: AnalyzeRetirementPlanningRgpsPppUseCase,
    private readonly convertRetirementPlanningRgpsSpecialPeriodUseCase: ConvertRetirementPlanningRgpsSpecialPeriodUseCase,
    private readonly analyzeInformalWorkUseCase: AnalyzeInformalWorkUseCase,
    private readonly analyzeLaborCourtDecisionUseCase: AnalyzeLaborCourtDecisionUseCase,
    private readonly analyzeMilitaryServiceUseCase: AnalyzeMilitaryServiceUseCase,
    private readonly analyzePublicServiceUseCase: AnalyzePublicServiceUseCase,
    private readonly analyzeCtpsOutsideCnisUseCase: AnalyzeCtpsOutsideCnisUseCase,
    private readonly createRetirementPlanningRgpsTimeAcceleratorUseCase: CreateRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly deleteRetirementPlanningRgpsTimeAcceleratorUseCase: DeleteRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly listRetirementPlanningRgpsTimeAcceleratorUseCase: ListRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly listRetirementPlanningRgpsPeriodUseCase: ListRetirementPlanningRgpsPeriodUseCase,
    private readonly getRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase: GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase,
    private readonly createRetirementPlanningRgpsPeriodDocumentUseCase: CreateRetirementPlanningRgpsPeriodDocumentUseCase,
    private readonly getRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase: GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase,
    private readonly getRetirementPlanningRgpsUseCase: GetRetirementPlanningRgpsUseCase,
    private readonly createRetirementPlanningRgpsResultUseCase: CreateRetirementPlanningRgpsResultUseCase,
    private readonly getRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase: GetRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase,
    private readonly getRetirementPlanningRgpsPeriodEarningsOverdueUseCase: GetRetirementPlanningRgpsPeriodEarningsOverdueUseCase,
    private readonly getRetirementPlanningRgpsDetailsUseCase: GetRetirementPlanningRgpsDetailsUseCase,
    private readonly periodLeaveDateActionUseCase: PeriodLeaveDateActionUseCase,
    private readonly periodConsiderationActionUseCase: PeriodConsiderationActionUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary:
      'Criar planejamento previdenciário para o regime geral de previdência social (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRgpsRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Planejamento previdenciário para o regime RGPS criado com sucesso.',
      type: CreateRetirementPlanningRgpsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSocialSecurityPlanningForGeneralSocialSecuritySystem(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateRetirementPlanningRgpsRequestDto,
  ): Promise<CreateRetirementPlanningRgpsResponseDto> {
    return await this.createRetirementPlanningRgpsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar documento CNIS ao planejamento previdenciário para o regime geral de previdência social (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Planejamento previdenciário para o regime RGPS com CNIS criado com sucesso.',
      type: CreateRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSocialSecurityPlanningCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateRetirementPlanningRgpsCnisRequestDto,
  ): Promise<CreateRetirementPlanningRgpsCnisResponseDto> {
    return await this.createRetirementPlanningRgpsCnisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar período para o regime geral de previdência social (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRgpsPeriodRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período para o regime RGPS criado com sucesso.',
      type: CreateRetirementPlanningRgpsPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSocialSecurityPlanningPeriod(
    @Body()
    dto: CreateRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodResponseDto> {
    return await this.createRetirementPlanningRgpsPeriodUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar múltiplos períodos ao planejamento RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'many',
      method: RequestMethod.POST,
      type: CreateMultipleRetirementPlanningRgpsPeriodRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos para o regime RGPS criados com sucesso.',
      type: CreateMultipleRetirementPlanningRgpsPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSocialSecurityPlanningPeriodsBulk(
    @Body()
    dto: CreateMultipleRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<CreateMultipleRetirementPlanningRgpsPeriodResponseDto> {
    return await this.createMultipleRetirementPlanningRgpsPeriodsUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar nome e categoria do período RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPlanningRgpsPeriodRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período RGPS atualizado com sucesso.',
      type: UpdateRetirementPlanningRgpsPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateSocialSecurityPlanningPeriod(
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    @Body() dto: UpdateRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<UpdateRetirementPlanningRgpsPeriodResponseDto> {
    return await this.updateRetirementPlanningRgpsPeriodUseCase.execute(
      retirementPlanningRgpsPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Cria e salva o resultado do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRgpsId/result',
      method: RequestMethod.POST,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado salvo com sucesso.',
      type: CreateRetirementPlanningRgpsResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRgpsResult(
    @Param(
      'retirementPlanningRgpsId',
      new ParseValueObjectPipe(RetirementPlanningRgpsId),
    )
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateRetirementPlanningRgpsResultResponseDto> {
    return await this.createRetirementPlanningRgpsResultUseCase.execute(
      retirementPlanningRgpsId,
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar resultado do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRgpsId/result',
      method: RequestMethod.PATCH,
      type: UpdateRetirementPlanningRgpsResultRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Resultado do planejamento previdenciário RGPS atualizado com sucesso.',
      type: UpdateRetirementPlanningRgpsResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRgpsResult(
    @Param(
      'retirementPlanningRgpsId',
      new ParseValueObjectPipe(RetirementPlanningRgpsId),
    )
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    @Body() dto: UpdateRetirementPlanningRgpsResultRequestDto,
  ): Promise<UpdateRetirementPlanningRgpsResultResponseDto> {
    return await this.updateRetirementPlanningRgpsResultUseCase.execute(
      retirementPlanningRgpsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Alterar cliente do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRgpsId/client/:analysisToolClientId',
      method: RequestMethod.PATCH,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Cliente do planejamento previdenciário RGPS atualizado com sucesso.',
      type: UpdateRetirementPlanningRgpsResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateRetirementPlanningRgpsClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRgpsId',
      new ParseValueObjectPipe(RetirementPlanningRgpsId),
    )
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<UpdateRetirementPlanningRgpsResultResponseDto> {
    return await this.updateRetirementPlanningRgpsClientUseCase.execute(
      retirementPlanningRgpsId,
      analysisToolClientId,
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Converter período especial (PPP) em período RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/convert-from-special',
      method: RequestMethod.POST,
      type: ConvertRetirementPlanningRgpsSpecialPeriodRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos convertidos e salvos com sucesso.',
      type: ConvertRetirementPlanningRgpsSpecialPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async convertSpecialPeriodToPeriod(
    @Body() dto: ConvertRetirementPlanningRgpsSpecialPeriodRequestDto,
  ): Promise<ConvertRetirementPlanningRgpsSpecialPeriodResponseDto> {
    return await this.convertRetirementPlanningRgpsSpecialPeriodUseCase.execute(
      dto.json.retirementPlanningRgpsId,
      dto.json.retirementPlanningRgpsSpecialPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Comparar CNIS e CTPS para planejamento previdenciário (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/compare-cnis-ctps',
      method: RequestMethod.POST,
      type: CompareRetirementPlanningRgpsCnisCtpsRequestDto,
    },
    tag: ['planejamento-previdenciario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da comparação CNIS x CTPS criado com sucesso.',
      type: CompareRetirementPlanningRgpsCnisCtpsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async compareCnisCtps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CompareRetirementPlanningRgpsCnisCtpsRequestDto,
  ): Promise<CompareRetirementPlanningRgpsCnisCtpsResponseDto> {
    return await this.compareRetirementPlanningRgpsCnisCtpsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Tempo Rural',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'rural-time',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Tempo Rural realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeRuralTime(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeRuralTimeUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Serviço Militar',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'military-service',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Militar realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeMilitaryService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeMilitaryServiceUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Serviço Público',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'public-service',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Público realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePublicService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzePublicServiceUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar CTPS fora do CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'ctps-outside-cnis',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de CTPS fora do CNIS realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeCtpsOutsideCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeCtpsOutsideCnisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Aluno-Aprendiz',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'apprentice-student',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Aluno-Aprendiz realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeApprenticeStudent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeApprenticeStudentUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Trabalho no Exterior',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'work-abroad',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho no Exterior realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeWorkAbroad(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeWorkAbroadUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar PPP (Perfil Profissiográfico Previdenciário)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'ppp',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsPppRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de PPP recebida com sucesso.',
      type: AnalyzeRetirementPlanningRgpsPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePpp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsPppRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsPppResponseDto> {
    return await this.analyzeRetirementPlanningRgpsPppUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Trabalho Informal',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'informal-work',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho Informal realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeInformalWork(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeInformalWorkUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Analisar Sentença Trabalhista',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'labor-court-decision',
      method: RequestMethod.POST,
      type: AnalyzeRetirementPlanningRgpsCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Sentença Trabalhista realizada com sucesso.',
      type: AnalyzeRetirementPlanningRgpsCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeLaborCourtDecision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeLaborCourtDecisionUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar um registro na tabela de acelerador de tempo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'time-accelerator',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRgpsTimeAcceleratorRequestDto,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Registro na tabela de acelerador de tempo criado com sucesso.',
      type: CreateRetirementPlanningRgpsTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRgpsTimeAccelerator(
    @Body() dto: CreateRetirementPlanningRgpsTimeAcceleratorRequestDto,
  ): Promise<CreateRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    return await this.createRetirementPlanningRgpsTimeAcceleratorUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar um registro na tabela de acelerador de tempo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'time-accelerator/:acceleratorId',
      method: RequestMethod.DELETE,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Registro na tabela de acelerador de tempo deletado com sucesso.',
      type: DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteRetirementPlanningRgpsTimeAccelerator(
    @Param(
      'acceleratorId',
      new ParseValueObjectPipe(RetirementPlanningRgpsTimeAcceleratorId),
    )
    acceleratorId: RetirementPlanningRgpsTimeAcceleratorId,
  ): Promise<DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    return await this.deleteRetirementPlanningRgpsTimeAcceleratorUseCase.execute(
      acceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar de periodos do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de períodos do planejamento previdenciário RGPS retornada com sucesso.',
      type: ListRetirementPlanningRgpsPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRetirementPlanningRgpsPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<ListRetirementPlanningRgpsPeriodResponseDto> {
    return await this.listRetirementPlanningRgpsPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar de aceleradores de tempo do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de aceleradores de tempo do planejamento previdenciário RGPS   retornada com sucesso.',
      type: ListRetirementPlanningRgpsTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRetirementPlanningRgpsTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListRetirementPlanningRgpsTimeAcceleratorRequestDto,
  ): Promise<ListRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    return await this.listRetirementPlanningRgpsTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Extrair acelerador de tempo (JSON) de um resultado de análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-result/:retirementPlanningRgpsAnalysisResultId/time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'JSON extraído do resultado de análise retornado com sucesso.',
      type: GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getTimeAcceleratorFromAnalysisResult(
    @Param(
      'retirementPlanningRgpsAnalysisResultId',
      new ParseValueObjectPipe(RetirementPlanningRgpsAnalysisResultId),
    )
    retirementPlanningRgpsAnalysisResultId: RetirementPlanningRgpsAnalysisResultId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto> {
    return await this.getRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase.execute(
      retirementPlanningRgpsAnalysisResultId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter planejamento previdenciário RGPS por id',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRgpsId',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Planejamento previdenciário RGPS retornado com sucesso.',
      type: GetRetirementPlanningRgpsResponse,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRgps(
    @Param(
      'retirementPlanningRgpsId',
      new ParseValueObjectPipe(RetirementPlanningRgpsId),
    )
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsResponse> {
    return await this.getRetirementPlanningRgpsUseCase.execute(
      retirementPlanningRgpsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar uma análise de pendência sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'date-without-leave-analysis',
      method: RequestMethod.POST,
      type: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Registro na tabela de acelerador de tempo criado com sucesso.',
      type: CreateRetirementPlanningRgpsPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRetirementPlanningRgpsPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodDocumentResponseDto> {
    return await this.createRetirementPlanningRgpsPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar ganhos abaixo do mínimo de um período do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId/earnings/below-minimum',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos abaixo do mínimo retornados com sucesso.',
      type: GetRetirementPlanningRgpsPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRgpsPeriodEarningsBelowMinimum(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodEarningResponseDto[]> {
    return await this.getRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRgpsPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar ganhos sem data de saída de um período do planejamento RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId/earnings/without-leave-date',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos sem data de saída retornados com sucesso.',
      type: GetRetirementPlanningRgpsPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRgpsPeriodEarningsWithoutLeaveDate(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodEarningResponseDto[]> {
    return await this.getRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRgpsPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar ganhos de um período com competências em atraso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId/earnings/overdue',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Ganhos sem data de saída e competências em atraso retornados com sucesso.',
      type: GetRetirementPlanningRgpsPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRgpsPeriodEarningsWithoutLeaveDateOverdue(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
  ): Promise<GetRetirementPlanningRgpsPeriodEarningResponseDto[]> {
    return await this.getRetirementPlanningRgpsPeriodEarningsOverdueUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRgpsPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Ação sobre período sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId/leave-date-action',
      method: RequestMethod.POST,
      type: PeriodLeaveDateActionRequestDto,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description:
        'Ação sobre período sem data de saída realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodLeaveDateAction(
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    @Body() dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    await this.periodLeaveDateActionUseCase.execute(
      retirementPlanningRgpsPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Considerar, desconsiderar ou considerar provisoriamente um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:retirementPlanningRgpsPeriodId/consideration-action',
      method: RequestMethod.POST,
      type: PeriodConsiderationActionRequestDto,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Ação sobre consideração do período realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodConsiderationAction(
    @Param(
      'retirementPlanningRgpsPeriodId',
      new ParseValueObjectPipe(RetirementPlanningRgpsPeriodId),
    )
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    @Body() dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    await this.periodConsiderationActionUseCase.execute(
      retirementPlanningRgpsPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter todos os detalhes do planejamento RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':retirementPlanningRgpsId/details',
      method: RequestMethod.GET,
    },
    tag: ['regime-geral-previdencia-social'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do planejamento RGPS retornados com sucesso.',
      type: GetRetirementPlanningRgpsDetailsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getRetirementPlanningRgpsDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'retirementPlanningRgpsId',
      new ParseValueObjectPipe(RetirementPlanningRgpsId),
    )
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsDetailsResponseDto> {
    return await this.getRetirementPlanningRgpsDetailsUseCase.execute(
      sessionData,
      organizationSessionData,
      retirementPlanningRgpsId,
    );
  }
}
