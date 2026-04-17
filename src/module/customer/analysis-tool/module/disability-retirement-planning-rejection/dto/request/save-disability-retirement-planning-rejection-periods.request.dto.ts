import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public value?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class DisabilityRetirementPlanningRejectionPeriodDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodDocumentItemRequestDto.name;
}

@RequestDto()
export class DisabilityRetirementPlanningRejectionPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodCategoryEnum,
    { required: false },
  )
  public category?: DisabilityRetirementPlanningRejectionPeriodCategoryEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum,
  )
  public workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;

  @RequestDtoNumberProperty({ required: false })
  public impactMonths?: number;

  @RequestDtoNumberProperty({ required: false })
  public graceMonths?: number;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum;

  @RequestDtoBooleanProperty({ required: false })
  public wantsToComplementViaMeuINSS?: boolean;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum,
    { required: false },
  )
  public pcdStatus?: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum;

  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionPeriodDocumentItemRequestDto,
    { isArray: true, required: false },
  )
  public documents?: DisabilityRetirementPlanningRejectionPeriodDocumentItemRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningRejectionPeriodEarningsHistoryItemRequestDto,
    { isArray: true, required: false },
  )
  public earningsHistory?: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionPeriodItemRequestDto.name;
}

@RequestDto()
export class SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: DisabilityRetirementPlanningRejectionPeriodItemRequestDto[];

  protected override readonly _type =
    SaveDisabilityRetirementPlanningRejectionPeriodsRequestDto.name;
}
