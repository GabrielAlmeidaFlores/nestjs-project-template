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
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { AnalyzeRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/analyze-retirement-planning-rgps-cnis.request.dto';
import { AnalyzeRetirementPlanningRgpsPppRequestDto } from '@module/customer/analysis-tool/dto/request/analyze-retirement-planning-rgps-ppp.request.dto';
import { CompareRetirementPlanningRgpsCnisCtpsRequestDto } from '@module/customer/analysis-tool/dto/request/compare-retirement-planning-rgps-cnis-ctps.request.dto';
import { ConvertRetirementPlanningRgpsSpecialPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/convert-retirement-planning-rgps-special-period.request.dto';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/create-cnis-fast-analysis.request.dto';
import { CreateLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/create-legal-pleading.request.dto';
import { CreateRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-cnis.request.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-period-document.request.dto';
import { CreateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-period.request.dto';
import { CreateRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-time-accelerator.request.dto';
import { CreateRetirementPlanningRgpsRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps.request.dto';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';
import { ListRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/list-retirement-planning-rgps-period.request.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/dto/request/list-retirement-planning-rgps-time-accelerator.request.dto';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateCnisFastAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-cnis-fast-analysis.request.dto';
import { UpdateLegalPleadingCompleteAnalysisRequestDto } from '@module/customer/analysis-tool/dto/request/update-legal-pleading-complete-analysis.request.dto';
import { UpdateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/update-retirement-planning-rgps-period.request.dto';
import { UpdateRetirementPlanningRgpsResultRequestDto } from '@module/customer/analysis-tool/dto/request/update-retirement-planning-rgps-result.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/analyze-retirement-planning-rgps-cnis.response.dto';
import { AnalyzeRetirementPlanningRgpsPppResponseDto } from '@module/customer/analysis-tool/dto/response/analyze-retirement-planning-rgps-ppp.response.dto';
import { CompareRetirementPlanningRgpsCnisCtpsResponseDto } from '@module/customer/analysis-tool/dto/response/compare-retirement-planning-rgps-cnis-ctps.response.dto';
import { ConvertRetirementPlanningRgpsSpecialPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/convert-retirement-planning-rgps-special-period-response.response.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CreateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-cnis-fast-analysis.response.dto';
import { CreateLegalPleadingDocumentAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-document-analysis.response.dto';
import { CreateLegalPleadingResultResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading-result.response.dto';
import { CreateLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/create-legal-pleading.response.dto';
import { CreateRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-cnis.response.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-period-document.response.dto';
import { CreateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-period.response.dto';
import { CreateRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-time-accelerator.response.dto';
import { CreateRetirementPlanningRgpsResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps.response.dto';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { DeleteAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-record.response';
import { DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/dto/response/delete-retirement-planning-rgps-time-accelerator.response.dto';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-cnis-fast-analysis.response.dto';
import { GetLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/get-legal-pleading.response.dto';
import { GetRetirementPlanningRgpsPeriodEarningResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-period-earning.response.dto';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-time-accelerator-from-analysis.response.dto';
import { GetRetirementPlanningRgpsResponse } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps.response.dto';
import { ListAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-client.response.dto';
import { ListAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/list-analysis-tool-record.response.dto';
import { ListLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/list-legal-pleading.response.dto';
import { ListRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/list-retirement-planning-rgps-period.response.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/dto/response/list-retirement-planning-rgps-time-accelerator.response.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { UpdateCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-cnis-fast-analysis.response.dto';
import { UpdateLegalPleadingCompleteAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-complete-analysis.response.dto';
import { UpdateLegalPleadingStatusToCompleteResponseDto } from '@module/customer/analysis-tool/dto/response/update-legal-pleading-to-complete-status.response.dto';
import { UpdateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/update-retirement-planning-rgps-period.response.dto';
import { UpdateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/dto/response/update-retirement-planning-rgps-result.response.dto';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { AnalyzeApprenticeStudentUseCase } from '@module/customer/analysis-tool/use-case/analyze-apprentice-student.use-case';
import { AnalyzeInformalWorkUseCase } from '@module/customer/analysis-tool/use-case/analyze-informal-work.use-case';
import { AnalyzeLaborCourtDecisionUseCase } from '@module/customer/analysis-tool/use-case/analyze-labor-court-decision.use-case';
import { AnalyzeMilitaryServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-military-service.use-case';
import { AnalyzePublicServiceUseCase } from '@module/customer/analysis-tool/use-case/analyze-public-service.use-case';
import { AnalyzeRetirementPlanningRgpsPppUseCase } from '@module/customer/analysis-tool/use-case/analyze-retirement-planning-rgps-ppp.use-case';
import { AnalyzeRuralTimeUseCase } from '@module/customer/analysis-tool/use-case/analyze-rural-time.use-case';
import { AnalyzeWorkAbroadUseCase } from '@module/customer/analysis-tool/use-case/analyze-work-abroad.use-case';
import { CompareRetirementPlanningRgpsCnisCtpsUseCase } from '@module/customer/analysis-tool/use-case/compare-retirement-planning-rgps-cnis-ctps.use-case';
import { ConvertRetirementPlanningRgpsSpecialPeriodUseCase } from '@module/customer/analysis-tool/use-case/convert-retirement-planning-rgps-special-period.use-case';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { CreateCnisFastAnalysisResultUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis-result.use-case';
import { CreateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-cnis-fast-analysis.use-case';
import { CreateLegalPleadingDocumentAnalysisUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-document-analysis.use-case';
import { CreateLegalPleadingResultUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading-result.use-case';
import { CreateLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/create-legal-pleading.use-case';
import { CreateMultipleRetirementPlanningRgpsPeriodsUseCase } from '@module/customer/analysis-tool/use-case/create-multiple-retirement-planning-rgps-periods.use-case';
import { CreateRetirementPlanningRgpsCnisUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-cnis.use-case';
import { CreateRetirementPlanningRgpsPeriodDocumentUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-period-document.use-case';
import { CreateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-period.use-case';
import { CreateRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps-time-accelerator.use-case';
import { CreateRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/use-case/create-retirement-planning-rgps.use-case';
import { DeleteAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-client.use-case';
import { DeleteAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/delete-analysis-tool-record.use-case';
import { DeleteRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/delete-retirement-planning-rgps-time-accelerator.use-case';
import { DownloadCnisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-complete-analysis.use-case';
import { DownloadCnisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-cnis-simplified-analysis.use-case';
import { DownloadLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-complete-analysis.use-case';
import { DownloadLegalPleadingSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/use-case/download-legal-pleading-simplified-analysis.use-case';
import { GetAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/get-analysis-tool-client.use-case';
import { GetCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-cnis-fast-analysis.use-case';
import { GetLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/get-legal-pleading.use-case';
import { GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-period-earnings-below-minimum.use-case';
import { GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps-time-accelerator-from-analysis.use-case';
import { GetRetirementPlanningRgpsUseCase } from '@module/customer/analysis-tool/use-case/get-retirement-planning-rgps.use-case';
import { ListAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-client.use-case';
import { ListAnalysisToolRecordUseCase } from '@module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case';
import { ListLegalPleadingUseCase } from '@module/customer/analysis-tool/use-case/list-legal-pleading.use-case';
import { ListRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rgps-period.use-case';
import { ListRetirementPlanningRgpsTimeAcceleratorUseCase } from '@module/customer/analysis-tool/use-case/list-retirement-planning-rgps-time-accelerator.use-case';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { UpdateCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-cnis-fast-analysis.use-case';
import { UpdateLegalPleadingCompleteAnalysisUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-complete-analysis.use-case';
import { UpdateLegalPleadingStatusToCompleteUseCase } from '@module/customer/analysis-tool/use-case/update-legal-pleading-status-to-complete.use-case';
import { UpdateRetirementPlanningRgpsPeriodUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rgps-period.use-case';
import { UpdateRetirementPlanningRgpsResultUseCase } from '@module/customer/analysis-tool/use-case/update-retirement-planning-rgps-result.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { CreateMultipleRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/create-multiple-retirement-planning-rgps-period.request.dto';
import { CreateMultipleRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/create-multiple-retirement-planning-rgps-period.response.dto';

@CustomerControllerRoute('analysis-tool')
export class AnalysisToolController {
  protected readonly _type = AnalysisToolController.name;

  public constructor(
    private readonly createCnisFastAnalysisUseCase: CreateCnisFastAnalysisUseCase,
    private readonly createCnisFastAnalysisResultUseCase: CreateCnisFastAnalysisResultUseCase,
    private readonly getCnisFastAnalysisUseCase: GetCnisFastAnalysisUseCase,
    private readonly listAnalysisToolClientUseCase: ListAnalysisToolClientUseCase,
    private readonly createAnalysisToolClientUseCase: CreateAnalysisToolClientUseCase,
    private readonly deleteAnalysisToolClientUseCase: DeleteAnalysisToolClientUseCase,
    private readonly createLegalPleadingUseCase: CreateLegalPleadingUseCase,
    private readonly downloadCnisCompleteAnalysisUseCase: DownloadCnisCompleteAnalysisUseCase,
    private readonly downloadCnisSimplifiedAnalysisUseCase: DownloadCnisSimplifiedAnalysisUseCase,
    private readonly createLegalPleadingResultUseCase: CreateLegalPleadingResultUseCase,
    private readonly listAnalysisToolRecordUseCase: ListAnalysisToolRecordUseCase,
    private readonly getLegalPleadingUseCase: GetLegalPleadingUseCase,
    private readonly listLegalPleadingUseCase: ListLegalPleadingUseCase,
    private readonly createLegalPleadingDocumentAnalysisUseCase: CreateLegalPleadingDocumentAnalysisUseCase,
    private readonly downloadLegalPleadingSimplifiedAnalysisUseCase: DownloadLegalPleadingSimplifiedAnalysisUseCase,
    private readonly downloadLegalPleadingCompleteAnalysisUseCase: DownloadLegalPleadingCompleteAnalysisUseCase,
    private readonly updateLegalPleadingCompleteAnalysisUseCase: UpdateLegalPleadingCompleteAnalysisUseCase,
    private readonly updateLegalPleadingToCompleteStatusUseCase: UpdateLegalPleadingStatusToCompleteUseCase,
    private readonly updateAnalysisToolClientUseCase: UpdateAnalysisToolClientUseCase,
    private readonly getAnalysisToolClientUseCase: GetAnalysisToolClientUseCase,
    private readonly updateCnisFastAnalysisUseCase: UpdateCnisFastAnalysisUseCase,
    private readonly deleteAnalysisToolRecordUseCase: DeleteAnalysisToolRecordUseCase,
    private readonly createRetirementPlanningRgpsUseCase: CreateRetirementPlanningRgpsUseCase,
    private readonly createRetirementPlanningRgpsCnisUseCase: CreateRetirementPlanningRgpsCnisUseCase,
    private readonly createRetirementPlanningRgpsPeriodUseCase: CreateRetirementPlanningRgpsPeriodUseCase,
    private readonly createMultipleRetirementPlanningRgpsPeriodsUseCase: CreateMultipleRetirementPlanningRgpsPeriodsUseCase,
    private readonly updateRetirementPlanningRgpsPeriodUseCase: UpdateRetirementPlanningRgpsPeriodUseCase,
    private readonly updateRetirementPlanningRgpsResultUseCase: UpdateRetirementPlanningRgpsResultUseCase,
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
    private readonly analyzeCtpsOutsideCnisUseCase: AnalyzeRuralTimeUseCase,
    private readonly createRetirementPlanningRgpsTimeAcceleratorUseCase: CreateRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly deleteRetirementPlanningRgpsTimeAcceleratorUseCase: DeleteRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly listRetirementPlanningRgpsTimeAcceleratorUseCase: ListRetirementPlanningRgpsTimeAcceleratorUseCase,
    private readonly listRetirementPlanningRgpsPeriodUseCase: ListRetirementPlanningRgpsPeriodUseCase,
    private readonly getRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase: GetRetirementPlanningRgpsPeriodEarningsBelowMinimumUseCase,
    private readonly createRetirementPlanningRgpsPeriodDocumentUseCase: CreateRetirementPlanningRgpsPeriodDocumentUseCase,
    private readonly getRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase: GetRetirementPlanningRgpsTimeAcceleratorFromAnalysisUseCase,
    private readonly getRetirementPlanningRgpsUseCase: GetRetirementPlanningRgpsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record',
      method: RequestMethod.GET,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de registros de análises retornada com sucesso.',
      type: ListAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListAnalysisToolRecordRequestDto,
  ): Promise<ListAnalysisToolRecordResponseDto> {
    return await this.listAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Deletar registros de análises',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-record/:analysisToolRecordId',
      method: RequestMethod.DELETE,
    },
    tag: ['registro-de-analises'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Registro de análise deletado com sucesso.',
      type: DeleteAnalysisToolRecordResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteAnalysisToolRecord(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolRecordId',
      new ParseValueObjectPipe(AnalysisToolRecordId),
    )
    analysisToolRecordId: AnalysisToolRecordId,
  ): Promise<DeleteAnalysisToolRecordResponseDto> {
    return await this.deleteAnalysisToolRecordUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolRecordId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar clientes da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de clientes da análise retornada com sucesso.',
      type: ListAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData()
    sessionData: SessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAnalysisToolClientResponseDto> {
    return await this.listAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client',
      method: RequestMethod.POST,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente da análise criado com sucesso.',
      type: CreateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateAnalysisToolClientRequestDto,
  ): Promise<CreateAnalysisToolClientResponseDto> {
    return await this.createAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':analysisToolClientId',
      method: RequestMethod.PATCH,
      type: UpdateAnalysisToolClientRequestDto,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente atualizado com sucesso.',
      type: UpdateAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData() sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
    @Body() dto: UpdateAnalysisToolClientRequestDto,
  ): Promise<UpdateAnalysisToolClientResponseDto> {
    return await this.updateAnalysisToolClientUseCase.execute(
      analysisToolClientId,
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter cliente da análise por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.GET,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do cliente da análise retornados com sucesso.',
      type: GetAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAnalysisToolClient(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData()
    sessionData: SessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientResponseDto> {
    return await this.getAnalysisToolClientUseCase.execute(
      organizationSessionData,
      sessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar peças processuais',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de peças processuais retornada com sucesso.',
      type: ListLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListLegalPleadingRequestDto,
  ): Promise<ListLegalPleadingResponseDto> {
    return await this.listLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading',
      method: RequestMethod.POST,
      type: CreateLegalPleadingRequestDto,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Peça processual criada com sucesso.',
      type: CreateLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleading(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateLegalPleadingRequestDto,
  ): Promise<CreateLegalPleadingResponseDto> {
    return await this.createLegalPleadingUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise completa da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/complete-analysis',
      method: RequestMethod.PATCH,
      type: UpdateLegalPleadingCompleteAnalysisRequestDto,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Análise completa da peça processual atualizada com sucesso.',
      type: UpdateLegalPleadingCompleteAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalPleadingCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Body() dto: UpdateLegalPleadingCompleteAnalysisRequestDto,
  ): Promise<UpdateLegalPleadingCompleteAnalysisResponseDto> {
    return await this.updateLegalPleadingCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar o status da peça processual para completo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/complete',
      method: RequestMethod.PATCH,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Status de peça processual atualizado com sucesso',
      type: UpdateLegalPleadingStatusToCompleteResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateLegalPleadingStatusToComplete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<UpdateLegalPleadingStatusToCompleteResponseDto> {
    return await this.updateLegalPleadingToCompleteStatusUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/result',
      method: RequestMethod.POST,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da peça processual criado com sucesso.',
      type: CreateLegalPleadingResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleadingResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingResultResponseDto> {
    return await this.createLegalPleadingResultUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de documento da peça processual',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/document-analysis',
      method: RequestMethod.POST,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Análise de documento da peça processual criada com sucesso.',
      type: CreateLegalPleadingDocumentAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createLegalPleadingDocumentAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<CreateLegalPleadingDocumentAnalysisResponseDto> {
    return await this.createLegalPleadingDocumentAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter peça processual por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da peça processual retornados com sucesso.',
      type: GetLegalPleadingResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getLegalPleading(
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @GetSessionData()
    sessionData: SessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
  ): Promise<GetLegalPleadingResponseDto> {
    return await this.getLegalPleadingUseCase.execute(
      organizationSessionData,
      legalPleadingId,
      sessionData,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.PATCH,
      type: UpdateCnisFastAnalysisRequestDto,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise rápida de CNIS atualizada com sucesso.',
      type: UpdateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: UpdateCnisFastAnalysisRequestDto,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<UpdateCnisFastAnalysisResponseDto> {
    return await this.updateCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis-fast-analysis',
      method: RequestMethod.POST,
      type: CreateCnisFastAnalysisRequestDto,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise rápida de CNIS criada com sucesso.',
      type: CreateCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateCnisFastAnalysisRequestDto,
  ): Promise<CreateCnisFastAnalysisResponseDto> {
    return await this.createCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Remover cliente da análise',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'analysis-tool-client/:analysisToolClientId',
      method: RequestMethod.DELETE,
    },
    tag: ['cliente-da-analise'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Cliente da análise removido com sucesso.',
      type: DeleteAnalysisToolClientResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async removeAnalysisToolClient(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'analysisToolClientId',
      new ParseValueObjectPipe(AnalysisToolClientId),
    )
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    return await this.deleteAnalysisToolClientUseCase.execute(
      sessionData,
      organizationSessionData,
      analysisToolClientId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise rápida de CNIS por ID',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados da análise rápida de CNIS retornados com sucesso.',
      type: GetCnisFastAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getCnisFastAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<GetCnisFastAnalysisResponseDto> {
    return await this.getCnisFastAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de CNIS simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/cnis-fast-analysis/:cnisFastAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de CNIS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCnisSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadCnisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de CNIS completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '/cnis-fast-analysis/:cnisFastAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de CNIS retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCnisCompletedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadCnisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de Peça Processual simplificada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise simplificada de peça processual retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadLegalPleadingSimplifiedAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadLegalPleadingSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise de Peça Processual completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'legal-pleading/:legalPleadingId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['peca-processual'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Arquivo da análise completa de peça processual retornado para download.',
      type: Buffer,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadLegalPleadingCompleteAnalysisById(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('legalPleadingId', new ParseValueObjectPipe(LegalPleadingId))
    legalPleadingId: LegalPleadingId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum = ExportDocumentFormatEnum.PDF,
  ): Promise<StreamableFile> {
    return await this.downloadLegalPleadingCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      legalPleadingId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar resultado da análise rápida de CNIS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'cnis-fast-analysis/:cnisFastAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['analise-rapida-cnis'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Resultado da análise rápida de CNIS criado com sucesso.',
      type: CreateCnisFastAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCnisFastAnalysisResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('cnisFastAnalysisId', new ParseValueObjectPipe(CnisFastAnalysisId))
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    return await this.createCnisFastAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      cnisFastAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Criar planejamento previdenciário para o regime geral de previdência social (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps',
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
      path: 'retirement-planning-rgps-cnis',
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
    @Body()
    dto: CreateRetirementPlanningRgpsCnisRequestDto,
  ): Promise<CreateRetirementPlanningRgpsCnisResponseDto> {
    return await this.createRetirementPlanningRgpsCnisUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary:
      'Adicionar período para o regime geral de previdência social (RGPS)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps-period',
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
      path: 'retirement-planning-rgps-period/bulk',
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
    return await this.createMultipleRetirementPlanningRgpsPeriodsUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar nome e categoria do período RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps-period/:retirementPlanningRgpsPeriodId',
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
    summary: 'Atualizar resultado do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps/:retirementPlanningRgpsId/result',
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
    summary: 'Converter período especial (PPP) em período RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps-period/convert-from-special',
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
      path: 'retirement-planning-rgps-period/compare-cnis-ctps',
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
    @Body() dto: CompareRetirementPlanningRgpsCnisCtpsRequestDto,
  ): Promise<CompareRetirementPlanningRgpsCnisCtpsResponseDto> {
    return await this.compareRetirementPlanningRgpsCnisCtpsUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeRuralTimeUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeMilitaryServiceUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzePublicServiceUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeCtpsOutsideCnisUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeApprenticeStudentUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeWorkAbroadUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsPppRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsPppResponseDto> {
    return await this.analyzeRetirementPlanningRgpsPppUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeInformalWorkUseCase.execute(dto);
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
    @Body() dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    return await this.analyzeLaborCourtDecisionUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Criar um registro na tabela de acelerador de tempo',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps-time-accelerator',
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
      path: 'retirement-planning-rgps-time-accelerator/:acceleratorId',
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
      path: 'retirement-planning-rgps-period',
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
      path: 'retirement-planning-rgps-time-accelerator',
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
      path: 'retirement-planning-rgps-analysis-result/:retirementPlanningRgpsAnalysisResultId/time-accelerator',
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
      path: 'retirement-planning-rgps/:retirementPlanningRgpsId',
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
      path: 'retirement-planning-rgps/date-without-leave-analysis',
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
    @Body() dto: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodDocumentResponseDto> {
    return await this.createRetirementPlanningRgpsPeriodDocumentUseCase.execute(
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Listar ganhos abaixo do mínimo de um período do planejamento previdenciário RGPS',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'retirement-planning-rgps/period/:retirementPlanningRgpsPeriodId/earnings/below-minimum',
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
}
