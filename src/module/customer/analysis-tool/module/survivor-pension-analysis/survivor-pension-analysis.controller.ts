import {
  Body,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Query,
  RequestMethod,
  StreamableFile,
} from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';
import { CalculateSurvivorPensionAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/calculate-survivor-pension-analysis-remuneration.request.dto';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-benefit-originator-identification.request.dto';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-customer-profile-identification.request.dto';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-deceased-benefit-dependents.request.dto';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-deceased-work-history-period.request.dto';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-deceased-work-history.request.dto';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-result-dependent-pension-analysis.request.dto';
import { CreateSurvivorPensionAnalysisResultRetirementRuleRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis-result-retirement-rule.request.dto';
import { CreateSurvivorPensionAnalysisRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/create-survivor-pension-analysis.request.dto';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-benefit-originator-identification-documents.request.dto';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-customer-profile-identification-documents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-benefit-dependents-documents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-benefit-dependents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-work-history-period-documents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-work-history-periods.request.dto';
import { UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-benefit-originator-identification.request.dto';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-customer-profile-identification.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-benefit-dependents.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-work-history-period.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-work-history.request.dto';
import { CalculateSurvivorPensionAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/calculate-survivor-pension-analysis-remuneration.response.dto';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-customer-profile-identification.response.dto';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-deceased-work-history.response.dto';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { CreateSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-result-retirement-rule.response.dto';
import { CreateSurvivorPensionAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis-result.response.dto';
import { CreateSurvivorPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/create-survivor-pension-analysis.response.dto';
import { DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-customer-profile-identification.response.dto';
import { DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-deceased-work-history.response.dto';
import { DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-result-dependent-pension-analysis.response.dto';
import { DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis-result-retirement-rule.response.dto';
import { DeleteSurvivorPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/delete-survivor-pension-analysis.response.dto';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-customer-profile-identification.response.dto';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-deceased-work-history.response.dto';
import { GetSurvivorPensionAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis-result.response.dto';
import { GetSurvivorPensionAnalysisResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/get-survivor-pension-analysis.response.dto';
import { ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-deceased-work-history-periods.response.dto';
import { ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-result-dependent-pension-analyses.response.dto';
import { ListSurvivorPensionAnalysisResultRetirementRulesResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/list-survivor-pension-analysis-result-retirement-rules.response.dto';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-benefit-originator-identification-documents.response.dto';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-customer-profile-identification-documents.response.dto';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-benefit-dependents-documents.response.dto';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-work-history-period-documents.response.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-work-history-periods.response.dto';
import { UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-benefit-originator-identification.response.dto';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-customer-profile-identification.response.dto';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-benefit-dependents.response.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-work-history.response.dto';
import { CalculateSurvivorPensionAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/calculate-survivor-pension-analysis-remuneration.use-case';
import { CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-benefit-originator-identification.use-case';
import { CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-customer-profile-identification.use-case';
import { CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-work-history-period.use-case';
import { CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-deceased-work-history.use-case';
import { CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result-dependent-pension-analysis.use-case';
import { CreateSurvivorPensionAnalysisResultRetirementRuleUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result-retirement-rule.use-case';
import { CreateSurvivorPensionAnalysisResultUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis-result.use-case';
import { CreateSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/create-survivor-pension-analysis.use-case';
import { DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-benefit-originator-identification.use-case';
import { DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-customer-profile-identification.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-work-history-period.use-case';
import { DeleteSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-deceased-work-history.use-case';
import { DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-result-dependent-pension-analysis.use-case';
import { DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis-result-retirement-rule.use-case';
import { DeleteSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/delete-survivor-pension-analysis.use-case';
import { DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/download-survivor-pension-analysis-complete-analysis.use-case';
import { DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/download-survivor-pension-analysis-simplified-analysis.use-case';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-benefit-originator-identification.use-case';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-customer-profile-identification.use-case';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-work-history-period.use-case';
import { GetSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-deceased-work-history.use-case';
import { GetSurvivorPensionAnalysisResultUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis-result.use-case';
import { GetSurvivorPensionAnalysisUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/get-survivor-pension-analysis.use-case';
import { ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-deceased-work-history-periods.use-case';
import { ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-result-dependent-pension-analyses.use-case';
import { ListSurvivorPensionAnalysisResultRetirementRulesUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/list-survivor-pension-analysis-result-retirement-rules.use-case';
import { PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-benefit-originator-identification-documents.use-case';
import { PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-customer-profile-identification-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-benefit-dependents-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-work-history-period-documents.use-case';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/put-survivor-pension-analysis-deceased-work-history-periods.use-case';
import { UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-benefit-originator-identification.use-case';
import { UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-customer-profile-identification.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-benefit-dependents.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-work-history-period.use-case';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase } from '@module/customer/analysis-tool/module/survivor-pension-analysis/use-case/update-survivor-pension-analysis-deceased-work-history.use-case';
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

@CustomerControllerRoute('analysis-tool/survivor-pension-analysis')
export class SurvivorPensionAnalysisController {
  protected readonly _type = SurvivorPensionAnalysisController.name;

  public constructor(
    private readonly createSurvivorPensionAnalysisUseCase: CreateSurvivorPensionAnalysisUseCase,
    private readonly getSurvivorPensionAnalysisUseCase: GetSurvivorPensionAnalysisUseCase,
    private readonly deleteSurvivorPensionAnalysisUseCase: DeleteSurvivorPensionAnalysisUseCase,
    private readonly createSurvivorPensionAnalysisCpiUseCase: CreateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    private readonly updateSurvivorPensionAnalysisCpiUseCase: UpdateSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    private readonly deleteSurvivorPensionAnalysisCpiUseCase: DeleteSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    private readonly getSurvivorPensionAnalysisCpiUseCase: GetSurvivorPensionAnalysisCustomerProfileIdentificationUseCase,
    private readonly putSurvivorPensionAnalysisCpiDocsUseCase: PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsUseCase,
    private readonly createSurvivorPensionAnalysisBoiUseCase: CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    private readonly updateSurvivorPensionAnalysisBoiUseCase: UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    private readonly deleteSurvivorPensionAnalysisBoiUseCase: DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    private readonly getSurvivorPensionAnalysisBoiUseCase: GetSurvivorPensionAnalysisBenefitOriginatorIdentificationUseCase,
    private readonly putSurvivorPensionAnalysisBoiDocsUseCase: PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsUseCase,
    private readonly createSurvivorPensionAnalysisDwhUseCase: CreateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    private readonly updateSurvivorPensionAnalysisDwhUseCase: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    private readonly deleteSurvivorPensionAnalysisDwhUseCase: DeleteSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    private readonly getSurvivorPensionAnalysisDwhUseCase: GetSurvivorPensionAnalysisDeceasedWorkHistoryUseCase,
    private readonly createSurvivorPensionAnalysisDwhpUseCase: CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    private readonly updateSurvivorPensionAnalysisDwhpUseCase: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    private readonly deleteSurvivorPensionAnalysisDwhpUseCase: DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    private readonly getSurvivorPensionAnalysisDwhpUseCase: GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase,
    private readonly listSurvivorPensionAnalysisDwhpsUseCase: ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase,
    private readonly putSurvivorPensionAnalysisDwhpsUseCase: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase,
    private readonly putSurvivorPensionAnalysisDwhpDocsUseCase: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase,
    private readonly createSurvivorPensionAnalysisDbdUseCase: CreateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly updateSurvivorPensionAnalysisDbdUseCase: UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly deleteSurvivorPensionAnalysisDbdUseCase: DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly getSurvivorPensionAnalysisDbdUseCase: GetSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly listSurvivorPensionAnalysisDbdsUseCase: ListSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly putSurvivorPensionAnalysisDbdsUseCase: PutSurvivorPensionAnalysisDeceasedBenefitDependentsUseCase,
    private readonly putSurvivorPensionAnalysisDbdDocsUseCase: PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsUseCase,
    private readonly getSurvivorPensionAnalysisResultUseCase: GetSurvivorPensionAnalysisResultUseCase,
    private readonly createSurvivorPensionAnalysisResultUseCase: CreateSurvivorPensionAnalysisResultUseCase,
    private readonly createSurvivorPensionAnalysisRrUseCase: CreateSurvivorPensionAnalysisResultRetirementRuleUseCase,
    private readonly deleteSurvivorPensionAnalysisRrUseCase: DeleteSurvivorPensionAnalysisResultRetirementRuleUseCase,
    private readonly listSurvivorPensionAnalysisRrsUseCase: ListSurvivorPensionAnalysisResultRetirementRulesUseCase,
    private readonly createSurvivorPensionAnalysisDpaUseCase: CreateSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase,
    private readonly deleteSurvivorPensionAnalysisDpaUseCase: DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisUseCase,
    private readonly listSurvivorPensionAnalysisDpasUseCase: ListSurvivorPensionAnalysisResultDependentPensionAnalysesUseCase,
    private readonly downloadSurvivorPensionAnalysisCompleteAnalysisUseCase: DownloadSurvivorPensionAnalysisCompleteAnalysisUseCase,
    private readonly downloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase: DownloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase,
    private readonly calculateSurvivorPensionAnalysisRemunerationUseCase: CalculateSurvivorPensionAnalysisRemunerationUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de pensão por morte criada com sucesso.',
      type: CreateSurvivorPensionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async create(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateSurvivorPensionAnalysisRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisResponseDto> {
    return this.createSurvivorPensionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter análise de pensão por morte completa',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':survivorPensionAnalysisId', method: RequestMethod.GET },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de pensão por morte obtida com sucesso.',
      type: GetSurvivorPensionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async get(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResponseDto> {
    return this.getSurvivorPensionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: { path: ':survivorPensionAnalysisId', method: RequestMethod.DELETE },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de pensão por morte excluída com sucesso.',
      type: DeleteSurvivorPensionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async delete(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<DeleteSurvivorPensionAnalysisResponseDto> {
    return this.deleteSurvivorPensionAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Calcular remunerações da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'remuneration-calculation',
      method: RequestMethod.POST,
      type: CalculateSurvivorPensionAnalysisRemunerationRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Remunerações calculadas com sucesso.',
      type: CalculateSurvivorPensionAnalysisRemunerationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async calculateRemuneration(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CalculateSurvivorPensionAnalysisRemunerationRequestDto,
  ): Promise<CalculateSurvivorPensionAnalysisRemunerationResponseDto> {
    return this.calculateSurvivorPensionAnalysisRemunerationUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar identificação do perfil do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/customer-profile-identification',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Identificação do perfil do cliente criada com sucesso.',
      type: CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createCpi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body()
    dto: CreateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    return this.createSurvivorPensionAnalysisCpiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar identificação do perfil do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'customer-profile-identification/:survivorPensionAnalysisCustomerProfileIdentificationId',
      method: RequestMethod.PATCH,
      type: UpdateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Identificação do perfil do cliente atualizada com sucesso.',
      type: UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateCpi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisCustomerProfileIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisCustomerProfileIdentificationId,
      ),
    )
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    @Body()
    dto: UpdateSurvivorPensionAnalysisCustomerProfileIdentificationRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    return this.updateSurvivorPensionAnalysisCpiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisCustomerProfileIdentificationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir identificação do perfil do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'customer-profile-identification/:survivorPensionAnalysisCustomerProfileIdentificationId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Identificação do perfil do cliente excluída com sucesso.',
      type: DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteCpi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisCustomerProfileIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisCustomerProfileIdentificationId,
      ),
    )
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<DeleteSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    return this.deleteSurvivorPensionAnalysisCpiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisCustomerProfileIdentificationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter identificação do perfil do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'customer-profile-identification/:survivorPensionAnalysisCustomerProfileIdentificationId',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Identificação do perfil do cliente obtida com sucesso.',
      type: GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getCpi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisCustomerProfileIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisCustomerProfileIdentificationId,
      ),
    )
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationResponseDto> {
    return this.getSurvivorPensionAnalysisCpiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisCustomerProfileIdentificationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir documentos da identificação do perfil do cliente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/customer-profile-identification/documents',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Documentos da identificação do perfil do cliente substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putCpiDocs(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body()
    dto: PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisCustomerProfileIdentificationDocumentsResponseDto> {
    return this.putSurvivorPensionAnalysisCpiDocsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar identificação do originador do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/benefit-originator-identification',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Identificação do originador do benefício criada com sucesso.',
      type: CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createBoi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body()
    dto: CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    return this.createSurvivorPensionAnalysisBoiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar identificação do originador do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'benefit-originator-identification/:survivorPensionAnalysisBenefitOriginatorIdentificationId',
      method: RequestMethod.PATCH,
      type: UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Identificação do originador do benefício atualizada com sucesso.',
      type: UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateBoi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisBenefitOriginatorIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
      ),
    )
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
    @Body()
    dto: UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    return this.updateSurvivorPensionAnalysisBoiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisBenefitOriginatorIdentificationId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir identificação do originador do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'benefit-originator-identification/:survivorPensionAnalysisBenefitOriginatorIdentificationId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Identificação do originador do benefício excluída com sucesso.',
      type: DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteBoi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisBenefitOriginatorIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
      ),
    )
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<DeleteSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    return this.deleteSurvivorPensionAnalysisBoiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisBenefitOriginatorIdentificationId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter identificação do originador do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'benefit-originator-identification/:survivorPensionAnalysisBenefitOriginatorIdentificationId',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Identificação do originador do benefício obtida com sucesso.',
      type: GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getBoi(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisBenefitOriginatorIdentificationId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
      ),
    )
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationResponseDto> {
    return this.getSurvivorPensionAnalysisBoiUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisBenefitOriginatorIdentificationId,
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Substituir documentos da identificação do originador do benefício',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/benefit-originator-identification/documents',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Documentos da identificação do originador do benefício substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putBoiDocs(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body()
    dto: PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentsResponseDto> {
    return this.putSurvivorPensionAnalysisBoiDocsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar histórico de trabalho do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/deceased-work-history',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Histórico de trabalho do falecido criado com sucesso.',
      type: CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDwh(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body() dto: CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
    return this.createSurvivorPensionAnalysisDwhUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar histórico de trabalho do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId',
      method: RequestMethod.PATCH,
      type: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Histórico de trabalho do falecido atualizado com sucesso.',
      type: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDwh(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    @Body() dto: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
    return this.updateSurvivorPensionAnalysisDwhUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir histórico de trabalho do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Histórico de trabalho do falecido excluído com sucesso.',
      type: DeleteSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDwh(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<DeleteSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
    return this.deleteSurvivorPensionAnalysisDwhUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter histórico de trabalho do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Histórico de trabalho do falecido obtido com sucesso.',
      type: GetSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDwh(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
    return this.getSurvivorPensionAnalysisDwhUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar período do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId/period',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Período do histórico de trabalho criado com sucesso.',
      type: CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDwhp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    @Body()
    dto: CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
    return this.createSurvivorPensionAnalysisDwhpUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar período do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/period/:survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      method: RequestMethod.PATCH,
      type: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período do histórico de trabalho atualizado com sucesso.',
      type: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDwhp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      ),
    )
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    @Body()
    dto: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
    return this.updateSurvivorPensionAnalysisDwhpUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir período do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/period/:survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período do histórico de trabalho excluído com sucesso.',
      type: DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDwhp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      ),
    )
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): Promise<DeleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
    return this.deleteSurvivorPensionAnalysisDwhpUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter período do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/period/:survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Período do histórico de trabalho obtido com sucesso.',
      type: GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDwhp(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      ),
    )
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
    return this.getSurvivorPensionAnalysisDwhpUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar períodos do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId/periods',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Períodos do histórico de trabalho listados com sucesso.',
      type: ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDwhps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<ListSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto> {
    return this.listSurvivorPensionAnalysisDwhpsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir períodos do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/:survivorPensionAnalysisDeceasedWorkHistoryId/periods',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Períodos do histórico de trabalho substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putDwhps(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisDeceasedWorkHistoryId),
    )
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    @Body() dto: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto> {
    return this.putSurvivorPensionAnalysisDwhpsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir documentos do período do histórico de trabalho',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-work-history/period/:survivorPensionAnalysisDeceasedWorkHistoryPeriodId/documents',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Documentos do período do histórico de trabalho substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putDwhpDocs(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedWorkHistoryPeriodId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      ),
    )
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    @Body()
    dto: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto> {
    return this.putSurvivorPensionAnalysisDwhpDocsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedWorkHistoryPeriodId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar dependente do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/deceased-benefit-dependents',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Dependente do benefício do falecido criado com sucesso.',
      type: CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDbd(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body()
    dto: CreateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.createSurvivorPensionAnalysisDbdUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dependente do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-benefit-dependents/:survivorPensionAnalysisDeceasedBenefitDependentsId',
      method: RequestMethod.PATCH,
      type: UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dependente do benefício do falecido atualizado com sucesso.',
      type: UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async updateDbd(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedBenefitDependentsId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedBenefitDependentsId,
      ),
    )
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    @Body()
    dto: UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.updateSurvivorPensionAnalysisDbdUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedBenefitDependentsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir dependente do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-benefit-dependents/:survivorPensionAnalysisDeceasedBenefitDependentsId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dependente do benefício do falecido excluído com sucesso.',
      type: DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDbd(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedBenefitDependentsId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedBenefitDependentsId,
      ),
    )
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): Promise<DeleteSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.deleteSurvivorPensionAnalysisDbdUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedBenefitDependentsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter dependente do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-benefit-dependents/:survivorPensionAnalysisDeceasedBenefitDependentsId',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dependente do benefício do falecido obtido com sucesso.',
      type: GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getDbd(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedBenefitDependentsId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedBenefitDependentsId,
      ),
    )
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.getSurvivorPensionAnalysisDbdUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedBenefitDependentsId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar dependentes do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/deceased-benefit-dependents',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dependentes do benefício do falecido listados com sucesso.',
      type: ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDbds(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<ListSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.listSurvivorPensionAnalysisDbdsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir dependentes do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/deceased-benefit-dependents',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dependentes do benefício do falecido substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putDbds(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Body() dto: PutSurvivorPensionAnalysisDeceasedBenefitDependentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedBenefitDependentsResponseDto> {
    return this.putSurvivorPensionAnalysisDbdsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Substituir documentos do dependente do benefício do falecido',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'deceased-benefit-dependents/:survivorPensionAnalysisDeceasedBenefitDependentsId/documents',
      method: RequestMethod.PUT,
      type: PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Documentos do dependente do benefício do falecido substituídos com sucesso.',
      type: PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async putDbdDocs(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisDeceasedBenefitDependentsId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisDeceasedBenefitDependentsId,
      ),
    )
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    @Body()
    dto: PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentsResponseDto> {
    return this.putSurvivorPensionAnalysisDbdDocsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisDeceasedBenefitDependentsId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter resultado da análise de pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/result',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Resultado da análise de pensão por morte obtido com sucesso.',
      type: GetSurvivorPensionAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResultResponseDto> {
    return this.getSurvivorPensionAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Gerar resultado da análise de pensão por morte com IA',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/result',
      method: RequestMethod.POST,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Resultado da análise de pensão por morte gerado com sucesso.',
      type: CreateSurvivorPensionAnalysisResultResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createResult(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<CreateSurvivorPensionAnalysisResultResponseDto> {
    return this.createSurvivorPensionAnalysisResultUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar regra de aposentadoria do resultado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/:survivorPensionAnalysisResultId/retirement-rule',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisResultRetirementRuleRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Regra de aposentadoria do resultado criada com sucesso.',
      type: CreateSurvivorPensionAnalysisResultRetirementRuleResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createRr(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisResultId),
    )
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
    @Body() dto: CreateSurvivorPensionAnalysisResultRetirementRuleRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisResultRetirementRuleResponseDto> {
    return this.createSurvivorPensionAnalysisRrUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir regra de aposentadoria do resultado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/retirement-rule/:survivorPensionAnalysisResultRetirementRuleId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Regra de aposentadoria do resultado excluída com sucesso.',
      type: DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteRr(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultRetirementRuleId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisResultRetirementRuleId),
    )
    survivorPensionAnalysisResultRetirementRuleId: SurvivorPensionAnalysisResultRetirementRuleId,
  ): Promise<DeleteSurvivorPensionAnalysisResultRetirementRuleResponseDto> {
    return this.deleteSurvivorPensionAnalysisRrUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultRetirementRuleId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar regras de aposentadoria do resultado',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/:survivorPensionAnalysisResultId/retirement-rules',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Regras de aposentadoria do resultado listadas com sucesso.',
      type: ListSurvivorPensionAnalysisResultRetirementRulesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listRrs(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisResultId),
    )
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): Promise<ListSurvivorPensionAnalysisResultRetirementRulesResponseDto> {
    return this.listSurvivorPensionAnalysisRrsUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar análise de pensão do dependente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/:survivorPensionAnalysisResultId/dependent-pension-analysis',
      method: RequestMethod.POST,
      type: CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise de pensão do dependente criada com sucesso.',
      type: CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createDpa(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisResultId),
    )
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
    @Body()
    dto: CreateSurvivorPensionAnalysisResultDependentPensionAnalysisRequestDto,
  ): Promise<CreateSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto> {
    return this.createSurvivorPensionAnalysisDpaUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Excluir análise de pensão do dependente',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/dependent-pension-analysis/:survivorPensionAnalysisResultDependentPensionAnalysisId',
      method: RequestMethod.DELETE,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análise de pensão do dependente excluída com sucesso.',
      type: DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async deleteDpa(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultDependentPensionAnalysisId',
      new ParseValueObjectPipe(
        SurvivorPensionAnalysisResultDependentPensionAnalysisId,
      ),
    )
    survivorPensionAnalysisResultDependentPensionAnalysisId: SurvivorPensionAnalysisResultDependentPensionAnalysisId,
  ): Promise<DeleteSurvivorPensionAnalysisResultDependentPensionAnalysisResponseDto> {
    return this.deleteSurvivorPensionAnalysisDpaUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultDependentPensionAnalysisId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar análises de pensão dos dependentes',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'result/:survivorPensionAnalysisResultId/dependent-pension-analyses',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Análises de pensão dos dependentes listadas com sucesso.',
      type: ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listDpas(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisResultId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisResultId),
    )
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): Promise<ListSurvivorPensionAnalysisResultDependentPensionAnalysesResponseDto> {
    return this.listSurvivorPensionAnalysisDpasUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisResultId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise completa da pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/download/complete-version',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise completa retornado para download.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadCompleteAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadSurvivorPensionAnalysisCompleteAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      format,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Baixar análise simplificada da pensão por morte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':survivorPensionAnalysisId/download/simplified-version',
      method: RequestMethod.GET,
    },
    tag: ['pensao-por-morte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Arquivo da análise simplificada retornado para download.',
      type: StreamableFile,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async downloadSimplifiedAnalysis(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param(
      'survivorPensionAnalysisId',
      new ParseValueObjectPipe(SurvivorPensionAnalysisId),
    )
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    return this.downloadSurvivorPensionAnalysisSimplifiedAnalysisUseCase.execute(
      sessionData,
      organizationSessionData,
      survivorPensionAnalysisId,
      format,
    );
  }
}
