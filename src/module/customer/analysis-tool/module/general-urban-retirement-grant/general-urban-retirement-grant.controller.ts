import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { PeriodConsiderationActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { PeriodLeaveDateActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';
import { AnalyzeGeneralUrbanRetirementGrantCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/analyze-general-urban-retirement-grant-cnis.request.dto';
import { AnalyzeGeneralUrbanRetirementGrantPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/analyze-general-urban-retirement-grant-ppp.request.dto';
import { CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/compare-general-urban-retirement-grant-cnis-ctps.request.dto';
import { ConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/convert-general-urban-retirement-grant-special-period.request.dto';
import { CreateGeneralUrbanRetirementGrantCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-cnis.request.dto';
import { CreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-period-document.request.dto';
import { CreateGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-period.request.dto';
import { CreateGeneralUrbanRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant.request.dto';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-time-accelerator.request.dto';
import { CreateMultipleGeneralUrbanRetirementGrantPeriodsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-multiple-general-urban-retirement-grant-periods.request.dto';
import { ListGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/list-general-urban-retirement-grant-period.request.dto';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/list-general-urban-retirement-grant-time-accelerator.request.dto';
import { UpdateGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/update-general-urban-retirement-grant-period.request.dto';
import { UpdateGeneralUrbanRetirementGrantResultRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/update-general-urban-retirement-grant-result.request.dto';
import { AnalyzeGeneralUrbanRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/analyze-general-urban-retirement-grant-cnis.response.dto';
import { AnalyzeGeneralUrbanRetirementGrantPppResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/analyze-general-urban-retirement-grant-ppp.response.dto';
import { CompareGeneralUrbanRetirementGrantCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/compare-general-urban-retirement-grant-cnis-ctps.response.dto';
import { ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/convert-general-urban-retirement-grant-special-period.response.dto';
import { CreateGeneralUrbanRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-cnis.response.dto';
import { CreateGeneralUrbanRetirementGrantPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-period-document.response.dto';
import { CreateGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-period.response.dto';
import { CreateGeneralUrbanRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant.response.dto';
import { CreateGeneralUrbanRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-result.response.dto';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-time-accelerator.response.dto';
import { CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-multiple-general-urban-retirement-grant-periods.response.dto';
import { DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/delete-general-urban-retirement-grant-time-accelerator.response.dto';
import { GetGeneralUrbanRetirementGrantDetailsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-details.response.dto';
import { GetGeneralUrbanRetirementGrantPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period-earning.response.dto';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-time-accelerator-from-analysis.response.dto';
import { GetGeneralUrbanRetirementGrantResponse } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant.response.dto';
import { ListGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/list-general-urban-retirement-grant-period.response.dto';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/list-general-urban-retirement-grant-time-accelerator.response.dto';
import { UpdateGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/update-general-urban-retirement-grant-period.response.dto';
import { UpdateGeneralUrbanRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/update-general-urban-retirement-grant-result.response.dto';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeGeneralUrbanRetirementGrantPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-general-urban-retirement-grant-ppp.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-public-service.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/analyze-work-abroad.use-case';
import { CompareGeneralUrbanRetirementGrantCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/compare-general-urban-retirement-grant-cnis-ctps.use-case';
import { ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/convert-general-urban-retirement-grant-special-period.use-case';
import { CreateGeneralUrbanRetirementGrantCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-cnis.use-case';
import { CreateGeneralUrbanRetirementGrantPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-period-document.use-case';
import { CreateGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-period.use-case';
import { CreateGeneralUrbanRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-result.use-case';
import { CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant-time-accelerator.use-case';
import { CreateGeneralUrbanRetirementGrantUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-general-urban-retirement-grant.use-case';
import { CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/create-multiple-general-urban-retirement-grant-periods.use-case';
import { DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/delete-general-urban-retirement-grant-time-accelerator.use-case';
import { GetGeneralUrbanRetirementGrantDetailsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-details.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-below-minimum.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-overdue.use-case';
import { GetGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-period-earnings-without-leave-date.use-case';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant-time-accelerator-from-analysis.use-case';
import { GetGeneralUrbanRetirementGrantUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/get-general-urban-retirement-grant.use-case';
import { ListGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/list-general-urban-retirement-grant-period.use-case';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/list-general-urban-retirement-grant-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/period-leave-date-action.use-case';
import { UpdateGeneralUrbanRetirementGrantClientUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-client.use-case';
import { UpdateGeneralUrbanRetirementGrantPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-period.use-case';
import { UpdateGeneralUrbanRetirementGrantResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/use-case/update-general-urban-retirement-grant-result.use-case';
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

@CustomerControllerRoute('analysis-tool/general-urban-retirement-grant')
export class GeneralUrbanRetirementGrantController {
  protected readonly _type = GeneralUrbanRetirementGrantController.name;

  public constructor(
    private readonly createGeneralUrbanRetirementGrantUseCase: CreateGeneralUrbanRetirementGrantUseCase,
    private readonly createGeneralUrbanRetirementGrantCnisUseCase: CreateGeneralUrbanRetirementGrantCnisUseCase,
    private readonly createGeneralUrbanRetirementGrantPeriodUseCase: CreateGeneralUrbanRetirementGrantPeriodUseCase,
    private readonly createMultipleGeneralUrbanRetirementGrantPeriodsUseCase: CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase,
    private readonly updateGeneralUrbanRetirementGrantPeriodUseCase: UpdateGeneralUrbanRetirementGrantPeriodUseCase,
    private readonly updateGeneralUrbanRetirementGrantResultUseCase: UpdateGeneralUrbanRetirementGrantResultUseCase,
    private readonly updateGeneralUrbanRetirementGrantClientUseCase: UpdateGeneralUrbanRetirementGrantClientUseCase,
    private readonly compareGeneralUrbanRetirementGrantCnisCtpsUseCase: CompareGeneralUrbanRetirementGrantCnisCtpsUseCase,
    private readonly analyzeRuralTimeUseCase: AnalyzeRuralTimeUseCase,
    private readonly analyzeApprenticeStudentUseCase: AnalyzeApprenticeStudentUseCase,
    private readonly analyzeWorkAbroadUseCase: AnalyzeWorkAbroadUseCase,
    private readonly analyzeGeneralUrbanRetirementGrantPppUseCase: AnalyzeGeneralUrbanRetirementGrantPppUseCase,
    private readonly convertGeneralUrbanRetirementGrantSpecialPeriodUseCase: ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase,
    private readonly analyzeInformalWorkUseCase: AnalyzeInformalWorkUseCase,
    private readonly analyzeLaborCourtDecisionUseCase: AnalyzeLaborCourtDecisionUseCase,
    private readonly analyzeMilitaryServiceUseCase: AnalyzeMilitaryServiceUseCase,
    private readonly analyzePublicServiceUseCase: AnalyzePublicServiceUseCase,
    private readonly analyzeCtpsOutsideCnisUseCase: AnalyzeCtpsOutsideCnisUseCase,
    private readonly createGeneralUrbanRetirementGrantTimeAcceleratorUseCase: CreateGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    private readonly deleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase: DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    private readonly listGeneralUrbanRetirementGrantTimeAcceleratorUseCase: ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase,
    private readonly listGeneralUrbanRetirementGrantPeriodUseCase: ListGeneralUrbanRetirementGrantPeriodUseCase,
    private readonly getGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase: GetGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase,
    private readonly createGeneralUrbanRetirementGrantPeriodDocumentUseCase: CreateGeneralUrbanRetirementGrantPeriodDocumentUseCase,
    private readonly getGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase: GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase,
    private readonly getGeneralUrbanRetirementGrantUseCase: GetGeneralUrbanRetirementGrantUseCase,
    private readonly createGeneralUrbanRetirementGrantResultUseCase: CreateGeneralUrbanRetirementGrantResultUseCase,
    private readonly getGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase: GetGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase,
    private readonly getGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase: GetGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase,
    private readonly getGeneralUrbanRetirementGrantDetailsUseCase: GetGeneralUrbanRetirementGrantDetailsUseCase,
    private readonly periodLeaveDateActionUseCase: PeriodLeaveDateActionUseCase,
    private readonly periodConsiderationActionUseCase: PeriodConsiderationActionUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de concessão de aposentadoria urbana geral (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementGrantRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de concessão de aposentadoria urbana geral criada com sucesso.',
      type: CreateGeneralUrbanRetirementGrantResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateGeneralUrbanRetirementGrantRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantResponseDto> {
    return await this.createGeneralUrbanRetirementGrantUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar documento CNIS à análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Documento CNIS adicionado à análise de concessão de aposentadoria urbana geral com sucesso.',
      type: CreateGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantCnisResponseDto> {
    return await this.createGeneralUrbanRetirementGrantCnisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar período à análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateGeneralUrbanRetirementGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @Body()
    dto: CreateGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantPeriodResponseDto> {
    return await this.createGeneralUrbanRetirementGrantPeriodUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Adicionar múltiplos períodos à análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'many',
      method: RequestMethod.POST,
      type: CreateMultipleGeneralUrbanRetirementGrantPeriodsRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos criados com sucesso.',
      type: CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriodsBulk(
    @Body()
    dto: CreateMultipleGeneralUrbanRetirementGrantPeriodsRequestDto,
  ): Promise<CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto> {
    return await this.createMultipleGeneralUrbanRetirementGrantPeriodsUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar nome e categoria do período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementGrantPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
    @Body() dto: UpdateGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementGrantPeriodResponseDto> {
    return await this.updateGeneralUrbanRetirementGrantPeriodUseCase.execute(
      generalUrbanRetirementGrantPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar e salvar o resultado da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementGrantId/result',
      method: RequestMethod.POST,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado salvo com sucesso.',
      type: CreateGeneralUrbanRetirementGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @Param(
      'generalUrbanRetirementGrantId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantId),
    )
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateGeneralUrbanRetirementGrantResultResponseDto> {
    return await this.createGeneralUrbanRetirementGrantResultUseCase.execute(
      generalUrbanRetirementGrantId,
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar resultado da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementGrantId/result',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementGrantResultRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Resultado da análise de concessão de aposentadoria urbana geral atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateResult(
    @Param(
      'generalUrbanRetirementGrantId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantId),
    )
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    @Body() dto: UpdateGeneralUrbanRetirementGrantResultRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementGrantResultResponseDto> {
    return await this.updateGeneralUrbanRetirementGrantResultUseCase.execute(
      generalUrbanRetirementGrantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Alterar cliente da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementGrantId/client/:analysisToolClientId',
      method: RequestMethod.PATCH,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Cliente da análise atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementGrantResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementGrantId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantId),
    )
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<UpdateGeneralUrbanRetirementGrantResultResponseDto> {
    return await this.updateGeneralUrbanRetirementGrantClientUseCase.execute(
      generalUrbanRetirementGrantId,
      analysisToolClientId,
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Converter período especial (PPP) em período da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/convert-from-special',
      method: RequestMethod.POST,
      type: ConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos convertidos e salvos com sucesso.',
      type: ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async convertSpecialPeriodToPeriod(
    @Body() dto: ConvertGeneralUrbanRetirementGrantSpecialPeriodRequestDto,
  ): Promise<ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto> {
    return await this.convertGeneralUrbanRetirementGrantSpecialPeriodUseCase.execute(
      dto.json.generalUrbanRetirementGrantId,
      dto.json.generalUrbanRetirementGrantSpecialPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Comparar CNIS e CTPS para análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/compare-cnis-ctps',
      method: RequestMethod.POST,
      type: CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da comparação CNIS x CTPS criado com sucesso.',
      type: CompareGeneralUrbanRetirementGrantCnisCtpsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async compareCnisCtps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementGrantCnisCtpsResponseDto> {
    return await this.compareGeneralUrbanRetirementGrantCnisCtpsUseCase.execute(
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Tempo Rural realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeRuralTime(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Militar realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeMilitaryService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Público realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePublicService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de CTPS fora do CNIS realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeCtpsOutsideCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Aluno-Aprendiz realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeApprenticeStudent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho no Exterior realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeWorkAbroad(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantPppRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de PPP recebida com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePpp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantPppResponseDto> {
    return await this.analyzeGeneralUrbanRetirementGrantPppUseCase.execute(
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho Informal realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeInformalWork(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Sentença Trabalhista realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementGrantCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeLaborCourtDecision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
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
      type: CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Registro na tabela de acelerador de tempo criado com sucesso.',
      type: CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTimeAccelerator(
    @Body() dto: CreateGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    return await this.createGeneralUrbanRetirementGrantTimeAcceleratorUseCase.execute(
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
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Registro na tabela de acelerador de tempo deletado com sucesso.',
      type: DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @Param(
      'acceleratorId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantTimeAcceleratorId),
    )
    acceleratorId: GeneralUrbanRetirementGrantTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    return await this.deleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase.execute(
      acceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar períodos da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de períodos retornada com sucesso.',
      type: ListGeneralUrbanRetirementGrantPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<ListGeneralUrbanRetirementGrantPeriodResponseDto> {
    return await this.listGeneralUrbanRetirementGrantPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar aceleradores de tempo da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de aceleradores de tempo retornada com sucesso.',
      type: ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
  ): Promise<ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    return await this.listGeneralUrbanRetirementGrantTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Extrair acelerador de tempo (JSON) de um resultado de análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-result/:generalUrbanRetirementGrantAnalysisResultId/time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'JSON extraído do resultado de análise retornado com sucesso.',
      type: GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getTimeAcceleratorFromAnalysisResult(
    @Param(
      'generalUrbanRetirementGrantAnalysisResultId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantAnalysisResultId),
    )
    generalUrbanRetirementGrantAnalysisResultId: GeneralUrbanRetirementGrantAnalysisResultId,
  ): Promise<GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto> {
    return await this.getGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisUseCase.execute(
      generalUrbanRetirementGrantAnalysisResultId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de concessão de aposentadoria urbana geral por id',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementGrantId',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise retornada com sucesso.',
      type: GetGeneralUrbanRetirementGrantResponse,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async get(
    @Param(
      'generalUrbanRetirementGrantId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantId),
    )
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantResponse> {
    return await this.getGeneralUrbanRetirementGrantUseCase.execute(
      generalUrbanRetirementGrantId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar uma análise de pendência sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'date-without-leave-analysis',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de documento sem data de saída criada com sucesso.',
      type: CreateGeneralUrbanRetirementGrantPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateGeneralUrbanRetirementGrantPeriodDocumentRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantPeriodDocumentResponseDto> {
    return await this.createGeneralUrbanRetirementGrantPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar ganhos abaixo do mínimo de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId/earnings/below-minimum',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos abaixo do mínimo retornados com sucesso.',
      type: GetGeneralUrbanRetirementGrantPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsBelowMinimum(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar ganhos sem data de saída de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId/earnings/without-leave-date',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos sem data de saída retornados com sucesso.',
      type: GetGeneralUrbanRetirementGrantPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsWithoutLeaveDate(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementGrantPeriodEarningsWithoutLeaveDateUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar ganhos de um período com competências em atraso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId/earnings/overdue',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Ganhos com competências em atraso retornados com sucesso.',
      type: GetGeneralUrbanRetirementGrantPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsOverdue(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementGrantPeriodEarningsOverdueUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementGrantPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Ação sobre período sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId/leave-date-action',
      method: RequestMethod.POST,
      type: PeriodLeaveDateActionRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description:
        'Ação sobre período sem data de saída realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodLeaveDateAction(
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
    @Body() dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    await this.periodLeaveDateActionUseCase.execute(
      generalUrbanRetirementGrantPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Considerar, desconsiderar ou considerar provisoriamente um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementGrantPeriodId/consideration-action',
      method: RequestMethod.POST,
      type: PeriodConsiderationActionRequestDto,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Ação sobre consideração do período realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodConsiderationAction(
    @Param(
      'generalUrbanRetirementGrantPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantPeriodId),
    )
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
    @Body() dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    await this.periodConsiderationActionUseCase.execute(
      generalUrbanRetirementGrantPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter todos os detalhes da análise de concessão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementGrantId/details',
      method: RequestMethod.GET,
    },
    tag: ['concessao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes da análise retornados com sucesso.',
      type: GetGeneralUrbanRetirementGrantDetailsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementGrantId',
      new ParseValueObjectPipe(GeneralUrbanRetirementGrantId),
    )
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantDetailsResponseDto> {
    return await this.getGeneralUrbanRetirementGrantDetailsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementGrantId,
    );
  }
}
