import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
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
export class DisabilityRetirementPlanningGrantPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty()
  public startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum)
  public category: DisabilityRetirementPlanningGrantCategoryEnum;

  @RequestDtoBooleanProperty()
  public isPendency: boolean;

  @RequestDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
    {
      required: false,
    },
  )
  public pendencyReason?:
    | DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum
    | undefined;

  @RequestDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @RequestDtoBooleanProperty()
  public status: boolean;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
    {
      required: false,
    },
  )
  public disabilityStatus?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
    {
      required: false,
    },
  )
  public periodConsideration?:
    | DisabilityRetirementPlanningGrantPeriodConsiderationEnum
    | undefined;

  @RequestDtoStringProperty({ required: false })
  public bondOrigin?: string;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodItemRequestDto.name;
}

@RequestDto()
export class DisabilityRetirementPlanningGrantPeriodEarningsHistoryItemRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoStringProperty({ required: false })
  public analysis?: string;

  @RequestDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodEarningsHistoryItemRequestDto.name;
}

@RequestDto()
export class FileDocumentDisabilityRetirementPlanningGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    FileDocumentDisabilityRetirementPlanningGrantPeriodRequestDto.name;
}

@RequestDto()
export class DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto extends DisabilityRetirementPlanningGrantPeriodItemRequestDto {
  @RequestDtoObjectProperty(
    () => FileDocumentDisabilityRetirementPlanningGrantPeriodRequestDto,
    { required: false, isArray: true },
  )
  public documents?: FileDocumentDisabilityRetirementPlanningGrantPeriodRequestDto[];

  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantPeriodEarningsHistoryItemRequestDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: DisabilityRetirementPlanningGrantPeriodEarningsHistoryItemRequestDto[];

  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantPeriodRequestDto.name;
}
