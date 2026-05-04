import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/enum/special-retirement-rejection-work-period-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public code?: string;

  @RequestDtoStringProperty({ required: false })
  public description?: string;

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty({ required: false })
  public recognizedSpecialTime?: boolean;

  @RequestDtoStringProperty({ required: false })
  public companyName?: string;

  @RequestDtoStringProperty({ required: false })
  public cnpj?: string;

  @RequestDtoStringProperty({ required: false })
  public position?: string;

  @RequestDtoStringProperty({ required: false })
  public comprobatoryDocument?: string;

  @RequestDtoBooleanProperty({ required: false })
  public linkedToCnis?: boolean;

  @RequestDtoBooleanProperty({ required: false })
  public containsCnisRemunerationInPeriod?: boolean;

  @RequestDtoStringProperty({ required: false })
  public technicalJustification?: string;

  @RequestDtoStringProperty({ required: false })
  public additionalObservation?: string;

  @RequestDtoStringProperty({ required: false })
  public lawyerObservation?: string;

  @RequestDtoStringProperty({ required: false })
  public exposureFrequency?: string;

  @RequestDtoStringProperty({ required: false })
  public informationSource?: string;

  @RequestDtoStringProperty({ required: false })
  public identifiedAgents?: string;

  @RequestDtoBooleanProperty({ required: false })
  public efficientEpi?: boolean;

  @RequestDtoObjectProperty(
    () =>
      UpdateSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkRequestDto,
    { required: false, isArray: true },
  )
  public legalFrameworks?: UpdateSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkRequestDto[];

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkSpecialPeriodRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkPeriodsEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public competence?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public remuneration?: DecimalValue;

  @RequestDtoStringProperty({ required: false })
  public indicators?: string;

  @RequestDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contribution?: DecimalValue;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionSalary?: DecimalValue;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodsEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  @RequestDtoEnumProperty(SpecialRetirementRejectionWorkPeriodDocumentTypeEnum)
  public type: SpecialRetirementRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodDocumentRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkPeriodsItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(SpecialRetirementRejectionWorkPeriodCategoryEnum, {
    required: false,
  })
  public category?: SpecialRetirementRejectionWorkPeriodCategoryEnum;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public pendencyReason?: string[];

  @RequestDtoEnumProperty(
    SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum;

  @RequestDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @RequestDtoStringProperty({ required: false })
  public status?: string;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoEnumProperty(
    SpecialRetirementRejectionWorkPeriodActivityTypeEnum,
    { required: false },
  )
  public activityType?: SpecialRetirementRejectionWorkPeriodActivityTypeEnum;

  @RequestDtoObjectProperty(
    () => UpdateSpecialRetirementRejectionWorkPeriodDocumentRequestDto,
    { required: false, isArray: true },
  )
  public documents?: UpdateSpecialRetirementRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () =>
      UpdateSpecialRetirementRejectionWorkPeriodsEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: UpdateSpecialRetirementRejectionWorkPeriodsEarningsHistoryItemRequestDto[];

  @RequestDtoObjectProperty(
    () => UpdateSpecialRetirementRejectionWorkSpecialPeriodRequestDto,
    { required: false, isArray: true },
  )
  public specialPeriods?: UpdateSpecialRetirementRejectionWorkSpecialPeriodRequestDto[];

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodsItemRequestDto.name;
}

@RequestDto()
export class UpdateSpecialRetirementRejectionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateSpecialRetirementRejectionWorkPeriodsItemRequestDto,
    { required: false, isArray: true },
  )
  public workPeriods?: UpdateSpecialRetirementRejectionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateSpecialRetirementRejectionWorkPeriodsRequestDto.name;
}
