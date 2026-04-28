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
import { PeriodConsiderationActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { PeriodLeaveDateActionRequestDto } from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';
import { AnalyzeGeneralUrbanRetirementReviewCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/analyze-general-urban-retirement-review-cnis.request.dto';
import { AnalyzeGeneralUrbanRetirementReviewPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/analyze-general-urban-retirement-review-ppp.request.dto';
import { CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/compare-general-urban-retirement-review-cnis-ctps.request.dto';
import { ConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/convert-general-urban-retirement-review-special-period.request.dto';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-benefit-award-letter-analysis.request.dto';
import { CreateGeneralUrbanRetirementReviewCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-cnis.request.dto';
import { CreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-period-document.request.dto';
import { CreateGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-period.request.dto';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-time-accelerator.request.dto';
import { CreateGeneralUrbanRetirementReviewRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review.request.dto';
import { CreateMultipleGeneralUrbanRetirementReviewPeriodsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-multiple-general-urban-retirement-review-periods.request.dto';
import { ListGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/list-general-urban-retirement-review-period.request.dto';
import { ListGeneralUrbanRetirementReviewTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/list-general-urban-retirement-review-time-accelerator.request.dto';
import { UpdateGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/update-general-urban-retirement-review-period.request.dto';
import { UpdateGeneralUrbanRetirementReviewResultRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/update-general-urban-retirement-review-result.request.dto';
import { AnalyzeGeneralUrbanRetirementReviewCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/analyze-general-urban-retirement-review-cnis.response.dto';
import { AnalyzeGeneralUrbanRetirementReviewPppResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/analyze-general-urban-retirement-review-ppp.response.dto';
import { CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/compare-general-urban-retirement-review-cnis-ctps.response.dto';
import { ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/convert-general-urban-retirement-review-special-period.response.dto';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-benefit-award-letter-analysis.response.dto';
import { CreateGeneralUrbanRetirementReviewCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-cnis.response.dto';
import { CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-first-analysis.response.dto';
import { CreateGeneralUrbanRetirementReviewPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-period-document.response.dto';
import { CreateGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-period.response.dto';
import { CreateGeneralUrbanRetirementReviewResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-result.response.dto';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-time-accelerator.response.dto';
import { CreateGeneralUrbanRetirementReviewResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review.response.dto';
import { CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-multiple-general-urban-retirement-review-periods.response.dto';
import { DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/delete-general-urban-retirement-review-time-accelerator.response.dto';
import { GetGeneralUrbanRetirementReviewDetailsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-details.response.dto';
import { GetGeneralUrbanRetirementReviewPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period-earning.response.dto';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-time-accelerator-from-analysis.response.dto';
import { GetGeneralUrbanRetirementReviewResponse } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review.response.dto';
import { ListGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/list-general-urban-retirement-review-period.response.dto';
import { ListGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/list-general-urban-retirement-review-time-accelerator.response.dto';
import { UpdateGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review-period.response.dto';
import { UpdateGeneralUrbanRetirementReviewResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review-result.response.dto';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-apprentice-student.use-case';
import { AnalyzeCtpsOutsideCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-ctps-outside-cnis.use-case';
import { AnalyzeGeneralUrbanRetirementReviewPppUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-general-urban-retirement-review-ppp.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-public-service.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/analyze-work-abroad.use-case';
import { CompareGeneralUrbanRetirementReviewCnisCtpsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/compare-general-urban-retirement-review-cnis-ctps.use-case';
import { ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/convert-general-urban-retirement-review-special-period.use-case';
import { CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-benefit-award-letter-analysis.use-case';
import { CreateGeneralUrbanRetirementReviewCnisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-cnis.use-case';
import { CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-first-analysis.use-case';
import { CreateGeneralUrbanRetirementReviewPeriodDocumentUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-period-document.use-case';
import { CreateGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-period.use-case';
import { CreateGeneralUrbanRetirementReviewResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-result.use-case';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review-time-accelerator.use-case';
import { CreateGeneralUrbanRetirementReviewUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-general-urban-retirement-review.use-case';
import { CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/create-multiple-general-urban-retirement-review-periods.use-case';
import { DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/delete-general-urban-retirement-review-time-accelerator.use-case';
import { DownloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/download-general-urban-retirement-review-complete-analysis.use-case';
import { DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/download-general-urban-retirement-review-simplified-analysis.use-case';
import { GetGeneralUrbanRetirementReviewDetailsUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-details.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-below-minimum.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-overdue.use-case';
import { GetGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-period-earnings-without-leave-date.use-case';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review-time-accelerator-from-analysis.use-case';
import { GetGeneralUrbanRetirementReviewUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/get-general-urban-retirement-review.use-case';
import { ListGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/list-general-urban-retirement-review-period.use-case';
import { ListGeneralUrbanRetirementReviewTimeAcceleratorUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/list-general-urban-retirement-review-time-accelerator.use-case';
import { PeriodConsiderationActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/period-consideration-action.use-case';
import { PeriodLeaveDateActionUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/period-leave-date-action.use-case';
import { UpdateGeneralUrbanRetirementReviewClientUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-client.use-case';
import { UpdateGeneralUrbanRetirementReviewPeriodUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-period.use-case';
import { UpdateGeneralUrbanRetirementReviewResultUseCase } from '@module/customer/analysis-tool/module/general-urban-retirement-review/use-case/update-general-urban-retirement-review-result.use-case';
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

@CustomerControllerRoute('analysis-tool/general-urban-retirement-review')
export class GeneralUrbanRetirementReviewController {
  protected readonly _type = GeneralUrbanRetirementReviewController.name;

  public constructor(
    private readonly createGeneralUrbanRetirementReviewUseCase: CreateGeneralUrbanRetirementReviewUseCase,
    private readonly createGeneralUrbanRetirementReviewCnisUseCase: CreateGeneralUrbanRetirementReviewCnisUseCase,
    private readonly createGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase: CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase,
    private readonly createGeneralUrbanRetirementReviewFirstAnalysisUseCase: CreateGeneralUrbanRetirementReviewFirstAnalysisUseCase,
    private readonly createGeneralUrbanRetirementReviewPeriodUseCase: CreateGeneralUrbanRetirementReviewPeriodUseCase,
    private readonly createMultipleGeneralUrbanRetirementReviewPeriodsUseCase: CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase,
    private readonly updateGeneralUrbanRetirementReviewPeriodUseCase: UpdateGeneralUrbanRetirementReviewPeriodUseCase,
    private readonly updateGeneralUrbanRetirementReviewResultUseCase: UpdateGeneralUrbanRetirementReviewResultUseCase,
    private readonly updateGeneralUrbanRetirementReviewClientUseCase: UpdateGeneralUrbanRetirementReviewClientUseCase,
    private readonly compareGeneralUrbanRetirementReviewCnisCtpsUseCase: CompareGeneralUrbanRetirementReviewCnisCtpsUseCase,
    private readonly analyzeRuralTimeUseCase: AnalyzeRuralTimeUseCase,
    private readonly analyzeApprenticeStudentUseCase: AnalyzeApprenticeStudentUseCase,
    private readonly analyzeWorkAbroadUseCase: AnalyzeWorkAbroadUseCase,
    private readonly analyzeGeneralUrbanRetirementReviewPppUseCase: AnalyzeGeneralUrbanRetirementReviewPppUseCase,
    private readonly convertGeneralUrbanRetirementReviewSpecialPeriodUseCase: ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase,
    private readonly analyzeInformalWorkUseCase: AnalyzeInformalWorkUseCase,
    private readonly analyzeLaborCourtDecisionUseCase: AnalyzeLaborCourtDecisionUseCase,
    private readonly analyzeMilitaryServiceUseCase: AnalyzeMilitaryServiceUseCase,
    private readonly analyzePublicServiceUseCase: AnalyzePublicServiceUseCase,
    private readonly analyzeCtpsOutsideCnisUseCase: AnalyzeCtpsOutsideCnisUseCase,
    private readonly createGeneralUrbanRetirementReviewTimeAcceleratorUseCase: CreateGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    private readonly deleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase: DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    private readonly downloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase: DownloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase,
    private readonly downloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase: DownloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase,
    private readonly listGeneralUrbanRetirementReviewTimeAcceleratorUseCase: ListGeneralUrbanRetirementReviewTimeAcceleratorUseCase,
    private readonly listGeneralUrbanRetirementReviewPeriodUseCase: ListGeneralUrbanRetirementReviewPeriodUseCase,
    private readonly getGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase: GetGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase,
    private readonly createGeneralUrbanRetirementReviewPeriodDocumentUseCase: CreateGeneralUrbanRetirementReviewPeriodDocumentUseCase,
    private readonly getGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase: GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase,
    private readonly getGeneralUrbanRetirementReviewUseCase: GetGeneralUrbanRetirementReviewUseCase,
    private readonly createGeneralUrbanRetirementReviewResultUseCase: CreateGeneralUrbanRetirementReviewResultUseCase,
    private readonly getGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase: GetGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase,
    private readonly getGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase: GetGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase,
    private readonly getGeneralUrbanRetirementReviewDetailsUseCase: GetGeneralUrbanRetirementReviewDetailsUseCase,
    private readonly periodLeaveDateActionUseCase: PeriodLeaveDateActionUseCase,
    private readonly periodConsiderationActionUseCase: PeriodConsiderationActionUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de revisão de aposentadoria urbana geral (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementReviewRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de revisão de aposentadoria urbana geral criada com sucesso.',
      type: CreateGeneralUrbanRetirementReviewResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateGeneralUrbanRetirementReviewRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewResponseDto> {
    return await this.createGeneralUrbanRetirementReviewUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar documento CNIS à análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Documento CNIS adicionado à análise de revisão de aposentadoria urbana geral com sucesso.',
      type: CreateGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body()
    dto: CreateGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewCnisResponseDto> {
    return await this.createGeneralUrbanRetirementReviewCnisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Analisar carta de concessão da revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/benefit-award-letter-analysis',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise da carta de concessão gerada com sucesso.',
      type: CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBenefitAwardLetterAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @Body()
    dto: CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar first analysis da revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/first-analysis',
      method: RequestMethod.POST,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'First analysis gerada com sucesso.',
      type: CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createFirstAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<CreateGeneralUrbanRetirementReviewFirstAnalysisResponseDto> {
    return await this.createGeneralUrbanRetirementReviewFirstAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar período à análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementReviewPeriodRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período criado com sucesso.',
      type: CreateGeneralUrbanRetirementReviewPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriod(
    @Body()
    dto: CreateGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewPeriodResponseDto> {
    return await this.createGeneralUrbanRetirementReviewPeriodUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar múltiplos períodos à análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'many',
      method: RequestMethod.POST,
      type: CreateMultipleGeneralUrbanRetirementReviewPeriodsRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos criados com sucesso.',
      type: CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriodsBulk(
    @Body()
    dto: CreateMultipleGeneralUrbanRetirementReviewPeriodsRequestDto,
  ): Promise<CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto> {
    return await this.createMultipleGeneralUrbanRetirementReviewPeriodsUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar nome e categoria do período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementReviewPeriodRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementReviewPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updatePeriod(
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
    @Body() dto: UpdateGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementReviewPeriodResponseDto> {
    return await this.updateGeneralUrbanRetirementReviewPeriodUseCase.execute(
      generalUrbanRetirementReviewPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar e salvar o resultado da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/result',
      method: RequestMethod.POST,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Resultado salvo com sucesso.',
      type: CreateGeneralUrbanRetirementReviewResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateGeneralUrbanRetirementReviewResultResponseDto> {
    return await this.createGeneralUrbanRetirementReviewResultUseCase.execute(
      generalUrbanRetirementReviewId,
      sessionData,
      organizationSessionData,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Baixar análise simplificada da revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadGeneralUrbanRetirementReviewSimplifiedById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementReviewSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadGeneralUrbanRetirementReviewCompleteById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadGeneralUrbanRetirementReviewCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Atualizar resultado da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/result',
      method: RequestMethod.PATCH,
      type: UpdateGeneralUrbanRetirementReviewResultRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Resultado da análise de revisão de aposentadoria urbana geral atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementReviewResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateResult(
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @Body() dto: UpdateGeneralUrbanRetirementReviewResultRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementReviewResultResponseDto> {
    return await this.updateGeneralUrbanRetirementReviewResultUseCase.execute(
      generalUrbanRetirementReviewId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Alterar cliente da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/client/:analysisToolClientId',
      method: RequestMethod.PATCH,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cliente da análise atualizado com sucesso.',
      type: UpdateGeneralUrbanRetirementReviewResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<UpdateGeneralUrbanRetirementReviewResultResponseDto> {
    return await this.updateGeneralUrbanRetirementReviewClientUseCase.execute(
      generalUrbanRetirementReviewId,
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
      type: ConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Períodos convertidos e salvos com sucesso.',
      type: ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async convertSpecialPeriodToPeriod(
    @Body() dto: ConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto,
  ): Promise<ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto> {
    return await this.convertGeneralUrbanRetirementReviewSpecialPeriodUseCase.execute(
      dto.json.generalUrbanRetirementReviewId,
      dto.json.generalUrbanRetirementReviewSpecialPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Comparar CNIS e CTPS para análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/compare-cnis-ctps',
      method: RequestMethod.POST,
      type: CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da comparação CNIS x CTPS criado com sucesso.',
      type: CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async compareCnisCtps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto> {
    return await this.compareGeneralUrbanRetirementReviewCnisCtpsUseCase.execute(
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Tempo Rural realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeRuralTime(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Militar realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeMilitaryService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Serviço Público realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePublicService(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de CTPS fora do CNIS realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeCtpsOutsideCnis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Aluno-Aprendiz realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeApprenticeStudent(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho no Exterior realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeWorkAbroad(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewPppRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de PPP recebida com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewPppResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzePpp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewPppResponseDto> {
    return await this.analyzeGeneralUrbanRetirementReviewPppUseCase.execute(
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Trabalho Informal realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeInformalWork(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de Sentença Trabalhista realizada com sucesso.',
      type: AnalyzeGeneralUrbanRetirementReviewCnisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async analyzeLaborCourtDecision(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: AnalyzeGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewCnisResponseDto> {
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
      type: CreateGeneralUrbanRetirementReviewTimeAcceleratorRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Registro na tabela de acelerador de tempo criado com sucesso.',
      type: CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTimeAccelerator(
    @Body() dto: CreateGeneralUrbanRetirementReviewTimeAcceleratorRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    return await this.createGeneralUrbanRetirementReviewTimeAcceleratorUseCase.execute(
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
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Registro na tabela de acelerador de tempo deletado com sucesso.',
      type: DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteTimeAccelerator(
    @Param(
      'acceleratorId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewTimeAcceleratorId),
    )
    acceleratorId: GeneralUrbanRetirementReviewTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    return await this.deleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase.execute(
      acceleratorId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar períodos da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de períodos retornada com sucesso.',
      type: ListGeneralUrbanRetirementReviewPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listPeriod(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<ListGeneralUrbanRetirementReviewPeriodResponseDto> {
    return await this.listGeneralUrbanRetirementReviewPeriodUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar aceleradores de tempo da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de aceleradores de tempo retornada com sucesso.',
      type: ListGeneralUrbanRetirementReviewTimeAcceleratorResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listTimeAccelerator(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListGeneralUrbanRetirementReviewTimeAcceleratorRequestDto,
  ): Promise<ListGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    return await this.listGeneralUrbanRetirementReviewTimeAcceleratorUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Extrair acelerador de tempo (JSON) de um resultado de análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-result/:generalUrbanRetirementReviewAnalysisResultId/time-accelerator',
      method: RequestMethod.GET,
    },
    tag: ['acrescimo-tempo'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'JSON extraído do resultado de análise retornado com sucesso.',
      type: GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getTimeAcceleratorFromAnalysisResult(
    @Param(
      'generalUrbanRetirementReviewAnalysisResultId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewAnalysisResultId),
    )
    generalUrbanRetirementReviewAnalysisResultId: GeneralUrbanRetirementReviewAnalysisResultId,
  ): Promise<GetGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisResponseDto> {
    return await this.getGeneralUrbanRetirementReviewTimeAcceleratorFromAnalysisUseCase.execute(
      generalUrbanRetirementReviewAnalysisResultId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de revisão de aposentadoria urbana geral por id',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise retornada com sucesso.',
      type: GetGeneralUrbanRetirementReviewResponse,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async get(
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewResponse> {
    return await this.getGeneralUrbanRetirementReviewUseCase.execute(
      generalUrbanRetirementReviewId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar uma análise de pendência sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'date-without-leave-analysis',
      method: RequestMethod.POST,
      type: CreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de documento sem data de saída criada com sucesso.',
      type: CreateGeneralUrbanRetirementReviewPeriodDocumentResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createPeriodDocument(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateGeneralUrbanRetirementReviewPeriodDocumentRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewPeriodDocumentResponseDto> {
    return await this.createGeneralUrbanRetirementReviewPeriodDocumentUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar ganhos abaixo do mínimo de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId/earnings/below-minimum',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos abaixo do mínimo retornados com sucesso.',
      type: GetGeneralUrbanRetirementReviewPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsBelowMinimum(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar ganhos sem data de saída de um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId/earnings/without-leave-date',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos sem data de saída retornados com sucesso.',
      type: GetGeneralUrbanRetirementReviewPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsWithoutLeaveDate(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementReviewPeriodEarningsWithoutLeaveDateUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar ganhos de um período com competências em atraso',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId/earnings/overdue',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ganhos com competências em atraso retornados com sucesso.',
      type: GetGeneralUrbanRetirementReviewPeriodEarningResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getPeriodEarningsOverdue(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodEarningResponseDto[]> {
    return await this.getGeneralUrbanRetirementReviewPeriodEarningsOverdueUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Ação sobre período sem data de saída',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId/leave-date-action',
      method: RequestMethod.POST,
      type: PeriodLeaveDateActionRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description:
        'Ação sobre período sem data de saída realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodLeaveDateAction(
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
    @Body() dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    await this.periodLeaveDateActionUseCase.execute(
      generalUrbanRetirementReviewPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Considerar, desconsiderar ou considerar provisoriamente um período',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'period/:generalUrbanRetirementReviewPeriodId/consideration-action',
      method: RequestMethod.POST,
      type: PeriodConsiderationActionRequestDto,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Ação sobre consideração do período realizada com sucesso.',
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async periodConsiderationAction(
    @Param(
      'generalUrbanRetirementReviewPeriodId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewPeriodId),
    )
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
    @Body() dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    await this.periodConsiderationActionUseCase.execute(
      generalUrbanRetirementReviewPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter todos os detalhes da análise de revisão de aposentadoria urbana geral',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':generalUrbanRetirementReviewId/details',
      method: RequestMethod.GET,
    },
    tag: ['revisao-aposentadoria-urbana-geral'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes da análise retornados com sucesso.',
      type: GetGeneralUrbanRetirementReviewDetailsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'generalUrbanRetirementReviewId',
      new ParseValueObjectPipe(GeneralUrbanRetirementReviewId),
    )
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewDetailsResponseDto> {
    return await this.getGeneralUrbanRetirementReviewDetailsUseCase.execute(
      sessionData,
      organizationSessionData,
      generalUrbanRetirementReviewId,
    );
  }
}
