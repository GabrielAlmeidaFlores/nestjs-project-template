import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-category.enum';
import { DisabilityRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-denial-reason.enum';
import { DisabilityRetirementPlanningRejectionRetirementTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-retirement-type.enum';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import { DisabilityRetirementPlanningRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/generic/disability-retirement-planning-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public inssDecisionAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisModel,
    { required: false },
  )
  public disabilityRetirementPlanningRejectionFirstAnalysis?: DisabilityRetirementPlanningRejectionFirstAnalysisModel;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionDocumentTypeEnum,
  )
  public type: DisabilityRetirementPlanningRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum,
  )
  public workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
    { required: false },
  )
  public category?: DisabilityRetirementPlanningRejectionPeriodCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoBooleanProperty()
  public isPendency: boolean;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
    { required: false },
  )
  public pcdStatus?: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum;

  @ResponseDtoStringProperty({ required: false })
  public local?: string;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningRejectionPeriodDocument?: GetDisabilityRetirementPlanningRejectionPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: GetDisabilityRetirementPlanningRejectionPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionPeriodResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityRetirementPlanningRejectionId)
  public disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public requestedBenefitType?: string;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningRejectionCategoryEnum, {
    required: false,
  })
  public category?: DisabilityRetirementPlanningRejectionCategoryEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionRetirementTypeEnum,
    { required: false },
  )
  public retirementType?: DisabilityRetirementPlanningRejectionRetirementTypeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningRejectionDenialReasonEnum,
    { required: false },
  )
  public denialReason?: DisabilityRetirementPlanningRejectionDenialReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningRejectionResultResponseDto,
    { required: false },
  )
  public disabilityRetirementPlanningRejectionResult?: GetDisabilityRetirementPlanningRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningRejectionDocumentResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningRejectionDocument?: GetDisabilityRetirementPlanningRejectionDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningRejectionPeriodResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningRejectionPeriod?: GetDisabilityRetirementPlanningRejectionPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionResponseDto.name;
}
