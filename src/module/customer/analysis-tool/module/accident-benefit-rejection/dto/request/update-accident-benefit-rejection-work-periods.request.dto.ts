import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import { AccidentBenefitRejectionWorkPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-consideration.enum';
import { AccidentBenefitRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-job-type.enum';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/enum/accident-benefit-rejection-work-period-document-type.enum';
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
export class UpdateAccidentBenefitRejectionWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoStringProperty({ required: false })
  public remuneration?: string;

  @RequestDtoStringProperty({ required: false })
  public indicators?: string;

  @RequestDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public contribution?: string;

  @RequestDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(AccidentBenefitRejectionWorkPeriodDocumentTypeEnum)
  public type: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public bondOrigin: string;

  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(AccidentBenefitRejectionCategoryEnum)
  public category: AccidentBenefitRejectionCategoryEnum;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @RequestDtoEnumProperty(AccidentBenefitRejectionWorkPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: AccidentBenefitRejectionWorkPeriodConsiderationEnum;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoNumberProperty()
  public gracePeriod: number;

  @RequestDtoEnumProperty(AccidentBenefitRejectionWorkPeriodJobTypeEnum, {
    required: false,
  })
  public jobType?: AccidentBenefitRejectionWorkPeriodJobTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public activityDescription?: string;

  @RequestDtoObjectProperty(
    () => UpdateAccidentBenefitRejectionWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateAccidentBenefitRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      UpdateAccidentBenefitRejectionWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: UpdateAccidentBenefitRejectionWorkPeriodsEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class UpdateAccidentBenefitRejectionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateAccidentBenefitRejectionWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: UpdateAccidentBenefitRejectionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateAccidentBenefitRejectionWorkPeriodsRequestDto.name;
}
